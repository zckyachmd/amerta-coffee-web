import { getAccessToken, setAccessToken } from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";

async function refreshToken(): Promise<string> {
  const response = await fetch(`${APP_API_BASEURL}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Response("Authentication failed!", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  const {
    data: { accessToken },
  } = await response.json();
  setAccessToken(accessToken);
  return accessToken;
}

interface ApiFetchOptions {
  method?: string;
  payload?: any;
}

async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  let accessToken = getAccessToken();

  const url = new URL(`${APP_API_BASEURL}${endpoint}`);
  const { method = "GET", payload } = options;

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
    const response = await fetch(url.toString(), fetchOptions);

    if (response.status === 401) {
      accessToken = await refreshToken();
      headers.Authorization = `Bearer ${accessToken}`;

      return fetch(url.toString(), {
        ...fetchOptions,
        headers,
      });
    }

    return response;
  } catch (error: Response | any) {
    throw new Response(error.message, {
      status: error.status || 500,
      statusText: error.statusText || "Internal Server Error",
    });
  }
}

export { apiFetch };
