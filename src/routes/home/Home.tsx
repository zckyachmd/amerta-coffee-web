import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sliders } from "@/components/ui/sliders";
import { loader } from "./HomeLoader";
import ProductList from "@/components/ProductList";

const Home = () => {
  const { products, imageSlides } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const navigate = useNavigate();

  const handleCardClick = (
    slug: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if ((e.target as HTMLElement).closest("button")) return;
    navigate(`/products/${slug}`);
  };

  return (
    <>
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
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Discover Our Exquisite Coffee Collection
        </h1>
        <ProductList products={products} handleCardClick={handleCardClick} />
        <div className="text-center mt-6">
          <div className="text-center mt-6">
            <Link to="/products">
              <Button className="bg-coffee text-white hover:bg-coffee-hover px-6 py-3 rounded-full">
                <span className="mr-2">Browse More Coffee</span>
                <FaArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
