import { APP_API_BASEURL } from "@/lib/env";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const limit = url.searchParams.get("limit") || 6;
  const category = url.searchParams.get("category") || "";
  const minPrice = url.searchParams.get("minPrice") || 0;
  const maxPrice = url.searchParams.get("maxPrice") || 1000000;
  const sortBy = url.searchParams.get("sortBy") || "";

  try {
    const response = await fetch(
      `${APP_API_BASEURL}/products?limit=${limit}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return { products: data.data.products, total: data.data.totalData };
  } catch {
    return { products: [], total: 0 };
  }
};
