import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sliders } from "@/components/ui/sliders";
import ShareButton from "@/components/ShareButton";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { action } from "./ProductDetailAction";
import { useLoaderData, useNavigate } from "react-router-dom";

type ProductFormInputs = {
  quantity: number;
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<ProductFormInputs>();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");

  const { product } = useLoaderData() as {
    product: {
      id: string;
      name: string;
      price: number;
      stock_qty: number;
      sku: string;
      description: string;
      image_url: string[];
      specifications: Record<string, string>;
      grinding: Record<string, string>;
    };
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock_qty));
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0 && value <= product.stock_qty) {
      setQuantity(value);
    }
  };

  const onSubmit = async () => {
    if (quantity <= 0) {
      toast.error("Quantity is required", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("quantity", quantity.toString());

    await action({
      request: new Request("", { method: "POST", body: formData }),
      navigate,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 rounded-lg overflow-hidden">
          <Sliders
            imageSlides={product.image_url.map((url) => ({ imageUrl: url }))}
            autoplayDelay={5000}
          />
        </div>

        <div className="md:w-1/2 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <ShareButton url={window.location.href} />
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
                  activeTab === "grinding"
                    ? "border-b-2 border-coffee text-coffee"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("grinding")}
              >
                Grinding
              </button>
            </div>
            <div className="py-4">
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "specification" && (
                <ul className="list-disc pl-5">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {value}
                      </li>
                    )
                  )}
                </ul>
              )}
              {activeTab === "grinding" && (
                <div>
                  <ul className="list-disc pl-5">
                    {Object.entries(product.grinding).map(([key, value]) => (
                      <li key={key}>
                        <strong>
                          {key
                            .replace(/-/g, " ")
                            .replace(/^\w/, (c) => c.toUpperCase())}
                          :
                        </strong>{" "}
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

            <Button
              className="bg-coffee text-white hover:bg-coffee-hover px-6 py-3 rounded-full w-full"
              onClick={handleSubmit(onSubmit)}
            >
              <FaCartPlus className="mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
