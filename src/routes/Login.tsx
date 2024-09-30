import { useState } from "react";
import { ActionFunctionArgs, Form, Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { APP_API_BASEURL } from "@/lib/env";
import * as auth from "@/lib/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  const handleErrorResponse = async (response: Response) => {
    const errorResponse = await response.json();
    const errors: Record<string, string> = {};

    if (errorResponse.error?.issues) {
      errorResponse.error.issues.forEach(
        ({ message, path }: { message: string; path: string[] }) => {
          errors[path[0]] = message;
        }
      );
    } else {
      errors.global =
        errorResponse.error?.toString() || "Login failed. Please try again.";
    }

    return { errors };
  };

  try {
    const response = await fetch(`${APP_API_BASEURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return await handleErrorResponse(response);
    }

    const {
      token: { accessToken, refreshToken },
    } = await response.json();

    return accessToken && refreshToken
      ? { accessToken, refreshToken }
      : { errors: { global: "Login failed. Please try again." } };
  } catch (error) {
    return {
      errors: {
        global:
          (error as Error)?.message ||
          "Oops! Something went wrong. Please try again.",
      },
    };
  }
};

export const Login: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const result = await action({
      request: new Request("", {
        method: "POST",
        body: new FormData(e.currentTarget),
      }),
      params: {},
    });

    setIsLoading(false);

    if ("errors" in result) {
      setErrors(result.errors);
      if (result.errors.global) {
        toast.error(result.errors.global, {
          position: "top-right",
          autoClose: 3000,
        });
      }
      return;
    }

    const { accessToken, refreshToken } = result;
    if (!accessToken || !refreshToken) {
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    auth.setAccessToken(accessToken);
    auth.setRefreshToken(refreshToken);

    authContext.login(accessToken, refreshToken);

    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto py-28">
      <div className="w-full max-w-md px-8 py-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-coffee">
          Login to Your Account
        </h2>

        <Form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              className="w-full"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              className="w-full"
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-coffee text-white hover:bg-coffee-hover"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <p className="text-center text-sm mt-4">
          Don't have an account?
          <Link to="/register" className="ml-1 text-coffee hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};
