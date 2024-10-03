import React, { useState, useEffect, ReactNode, useCallback } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "./AuthContext";
import { APP_API_BASEURL } from "@/lib/env";
import * as auth from "@/lib/auth";

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

  const login = useCallback((token: string, refreshToken: string) => {
    auth.setAccessToken(token);
    auth.setRefreshToken(refreshToken);
    setIsLoggedIn(true);
  }, []);

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
    try {
      const accessToken = cookies.accessToken;
      if (!accessToken || auth.isTokenExpired(accessToken)) {
        const newAccessToken = await auth.refreshAccessToken();

        if (!newAccessToken) {
          throw new Error("Unable to refresh access token");
        }
      }

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
      setIsLoggedIn(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, handleRequest }}>
      {children}
    </AuthContext.Provider>
  );
};
