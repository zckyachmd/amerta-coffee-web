import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import { APP_API_BASEURL } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { FiLoader } from "react-icons/fi";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const [sort, setSort] = useState<string>(searchParams.get("s") || "name:asc");
  const [loading, setLoading] = useState<boolean>(true);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(total / itemsPerPage);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const pageParam = currentPage;
    const qParam = searchParams.get("q") || "";
    const [sortKey, sortOrder] = sort.split(":");
    const sortObject = { [sortKey]: sortOrder };

    const params = new URLSearchParams({
      page: pageParam.toString(),
      limit: itemsPerPage.toString(),
      q: qParam,
      s: JSON.stringify(sortObject),
    });

    try {
      const response = await fetch(
        `${APP_API_BASEURL}/products?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const { data } = await response.json();
      setProducts(data.products);
      setTotal(data.totalData);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchParams, sort]);

  const updateParams = useCallback(
    (newParams: any) => {
      const params = new URLSearchParams(searchParams);
      Object.keys(newParams).forEach((key) => {
        if (newParams[key]) {
          params.set(key, newParams[key]);
        } else {
          params.delete(key);
        }
      });
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const goToPage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      updateParams({ page: page.toString() });
    }
  };

  const applySorting = (sortOption: string) => {
    const sortMapping: { [key: string]: string } = {
      name_asc: "name:asc",
      name_desc: "name:desc",
      price_asc: "price:asc",
      price_desc: "price:desc",
    };
    const newSort = sortMapping[sortOption];
    setSort(newSort);
    updateParams({ s: newSort });
  };

  useEffect(() => {
    if (!searchParams.get("s")) {
      const defaultSort = JSON.stringify({ name: "asc" });
      updateParams({ s: defaultSort });
      setSort("name:asc");
    }

    fetchProducts();
  }, [fetchProducts, searchParams, updateParams]);

  useEffect(() => {
    const initialPage = parseInt(searchParams.get("page") || "1");
    setCurrentPage(initialPage);
  }, [searchParams]);

  const sortMapping: { [key: string]: string } = {
    name_asc: "name:asc",
    name_desc: "name:desc",
    price_asc: "price:asc",
    price_desc: "price:desc",
  };

  return (
    <div className="container mx-auto py-8">
      <div
        className="relative bg-cover bg-center h-60"
        style={{
          backgroundImage:
            'url("https://d8g5mz6srwlcs.cloudfront.net/original/64afc69d2f7ca099373483.jpg")',
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
            {[
              { key: "name_asc", label: "Name A-Z" },
              { key: "name_desc", label: "Name Z-A" },
              { key: "price_asc", label: "Price Low to High" },
              { key: "price_desc", label: "Price High to Low" },
            ].map(({ key, label }) => (
              <div key={key} className="mb-2">
                <Button
                  onClick={() => applySorting(key)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                    sort === sortMapping[key]
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
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <FiLoader className="animate-spin text-3xl" />{" "}
              </div>
            ) : (
              <ProductList products={products} />
            )}
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

export default Products;
