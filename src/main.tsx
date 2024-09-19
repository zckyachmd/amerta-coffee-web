import "@/index.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/ui/Base/Layout";
import NotFound from "@/routes/NotFound";
import Home, { loader as homeLoader } from "@/routes/Home";
import Products from "@/routes/Products";
import ProductDetail from "@/routes/ProductDetail";
import Login from "@/routes/Login";
import PrivateRoute from "@/routes/PrivateRoute";
import Profile from "@/routes/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:slug",
        element: <ProductDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: PrivateRoute(<Profile />),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
