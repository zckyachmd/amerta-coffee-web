import {
  getAccessToken,
  isTokenExpired,
  refreshAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";

const handleRequest = async (
  requestFunc: () => Promise<Response>,
  onError: (error: Error) => any
): Promise<Response | any> => {
  let accessToken = getAccessToken();

  try {
    if (!accessToken || isTokenExpired(accessToken)) {
      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) {
        removeAccessToken();
        removeRefreshToken();
        throw new Error("Unable to refresh access token!");
      }

      accessToken = newAccessToken;
      setAccessToken(accessToken);
    }

    const response = await requestFunc();
    if (!response.ok) {
      throw new Error("Request failed: " + response.statusText);
    }
    return response;
  } catch (error: Error | any) {
    return onError(error);
  }
};

const apiFetch = async (
  endpoint: string,
  options: { method?: string; payload?: any } = {},
  onError?: (error: Error) => any
): Promise<Response | any> => {
  const url = `${APP_API_BASEURL}${endpoint}`;
  const { method = "GET", payload } = options;

  return handleRequest(async () => {
    const token = getAccessToken();
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    };

    return fetch(url, fetchOptions);
  }, onError || (() => {}));
};

export { apiFetch };
