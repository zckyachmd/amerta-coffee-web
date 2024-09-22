import { APP_API_BASEURL } from "@/lib/env";
import { LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug as string;
  const response = await fetch(`${APP_API_BASEURL}/products/${slug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Response("Failed to fetch product", {
      status: 404,
      statusText: "Product not found",
    });
  }

  const data = await response.json();
  return { product: data.data };
};
