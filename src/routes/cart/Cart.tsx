import React, { useState, useEffect, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import { loader } from "./CartLoader";
import { getAccessToken } from "@/lib/auth";
import { APP_API_BASEURL } from "@/lib/env";
import Swal from "sweetalert2";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string[];
  slug: string; // Add slug property
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [cartItems, setCartItems] = useState<CartItem[]>(
    cartData.data.cart.items
  );
  const [totalPrice, setTotalPrice] = useState<number>(cartData.data.total);
  const accessToken = getAccessToken();

  const fetchCartData = useCallback(async () => {
    const response = await fetch(`${APP_API_BASEURL}/carts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart data.");
    }

    const data = await response.json();
    setCartItems(data.data.cart.items);
    setTotalPrice(data.data.total);
  }, [accessToken]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    const response = await fetch(`${APP_API_BASEURL}/carts/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update quantity.");
    }

    await fetchCartData();
  };

  const handleRemoveItem = async (itemId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${APP_API_BASEURL}/carts/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item.");
      }

      await fetchCartData();

      Swal.fire({
        icon: "success",
        title: "Item Removed!",
        text: "The item has been removed from your cart.",
        confirmButtonText: "OK!",
        confirmButtonColor: "#986B54",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-start">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl font-semibold text-gray-600 text-center py-40">
          No items in the cart.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="shadow-lg border rounded-lg"
              onClick={() => navigate(`/product/${item.product.slug}`)}
            >
              <CardContent className="flex flex-row items-center p-4">
                <img
                  src={
                    item.product.image_url[0] ||
                    "https://placehold.co/150x150?text=No+Image"
                  }
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-md">
                    Rp {item.product.price.toLocaleString("id-ID")} x{" "}
                    {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center mb-2">
                    <Button
                      className="bg-gray-300 text-black hover:bg-gray-400"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      className="bg-gray-300 text-black hover:bg-gray-400"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="flex items-center bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FaTrashAlt className="mr-1" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="mt-6 text-lg font-semibold">
            Total: Rp {totalPrice.toLocaleString("id-ID")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
