import "@/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "@/components/ui/Base/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ServerError from "./components/ServerError";
import HomeRoute from "@/routes/home/index";
import RegisterRoute from "@/routes/register/index";
import LoginRouter from "@/routes/login/index";
import ProfileRoute from "@/routes/profile/index";
import ProductRoute from "@/routes/products/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ServerError />,
    children: [
      {
        path: "/",
        element: <HomeRoute.Home />,
        loader: HomeRoute.HomeLoader,
      },
      {
        path: "/products",
        element: <ProductRoute.Products />,
        loader: ProductRoute.ProductsLoader,
      },
      {
        path: "/products/:slug",
        element: <ProductRoute.ProductDetail />,
      },
      {
        path: "/register",
        element: <RegisterRoute.Register />,
        loader: RegisterRoute.RegisterLoader,
        action: RegisterRoute.RegisterAction,
      },
      {
        path: "/login",
        element: <LoginRouter.Login />,
        loader: LoginRouter.LoginLoader,
        action: LoginRouter.LoginAction,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfileRoute.Profile />
          </ProtectedRoute>
        ),
        loader: ProfileRoute.ProfileLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
