import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  handleRequest: (requestFunc: () => Promise<Response>) => Promise<Response>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
