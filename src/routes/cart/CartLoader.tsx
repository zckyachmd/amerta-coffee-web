import { apiFetch } from "@/lib/api";

export const loader = async () => {
  try {
    const response = await apiFetch(`/carts`, {
      method: "GET",
    });

    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};
