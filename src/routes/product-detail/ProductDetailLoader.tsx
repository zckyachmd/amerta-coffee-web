import { APP_API_BASEURL } from "@/lib/env";
import { LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug as string;

  try {
    const response = await fetch(`${APP_API_BASEURL}/products/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return { product: data.data };
  } catch (error) {
    console.error(error);
    throw new Response("Failed to fetch product", { status: 500 });
  }
};
