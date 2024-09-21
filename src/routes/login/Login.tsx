import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { action } from "./LoginAction";
import useAuth from "@/hooks/useAuth";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await action({
      request: new Request("", { method: "POST", body: formData }),
      params: {},
    });

    if (typeof result === "object" && "errors" in result) {
      if (result.errors.global) {
        toast.error(result.errors.global, {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      Object.entries(result.errors).forEach(([field, message]) => {
        if (field !== "global") {
          setError(field as keyof LoginFormInputs, { message });
        }
      });
      return;
    }

    if (typeof result === "string") {
      auth.login(result);

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto py-28">
      <div className="w-full max-w-md px-8 py-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-coffee">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-coffee text-white hover:bg-coffee-hover"
          >
            Login
          </Button>
        </form>

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

export default Login;
