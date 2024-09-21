import { getAccessToken } from "@/lib/auth";

export const loader = async () => {
  const token = getAccessToken();

  if (token) {
    throw new Response(null, { status: 302, headers: { Location: "/" } });
  }

  return null;
};
