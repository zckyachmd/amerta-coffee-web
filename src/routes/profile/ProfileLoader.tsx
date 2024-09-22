import { apiFetch } from "@/lib/api";

export const loader = async () => {
  const response = await apiFetch("/auth/me", {
    method: "GET",
  });

  const data = await response.json();
  return { user: data.data || null };
};
