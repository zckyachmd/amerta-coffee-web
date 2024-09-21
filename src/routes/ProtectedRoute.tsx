import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

/**
 * A protected route that will redirect to /login if the user is not
 * logged in.
 *
 * @param {JSX.Element} children The element to render if the user is logged in.
 * @returns {JSX.Element} Either the children or a redirect to /login.
 */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
