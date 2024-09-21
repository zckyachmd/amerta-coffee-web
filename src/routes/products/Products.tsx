import { useState, useEffect, useCallback } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import ProductList from "@/components/ProductList";
import { loader } from "./ProductsLoader";

const Products = () => {
  const { products, total } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const [searchParams, setSearchParams] = useSearchParams();

  // State for sorting
  const [sortBy, setSortBy] = useState<string>("name_asc");

  // Helper function to merge existing query params
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

  // Handle sorting changes
  const applySorting = useCallback(
    (newSort: string) => {
      setSortBy(newSort);
      updateParams({ s: newSort.replace("_", ":") });
    },
    [updateParams]
  );

  useEffect(() => {
    applySorting(sortBy);
  }, [applySorting, sortBy]);

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

      {/* Sorting Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 w-full max-w-6xl mx-auto">
        <h3 className="text-lg font-semibold text-left w-full md:w-auto mb-2 md:mb-0">
          Sort By:
        </h3>
        <div className="flex space-x-2 md:ml-auto">
          {["name_asc", "name_desc", "price_asc", "price_desc"].map((sort) => (
            <Button
              key={sort}
              onClick={() => applySorting(sort)}
              className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                sortBy === sort
                  ? "bg-coffee text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {sort === "name_asc"
                ? "Name A-Z"
                : sort === "name_desc"
                ? "Name Z-A"
                : sort === "price_asc"
                ? "Price Low to High"
                : "Price High to Low"}
            </Button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="col-span-1 md:col-span-3">
            <ProductList products={products} />
            {products.length < total && (
              <div className="text-center mt-6">
                <Button
                  onClick={() => {
                    const newLimit = products.length + 3;
                    updateParams({ limit: newLimit });
                  }}
                  className="bg-coffee text-white hover:bg-coffee-hover px-6 py-3 rounded-full"
                >
                  <span className="mr-2">Browse More Coffee</span>
                  <FaArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
