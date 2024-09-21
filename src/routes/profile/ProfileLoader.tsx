import { APP_API_BASEURL } from "@/lib/env";
import { getAccessToken } from "@/lib/auth";

export const loader = async () => {
  const accessToken = getAccessToken();

  try {
    const response = await fetch(`${APP_API_BASEURL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Response("Failed to fetch profile", {
        status: response.status,
      });
    }

    const data = await response.json();
    return { user: data.data };
  } catch {
    return { user: null };
  }
};
