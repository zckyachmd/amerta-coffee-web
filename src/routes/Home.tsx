import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sliders } from "@/components/ui/sliders";
import { Product } from "@/types/Product";
import { APP_API_BASEURL } from "@/lib/env";
import ProductList from "@/components/ProductList";

export const loader = async () => {
  try {
    const response = await fetch(`${APP_API_BASEURL}/products?limit=6`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = (await response.json()) as { data: { products: Product[] } };

    return { products: data.data?.products };
  } catch (error) {
    console.error(error);
    return { products: [] };
  }
};

export const Home = () => {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const navigate = useNavigate();

  const imageSlides = [
    { imageUrl: "https://placehold.co/1920x1080?text=Slider+1", url: "/page1" },
    { imageUrl: "https://placehold.co/1920x1080?text=Slider+2", url: "/page2" },
    { imageUrl: "https://placehold.co/1920x1080?text=Slider+3", url: "/page3" },
  ];

  const handleCardClick = (
    slug: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if ((e.target as HTMLElement).closest("button")) return;
    navigate(`/products/${slug}`);
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  }

  return (
    <>
      {/* Slider */}
      {imageSlides.length > 0 && (
        <div className="mb-12">
          <Sliders
            imageSlides={imageSlides}
            autoplayDelay={4000}
            prevButtonText="Prev"
            nextButtonText="Next"
          />
        </div>
      )}

      {/* Products */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Discover Our Exquisite Coffee Collection
        </h1>
        {products.length === 0 ? (
          <p className="text-xl font-semibold text-gray-600 text-center mt-6">
            No products found.
          </p>
        ) : (
          <ProductList products={products} handleCardClick={handleCardClick} />
        )}
        <div className="text-center mt-6">
          <Link to="/products" className="inline-block">
            <Button className="bg-[#986B54] text-white hover:bg-[#8c5b43] px-6 py-3 rounded-full">
              <span className="mr-2">Browse More Coffee</span>
              <FaArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
