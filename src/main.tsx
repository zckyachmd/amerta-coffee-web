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
import ProductDetailRoute from "@/routes/product-detail/index";
import CartRoute from "@/routes/cart/index";

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
      },
      {
        path: "/product/:slug",
        element: <ProductDetailRoute.ProductDetail />,
        loader: ProductDetailRoute.ProductLoader,
        action: ProductDetailRoute.ProductDetailAction,
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
        path: "/carts",
        element: (
          <ProtectedRoute>
            <CartRoute.Cart />
          </ProtectedRoute>
        ),
        loader: CartRoute.CartLoader,
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
