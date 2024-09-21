import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAccessToken } from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";

interface ProductListProps {
  products: any;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleCardClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (productId: string) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      toast.error("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${APP_API_BASEURL}/carts/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }

      toast.success("Item added to cart!");
    } catch {
      toast.error("Failed to add item to cart.");
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
          {products.map((product: any) => (
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
                  <div className="mt-auto">
                    <Button
                      className="w-full bg-coffee text-white hover:bg-coffee-hover py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                    >
                      <FaCartPlus className="w-6 h-6 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
