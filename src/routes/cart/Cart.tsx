import React, { useState, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaCreditCard, FaTrashAlt } from "react-icons/fa";
import { apiFetch } from "@/lib/api";
import { loader } from "./CartLoader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string[];
  slug: string;
  stock_qty: number;
  isAvailable: boolean;
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
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const fetchCartData = useCallback(async () => {
    try {
      const response = await apiFetch("/cart", {
        method: "GET",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch cart data.");
      }

      setCartItems(data.data.cart.items);
      setTotalPrice(data.data.total);
    } catch (error: Error | any) {
      toast.error(error.message);
    }
  }, []);

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    try {
      const response = await apiFetch(`/cart/item/${itemId}`, {
        method: "PATCH",
        payload: {
          quantity,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update quantity.");
      }

      await fetchCartData();
    } catch (error: Error | any) {
      toast.error(error.message);
    }
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
      try {
        const response = await apiFetch(`/cart/item/${itemId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to delete item.");
        }

        await fetchCartData();
      } catch (error: Error | any) {
        toast.error(error.message);
      }
    }
  };

  const handleCheckout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#986B54",
      confirmButtonText: "Yes, checkout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setIsCheckingOut(true);
      try {
        const response = await apiFetch("/cart/checkout", {
          method: "POST",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Checkout failed.");
        }

        await fetchCartData();

        Swal.fire({
          title: "Checkout Successful!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonColor: "#986B54",
        });
      } catch (error: Error | any) {
        toast.error(error.message);
      } finally {
        setIsCheckingOut(false);
      }
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
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="shadow-lg border rounded-lg">
              <CardContent className="flex flex-col md:flex-row md:items-center w-full p-4">
                <img
                  src={
                    item.product.image_url[0] ||
                    "https://placehold.co/150x150?text=No+Image"
                  }
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-4 cursor-pointer mx-auto md:mx-0"
                  onClick={() => navigate(`/product/${item.product.slug}`)}
                />
                <div className="flex-grow mb-4 md:mb-0 text-center md:text-left flex flex-col justify-center">
                  <h2
                    className="text-lg font-semibold cursor-pointer mb-1"
                    onClick={() => navigate(`/product/${item.product.slug}`)}
                  >
                    {item.product.name}
                  </h2>
                  <p className="text-md text-gray-600">
                    Rp {item.product.price.toLocaleString("id-ID")} x{" "}
                    {item.quantity}
                  </p>
                  {item.product.stock_qty === 0 || !item.product.isAvailable ? (
                    <Badge
                      variant="outline"
                      className="mt-2 inline-block text-xs py-1 px-2 w-max self-center md:self-start"
                    >
                      Out of Stock
                    </Badge>
                  ) : null}
                </div>
                <div className="flex flex-col items-center md:items-start md:ml-4">
                  <div className="flex items-center mb-2">
                    <Button
                      className="bg-gray-300 text-black hover:bg-gray-400 w-8 h-8 flex items-center justify-center rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(
                          item.id,
                          Math.max(item.quantity - 1, 1)
                        );
                      }}
                      disabled={
                        item.product.stock_qty === 0 ||
                        !item.product.isAvailable
                      }
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="input-no-spinner mx-2 text-xl w-12 text-center border border-gray-300 rounded"
                      onChange={(e) => {
                        const newQuantity = Math.max(Number(e.target.value), 1);
                        handleQuantityChange(item.id, newQuantity);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      disabled={
                        item.product.stock_qty === 0 ||
                        !item.product.isAvailable
                      }
                    />
                    <Button
                      className="bg-gray-300 text-black hover:bg-gray-400 w-8 h-8 flex items-center justify-center rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity + 1);
                      }}
                      disabled={
                        item.product.stock_qty === 0 ||
                        !item.product.isAvailable
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600 w-full md:w-32 py-2 mt-4 md:mt-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item.id);
                    }}
                  >
                    <FaTrashAlt className="mr-1" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center mt-6">
              <div className="text-lg font-semibold">
                Total: Rp {totalPrice.toLocaleString("id-ID")}
              </div>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-6"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  "Processing..."
                ) : (
                  <>
                    <FaCreditCard className="mr-2" /> Checkout
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
