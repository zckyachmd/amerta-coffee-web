import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { loader } from "./ProductsLoader";
import ProductList from "@/components/ProductList";
import Filter from "@/components/Filter";

const Products = () => {
  const navigate = useNavigate();
  const { products, total } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <div className="container mx-auto py-8">
      <div
        className="relative bg-cover bg-center h-60"
        style={{
          backgroundImage: 'url("https://placehold.co/1920x500")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Discover Our Exquisite Coffee Collection
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="col-span-4 md:col-span-1">
          <Filter
            onSortChange={(sortBy) => navigate(`?sortBy=${sortBy}`)}
            onCategoryChange={(category) => navigate(`?category=${category}`)}
            onPriceChange={(min, max) =>
              navigate(`?minPrice=${min}&maxPrice=${max}`)
            }
          />
        </div>
        <div className="col-span-4 md:col-span-3">
          <ProductList products={products} />
          {products.length < total && (
            <div className="text-center mt-6">
              <Button
                onClick={() => navigate(`?limit=${products.length + 6}`)}
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
  );
};

export default Products;
