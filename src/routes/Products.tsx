import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { APP_API_BASEURL } from "@/lib/env";
import { Product } from "@/types/Product";
import ProductList from "@/components/ProductList";
import Filter from "@/components/Filter";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${APP_API_BASEURL}/products?limit=${limit}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`
      );
      const data = await response.json();
      setProducts(data.data.products);
      setTotal(data.data.totalData);
    };

    fetchProducts();
  }, [limit, category, minPrice, maxPrice, sortBy]);

  const handleCardClick = (
    slug: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if ((e.target as HTMLElement).closest("button")) return;
    navigate(`/products/${slug}`);
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 6);
  };

  return (
    <div className="container mx-auto py-8">
      {/* Hero Banner */}
      <div
        className="relative bg-cover bg-center h-60"
        style={{
          backgroundImage:
            'url("https://placehold.co/1920x500?text=Our+Coffee+Collection")',
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
            onSortChange={setSortBy}
            onCategoryChange={setCategory}
            onPriceChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
        </div>
        <div className="col-span-4 md:col-span-3">
          {products.length === 0 ? (
            <p className="text-xl font-semibold text-gray-600 text-center mt-6">
              No products found.
            </p>
          ) : (
            <ProductList
              products={products}
              handleCardClick={handleCardClick}
            />
          )}
          {products.length < total && (
            <div className="text-center mt-6">
              <Button
                onClick={handleLoadMore}
                className="bg-[#986B54] text-white hover:bg-[#8c5b43] px-6 py-3 rounded-full transition-transform transform hover:scale-105"
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
