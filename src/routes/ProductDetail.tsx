import { useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sliders } from "@/components/ui/sliders";
import ShareButton from "@/components/ShareButton";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import { APP_API_BASEURL } from "@/lib/env";
import { LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug as string;
  const response = await fetch(`${APP_API_BASEURL}/products/${slug}`);

  if (!response.ok) {
    throw new Response("Failed to fetch product", {
      status: 404,
      statusText: "Product not found",
    });
  }

  const data = await response.json();
  return { product: data.data };
};

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  const quantity = Number(formData.get("quantity")) || 1;

  try {
    const response = await apiFetch(
      `/cart/item`,
      {
        method: "POST",
        payload: { productId, quantity },
      },
      (error) => {
        throw new Error(error.message);
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unknown error");
    }

    toast.success("Product added to cart!");
    return redirect("/carts");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    if (errorMessage == "Unable to refresh access token!") {
      toast.error("You must be logged in to add product(s) to cart!");
      return redirect("/login");
    }

    toast.error(errorMessage || "Failed to add product(s) to cart.");
    return false;
  }
};

export const ProductDetail = () => {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const [quantity, setQuantity] = useState<number>(
    product.isAvailable && product.stock_qty > 0 ? 1 : 0
  );
  const [activeTab, setActiveTab] = useState<string>("description");

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

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 rounded-lg overflow-hidden">
          <Sliders
            imageSlides={product.image_url.map((url: string) => ({
              imageUrl: url,
            }))}
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
                        {value as React.ReactNode}
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
                        {value as React.ReactNode}
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
                disabled={!product.isAvailable || product.stock_qty === 0}
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="input-no-spinner mx-4 text-xl w-24 text-center border border-gray-300 rounded"
                min="1"
                disabled={!product.isAvailable || product.stock_qty === 0}
              />
              <Button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-full"
                onClick={handleIncreaseQuantity}
                disabled={!product.isAvailable || product.stock_qty === 0}
              >
                +
              </Button>
            </div>

            <Form method="post">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="quantity" value={quantity} />
              <Button
                type="submit"
                className="bg-coffee text-white hover:bg-coffee-hover px-6 py-3 rounded-full w-full"
                disabled={!product.isAvailable || product.stock_qty === 0}
              >
                <FaCartPlus className="mr-2" />
                Add to Cart
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
