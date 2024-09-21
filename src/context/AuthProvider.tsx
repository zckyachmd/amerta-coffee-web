import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import * as auth from "@/lib/auth";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = () => {
      const token = auth.getAccessToken();
      setIsLoggedIn(!!token);
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const login = (token: string) => {
    auth.setAccessToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    auth.removeAccessToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
