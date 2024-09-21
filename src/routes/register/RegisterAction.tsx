import { ActionFunctionArgs } from "react-router-dom";
import { APP_API_BASEURL } from "@/lib/env";

type ActionResult = true | { errors: Record<string, string> } | string;

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<ActionResult> => {
  const data = await request.formData();
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const confirmPassword = data.get("confirmPassword") as string;
  const address = data.get("address") as string;
  const phone = data.get("phone") as string;

  try {
    const response = await fetch(`${APP_API_BASEURL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        address,
        phone,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errors: Record<string, string> = {};

      if (errorResponse.error.issues) {
        errorResponse.error.issues.forEach(
          ({ message, path }: { message: string; path: string[] }) => {
            errors[path[0]] = message;
          }
        );
      } else {
        errors.global =
          errorResponse.error?.toString() ||
          "Registration failed. Please try again.";
      }
      return { errors };
    }

    return true;
  } catch (error) {
    return {
      errors: {
        global:
          error instanceof Error
            ? error.message
            : "Oops! Something went wrong. Please try again.",
      },
    };
  }
};
