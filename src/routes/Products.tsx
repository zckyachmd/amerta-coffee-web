import { useCallback } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { APP_API_BASEURL } from "@/lib/env";
import ProductList from "@/components/ProductList";

const LIMIT = 9;

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const qParam = url.searchParams.get("q") || "";
  const sort = url.searchParams.get("s") || "name";

  const sortObject = {
    [sort.replace("-", "")]: sort.startsWith("-") ? "desc" : "asc",
  };

  const params = new URLSearchParams({
    page: page.toString(),
    limit: LIMIT.toString(),
    q: JSON.stringify({ name: qParam }),
    s: JSON.stringify(sortObject),
  });

  try {
    const response = await fetch(
      `${APP_API_BASEURL}/products?${params.toString()}`
    );

    const { data } = await response.json();
    return {
      products: data.products,
      total: data.totalData,
      currentPage: page,
    };
  } catch {
    return {
      products: [],
      total: 0,
      currentPage: 1,
    };
  }
};

const SORT_MAPPING: { [key: string]: string } = {
  name_asc: "name",
  name_desc: "-name",
  price_asc: "price",
  price_desc: "-price",
};

const SORT_OPTIONS = [
  { key: "name_asc", label: "Name A-Z" },
  { key: "name_desc", label: "Name Z-A" },
  { key: "price_asc", label: "Price Low to High" },
  { key: "price_desc", label: "Price High to Low" },
];

export const Products: React.FC = () => {
  const { products, total, currentPage } = useLoaderData() as {
    products: any[];
    total: number;
    currentPage: number;
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const totalPages = Math.ceil(total / LIMIT);

  const getParam = (key: string, defaultValue?: string) => {
    return searchParams.get(key) || defaultValue;
  };

  const updateParams = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      Object.keys(newParams).forEach((key) => {
        if (newParams[key]) {
          params.set(key, newParams[key]);
        } else {
          params.delete(key);
        }
      });

      if (!params.get("s")) {
        params.set("s", "name");
      }

      navigate(`?${params.toString()}`, { replace: true });
    },
    [navigate, searchParams]
  );

  const goToPage = (page: number) => {
    if (page !== currentPage) {
      updateParams({ page: page.toString() });
    }
  };

  const applySorting = (sortOption: string) => {
    const newSort = SORT_MAPPING[sortOption];
    const currentPage = getParam("page");

    const newParams: Record<string, string> = { s: newSort };

    if (currentPage && currentPage !== "1") {
      newParams.page = "1";
    }

    updateParams(newParams);
  };

  return (
    <div className="container mx-auto py-8">
      <div
        className="relative bg-cover bg-center h-60"
        style={{
          backgroundImage: 'url("img/banner-products.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Discover Our Exquisite Coffee Collection
          </h1>
        </div>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 w-full max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-left w-full md:w-auto mb-2 md:mb-0">
            Sort By:
          </h3>
          <div className="flex flex-wrap gap-x-4 md:ml-auto">
            {SORT_OPTIONS.map(({ key, label }) => (
              <div key={key} className="mb-2">
                <Button
                  onClick={() => applySorting(key)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                    getParam("s") === SORT_MAPPING[key] ||
                    (!getParam("s") && key === "name_asc")
                      ? "bg-coffee text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="col-span-1 md:col-span-3">
            <ProductList products={products} />
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};
