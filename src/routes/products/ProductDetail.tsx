import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sliders } from "@/components/ui/sliders";
import { FaCartPlus } from "react-icons/fa";
import ShareButton from "@/components/ShareButton";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");

  const product = {
    name: "Sample Coffee Blend",
    price: 150000,
    description:
      "A rich and aromatic blend of the finest coffee beans. Perfect for any occasion. Enjoy!",
    images: [
      "https://placehold.co/800x600?text=Image+1",
      "https://placehold.co/800x600?text=Image+2",
      "https://placehold.co/800x600?text=Image+3",
    ],
    specifications: {
      weight: "250g",
      origin: "Ethiopia",
      roast: "Medium",
      flavor: "Chocolatey",
    },
    guide:
      "1. Brew with hot water at 90°C. 2. Use 2 tablespoons per cup. 3. Enjoy your coffee!",
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Sliders
            imageSlides={product.images.map((url) => ({ imageUrl: url }))}
            autoplayDelay={5000}
          />
        </div>

        <div className="md:w-1/2 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <ShareButton url="https://example.com" />
          </div>
          <p className="text-xl font-semibold mb-4">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <div className="mt-8">
            <div className="flex space-x-4 border-b border-gray-300">
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "description"
                    ? "border-b-2 border-coffee text-coffee"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "specification"
                    ? "border-b-2 border-coffee text-coffee"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("specification")}
              >
                Specification
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "guide"
                    ? "border-b-2 border-coffee text-coffee"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("guide")}
              >
                Guide
              </button>
            </div>
            <div className="py-4">
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "specification" && (
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Weight:</strong> {product.specifications.weight}
                  </li>
                  <li>
                    <strong>Origin:</strong> {product.specifications.origin}
                  </li>
                  <li>
                    <strong>Roast:</strong> {product.specifications.roast}
                  </li>
                  <li>
                    <strong>Flavor:</strong> {product.specifications.flavor}
                  </li>
                </ul>
              )}
              {activeTab === "guide" && <p>{product.guide}</p>}
            </div>
          </div>

          <div className="flex flex-col mt-10">
            <div className="flex items-center mb-6">
              <Button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-full"
                onClick={handleDecreaseQuantity}
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="input-no-spinner mx-4 text-xl w-24 text-center border border-gray-300 rounded"
                min="1"
              />
              <Button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-full"
                onClick={handleIncreaseQuantity}
              >
                +
              </Button>
            </div>

            <Button className="bg-coffee text-white hover:bg-coffee-hover px-6 py-3 rounded-full w-full">
              <FaCartPlus className="mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
