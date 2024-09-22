import { apiFetch } from "@/lib/api";

export const loader = async () => {
  const response = await apiFetch(`/cart`, {
    method: "GET",
  });

  const data = await response.json();
  return data || {};
};
