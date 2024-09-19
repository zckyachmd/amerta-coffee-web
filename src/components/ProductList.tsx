import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "@/types/Product";

interface ProductListProps {
  products: Product[];
  handleCardClick: (
    slug: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  handleCardClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
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
  );
};

export default ProductList;
