import { getAccessToken, removeAccessToken, setAccessToken } from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp ? exp < Math.floor(Date.now() / 1000) : true;
  } catch {
    return true;
  }
};

const refreshToken = async (): Promise<string> => {
  const removeRefreshTokenCookie = () => {
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  try {
    const response = await fetch(`${APP_API_BASEURL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      removeAccessToken();
      removeRefreshTokenCookie();
      throw new Error("Authentication failed!");
    }

    const { token } = await response.json();
    setAccessToken(token);
    return token;
  } catch (error) {
    removeRefreshTokenCookie();
    throw new Error(
      error instanceof Error ? error.message : "Failed to refresh token"
    );
  }
};

const apiFetch = async (
  endpoint: string,
  options: { method?: string; payload?: any } = {}
): Promise<Response> => {
  const url = `${APP_API_BASEURL}${endpoint}`;
  const { method = "GET", payload } = options;

  let accessToken = getAccessToken();

  if (accessToken && isTokenExpired(accessToken)) {
    accessToken = await refreshToken();
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : undefined,
  };

  try {
    let response = await fetch(url, fetchOptions);

    if (response.status === 401) {
      accessToken = await refreshToken();
      headers.Authorization = `Bearer ${accessToken}`;

      response = await fetch(url, {
        ...fetchOptions,
        headers,
      });
    }

    return response;
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to fetch data!");
  }
};

export { apiFetch };
