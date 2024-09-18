import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginFormInputs = {
  email: string;
  password: string;
};

type Issue = {
  message: string;
  path: string[];
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASEURL;
      const { data: responseData } = await axios.post<{ token: string }>(
        `${baseUrl}/auth/login`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("accessToken", responseData.token);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error?.issues?.length
          ? error.response.data.error.issues
              .map(
                (issue: Issue) =>
                  `Error: ${issue.message} (Field: ${issue.path.join(", ")})`
              )
              .join(", ")
          : error.response?.data?.error?.toString() ||
            "Login failed. Please try again."
        : "Something went wrong, please try again.";

      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto py-28">
      <div className="w-full max-w-md px-8 py-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input Email */}
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

          {/* Input Password */}
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

          {/* Button Login */}
          <Button type="submit" className="w-full bg-[#986B54]">
            Login
          </Button>
        </form>

        {/* Link to Register */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#986B54] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
