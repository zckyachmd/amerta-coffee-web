import { useLoaderData, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sliders } from "@/components/ui/sliders";
import { APP_API_BASEURL } from "@/lib/env";
import ProductList from "@/components/ProductList";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export const loader = async () => {
  const imageSlides = [
    {
      imageUrl: "img/slides/66fb03dab5647963809283.jpg",
      url: "/products",
    },
    {
      imageUrl: "img/slides/66fbc96abdccc232270105.jpg",
      url: "#",
    },
    {
      imageUrl: "img/slides/66fd2aedd4bc4876882426.jpg",
      url: "#",
    },
  ];

  try {
    const response = await fetch(
      `${APP_API_BASEURL}/products?limit=3&s=${encodeURIComponent(
        JSON.stringify({ createdAt: "desc" })
      )}`
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch products!");
    }

    const { data } = await response.json();
    return { products: data.products, imageSlides };
  } catch {
    return { products: [], imageSlides };
  }
};

export const Home: React.FC = () => {
  const { products, imageSlides } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  
  useDocumentTitle();

  return (
    <>
      {imageSlides.length > 0 && (
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <Sliders
            imageSlides={imageSlides}
            autoplayDelay={4000}
            prevButtonText="Prev"
            nextButtonText="Next"
          />
        </div>
      )}
      <div className="px-4 md:px-0 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Discover Our Exquisite Coffee Collection
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Explore a variety of flavors and find your perfect brew. Quality beans
          sourced from the best regions around the world.
        </p>
        <ProductList products={products} />
        <div className="text-center mt-6">
          <Link to="/products">
            <Button className="bg-coffee text-white hover:bg-coffee-hover px-6 py-3 rounded-full">
              <span className="mr-2">Browse More Coffee</span>
              <FaArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
