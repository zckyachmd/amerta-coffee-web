import React from "react";
import { useNavigate, Form } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";

const ProductList: React.FC<any> = ({ products }) => {
  const navigate = useNavigate();

  const handleCardClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await apiFetch(
        "/cart/item",
        {
          method: "POST",
          payload: {
            productId,
            quantity: 1,
          },
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
      return navigate("/carts");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

      if (errorMessage == "Unable to refresh access token!") {
        toast.error("You must be logged in to add product(s) to cart!");
        return navigate("/login");
      }

      toast.error(errorMessage || "Failed to add product(s) to cart.");
      return false;
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <p className="text-xl font-semibold text-gray-600 text-center mt-6">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product: any) => {
            const isOutOfStock =
              !product.isAvailable || product.stock_qty === 0;

            return (
              <Card
                key={product.id}
                className="shadow-sm rounded-sm overflow-hidden border border-gray-300 cursor-pointer"
                onClick={() => handleCardClick(product.slug)}
              >
                <CardContent className="p-0 flex flex-col">
                  <div className="w-full h-60">
                    <img
                      src={
                        product.image_url[0] ||
                        "https://placehold.co/150x150?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <Form className="mt-auto">
                      <Button
                        className={`w-full py-2 ${
                          isOutOfStock
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-coffee text-white hover:bg-coffee-hover"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isOutOfStock) handleAddToCart(product.id);
                        }}
                        disabled={isOutOfStock}
                      >
                        <FaCartPlus className="w-6 h-6 mr-2" />
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </Form>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductList;
