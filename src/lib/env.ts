import { z } from "zod";

export const EnvSchema = z.object({
  VITE_BACKEND_API_URL: z.string(),
});

export const ENV = EnvSchema.parse(import.meta.env);
export const APP_API_BASEURL = ENV.VITE_BACKEND_API_URL;
