import { APP_API_BASEURL } from "@/lib/env";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit") || "6";
  const q = url.searchParams.get("q");

  const params = new URLSearchParams();
  if (q) params.append("q", q);
  params.append("limit", limit);

  try {
    const response = await fetch(
      `${APP_API_BASEURL}/products?${params.toString()}`
    );

    if (!response.ok) throw new Error("Failed to fetch products");

    const { data } = await response.json();
    return { products: data.products, total: data.totalData };
  } catch {
    return { products: [], total: 0 };
  }
};
