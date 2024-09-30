import * as auth from "@/lib/auth";

const loader = async () => {
  const accessToken = auth.getAccessToken();
  const refreshToken = auth.getRefreshToken();

  if (accessToken || refreshToken) {
    throw new Response(null, { status: 302, headers: { Location: "/" } });
  }

  return null;
};

export default loader;
