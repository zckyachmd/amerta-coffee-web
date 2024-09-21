import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { action } from "./RegisterAction";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("address", data.address);
    formData.append("phone", data.phone);

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
          setError(field as keyof RegisterFormInputs, { message });
        }
      });
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
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
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
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
              placeholder="Enter your address"
              {...register("address")}
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <Input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              {...register("phone")}
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="text-sm">
            <span className="text-red-500">*</span> Required fields!
          </div>

          <Button
            type="submit"
            className="w-full bg-coffee text-white hover:bg-coffee-hover py-2 rounded-md"
          >
            Register
          </Button>
        </form>

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

export default Register;
