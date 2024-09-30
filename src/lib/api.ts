import {
  getAccessToken,
  isTokenExpired,
  refreshAccessToken,
  setAccessToken,
} from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";

const handleRequest = async (
  requestFunc: () => Promise<Response>
): Promise<Response> => {
  let accessToken = getAccessToken();

  if (!accessToken || isTokenExpired(accessToken)) {
    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      throw new Error("Unable to refresh access token");
    }

    accessToken = newAccessToken;
    setAccessToken(accessToken);
  }

  try {
    const response = await requestFunc();
    if (!response.ok) {
      throw new Error("Request failed: " + response.statusText);
    }
    return response;
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to fetch data!");
  }
};

const apiFetch = async (
  endpoint: string,
  options: { method?: string; payload?: any } = {}
): Promise<Response> => {
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
  });
};

export { apiFetch };
