import { Navigate } from "react-router-dom";

const PrivateRoute = (children: JSX.Element) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
