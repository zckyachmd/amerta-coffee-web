import { useLoaderData, useNavigate } from "react-router-dom";
import { FaCartPlus, FaArrowRight, FaSpinner } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/types/Product";
import { APP_API_BASEURL } from "@/lib/env";
import ky from "ky";

export const loader = async () => {
  try {
    const response = (await ky
      .get(`${APP_API_BASEURL}/products`, {
        searchParams: {
          limit: 6,
        },
      })
      .json()) as { data: { products: Product[] } };

    return { products: response.data?.products };
  } catch {
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
          <Slider
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product: Product) => (
              <Card
                key={product.id}
                className="shadow-sm rounded-sm overflow-hidden border border-gray-300 cursor-pointer"
                onClick={(e) => handleCardClick(product.slug, e)}
              >
                <CardContent className="p-0">
                  <div className="w-full h-60">
                    <img
                      src={
                        product.image_url ||
                        "https://placehold.co/150x150?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-700">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <Button className="mt-2 w-full bg-[#986B54] hover:bg-[#8c5b43] text-white py-2">
                      <FaCartPlus className="w-6 h-6 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Button className="bg-[#986B54] text-white hover:bg-[#8c5b43] px-6 py-3 rounded-full">
            <span className="mr-2">Browse Our Entire Coffee Collection</span>
            <FaArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
