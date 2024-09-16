import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4 bg-gray-100">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-[#986B54] text-white font-semibold rounded-lg shadow-md hover:bg-[#8c5b43] transition duration-300"
        >
          <FaHome className="mr-2 w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
