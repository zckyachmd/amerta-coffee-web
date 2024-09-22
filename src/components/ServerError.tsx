import { FaHome } from "react-icons/fa";
import { useRouteError, Link } from "react-router-dom";

const ServerError = () => {
  const error = useRouteError() as { status?: number; statusText?: string };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-28 px-4 sm:px-12 bg-gray-100">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {error.status
            ? `${error.status} - ${
                error.statusText || "An unexpected error occurred."
              }`
            : "500 - An unexpected error occurred."}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The server encountered an unexpected error. Please try again later!
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-coffee text-white hover:bg-coffee-hover font-semibold rounded-lg shadow-md  transition duration-300"
        >
          <FaHome className="mr-2 w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
