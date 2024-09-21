import { getAccessToken } from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";

export const loader = async () => {
  const accessToken = getAccessToken();

  try {
    const response = await fetch(`${APP_API_BASEURL}/carts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Response("Failed to fetch cart items.", {
        status: response.status,
      });
    }

    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
