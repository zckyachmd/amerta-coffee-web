import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FaCartPlus, FaArrowRight } from "react-icons/fa";

const productsData = [
  {
    id: 1,
    name: "Kopi Arabica",
    thumbnail: "https://placehold.co/150x150?text=Kopi+Arabica",
    price: 50000,
  },
  {
    id: 2,
    name: "Kopi Robusta",
    thumbnail: "https://placehold.co/150x150?text=Kopi+Robusta",
    price: 45000,
  },
  {
    id: 3,
    name: "Kopi Liberica",
    thumbnail: "https://placehold.co/150x150?text=Kopi+Liberica",
    price: 60000,
  },
  {
    id: 4,
    name: "Kopi Excelsa",
    thumbnail: "https://placehold.co/150x150?text=Kopi+Excelsa",
    price: 55000,
  },
  {
    id: 5,
    name: "Kopi Toraja",
    thumbnail: "https://placehold.co/150x150?text=Kopi+Toraja",
    price: 70000,
  },
  {
    id: 6,
    name: "Kopi Toraja",
    thumbnail: "https://placehold.co/150x150?text=Kopi+Toraja",
    price: 70000,
  },
];

const imageSlides = [
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+1", url: "/page1" },
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+2", url: "/page2" },
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+3", url: "/page3" },
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+4", url: "/page4" },
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+5", url: "/page5" },
];

const Home = () => {
  return (
    <div className="p-4">
      <div className="max-w-screen-xl mx-auto my-4">
        {/* Slider */}
        <div className="mb-12">
          <Slider
            imageSlides={imageSlides}
            autoplayDelay={4000}
            prevButtonText="Prev"
            nextButtonText="Next"
          />
        </div>

        {/* Products */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Discover Our Exquisite Coffee Collection
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {productsData.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <Card className="shadow-sm rounded-sm overflow-hidden border border-gray-300">
                  <CardContent className="p-0">
                    <div className="w-full h-60">
                      <img
                        src={product.thumbnail}
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
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/products">
              <Button className="bg-[#986B54] text-white hover:bg-[#8c5b43] px-6 py-3 rounded-full">
                <span className="mr-2">
                  Browse Our Entire Coffee Collection
                </span>
                <FaArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
