import { z } from "zod";

export const EnvSchema = z.object({
  VITE_APP_API_BASEURL: z.string(),
});

export const ENV = EnvSchema.parse(import.meta.env);
export const APP_API_BASEURL = ENV.VITE_APP_API_BASEURL;
