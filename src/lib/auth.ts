const accessTokenKey = "accessToken";

export const getAccessToken = (): string | null => {
  return localStorage.getItem(accessTokenKey) || null;
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem(accessTokenKey, token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(accessTokenKey);
};
