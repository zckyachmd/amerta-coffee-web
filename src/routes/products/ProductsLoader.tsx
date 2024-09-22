import { APP_API_BASEURL } from "@/lib/env";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const limit = url.searchParams.get("limit") || "6";
  const sort = url.searchParams.get("s") || "name:asc";
  const query = url.searchParams.get("q") || "";

  const params = new URLSearchParams();

  const [sortKey, sortOrder] = sort.split(":");
  const sortObject = { [sortKey]: sortOrder };
  params.append("s", JSON.stringify(sortObject));
  params.append("limit", limit);

  if (query) params.append("q", query);

  try {
    const response = await fetch(
      `${APP_API_BASEURL}/products?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const { data } = await response.json();
    return { products: data.products, total: data.totalData };
  } catch {
    return { products: [], total: 0 };
  }
};
