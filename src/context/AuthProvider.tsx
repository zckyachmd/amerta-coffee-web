import React, { useState, useEffect, ReactNode, useCallback } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "./AuthContext";
import * as auth from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cookies] = useCookies(["accessToken", "refreshToken"]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!cookies.accessToken || !!cookies.refreshToken
  );

  useEffect(() => {
    setIsLoggedIn(!!cookies.accessToken || !!cookies.refreshToken);
  }, [cookies.accessToken, cookies.refreshToken]);

  const logout = useCallback(() => {
    fetch(`${APP_API_BASEURL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: cookies.refreshToken }),
    });

    auth.removeAccessToken();
    auth.removeRefreshToken();
    setIsLoggedIn(false);
  }, [cookies.refreshToken]);

  const handleRequest = async (
    requestFunc: () => Promise<Response>
  ): Promise<Response> => {
    const accessToken = cookies.accessToken;

    if (!accessToken || auth.isTokenExpired(accessToken)) {
      const newAccessToken = await auth.refreshAccessToken();

      if (!newAccessToken) {
        throw new Error("Unable to refresh access token");
      }
    }

    try {
      const response = await requestFunc();
      if (!response.ok) {
        const newAccessToken = await auth.refreshAccessToken();

        if (newAccessToken) {
          return await requestFunc();
        } else {
          throw new Error("Unable to refresh access token");
        }
      }
      return response;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const login = useCallback((token: string, refreshToken: string) => {
    auth.setAccessToken(token);
    auth.setRefreshToken(refreshToken);
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const accessToken = cookies.accessToken;

      if (!accessToken || auth.isTokenExpired(accessToken)) {
        await auth.refreshAccessToken();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [cookies.accessToken]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, handleRequest }}>
      {children}
    </AuthContext.Provider>
  );
};
