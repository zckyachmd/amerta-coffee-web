import { useState } from "react";
import { Link, useNavigate, Form, ActionFunctionArgs } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAccessToken } from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";

export const loader = async () => {
  const token = getAccessToken();

  if (token) {
    throw new Response(null, { status: 302, headers: { Location: "/" } });
  }

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const confirmPassword = data.get("confirmPassword") as string;
  const address = data.get("address") as string;
  const phone = data.get("phone") as string;

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
      return await handleErrorResponse(response);
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

export const Register = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await action({
      request: new Request("", { method: "POST", body: formData }),
      params: {},
    });

    setIsLoading(false);

    if (typeof result === "object" && "errors" in result) {
      setErrors(result.errors);

      if (result.errors.global) {
        toast.error(result.errors.global, {
          position: "top-right",
          autoClose: 3000,
        });
      }
      return;
    }

    toast.success("Registration successful!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto py-10 ">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-coffee">
          Create Your Account
        </h2>
        <Form method="post" onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              required={true}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              required={true}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              required={true}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              required={true}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="text-sm">
            <span className="text-red-500">*</span> Required fields!
          </div>

          <Button
            type="submit"
            className="w-full bg-coffee text-white hover:bg-coffee-hover py-2 rounded-md"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </Form>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link to="/login" className="ml-1 text-coffee hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
