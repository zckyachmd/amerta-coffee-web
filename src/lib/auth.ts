import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { APP_API_BASEURL } from "./env";

const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

export { jwtDecode };
export const cookies = new Cookies();

export const getAccessToken = (): string | null => {
  return cookies.get(accessTokenKey) || null;
};

export const setAccessToken = (token: string): void => {
  const decodedToken: { exp: number } = jwtDecode(token);
  const expirationDate = new Date(decodedToken.exp * 1000);

  cookies.set(accessTokenKey, token, {
    path: "/",
    expires: expirationDate,
  });
};

export const removeAccessToken = (): void => {
  cookies.remove(accessTokenKey, { path: "/" });
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp ? exp < Math.floor(Date.now() / 1000) : true;
  } catch {
    return true;
  }
};

export const getRefreshToken = (): string | null => {
  return cookies.get(refreshTokenKey) || null;
};

export const setRefreshToken = (token: string): void => {
  const decodedToken: { exp: number } = jwtDecode(token);
  const expirationDate = new Date(decodedToken.exp * 1000);

  cookies.set(refreshTokenKey, token, {
    path: "/",
    expires: expirationDate,
  });
};

export const removeRefreshToken = (): void => {
  cookies.remove(refreshTokenKey, { path: "/" });
};

export const isRefreshTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp ? exp < Math.floor(Date.now() / 1000) : true;
  } catch {
    return true;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${APP_API_BASEURL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { token } = await response.json();
    const newAccessToken = token.accessToken;
    const newRefreshToken = token.refreshToken;

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    return newAccessToken;
  } catch {
    return null;
  }
};
