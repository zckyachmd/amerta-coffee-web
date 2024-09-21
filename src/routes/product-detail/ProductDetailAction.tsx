import { APP_API_BASEURL } from "@/lib/env";
import { getAccessToken } from "@/lib/auth";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ request, navigate }: any) => {
  const accessToken = getAccessToken();

  const formData = await request.formData();
  const productId = formData.get("productId");
  const quantity = formData.get("quantity");

  if (!productId || !quantity) {
    toast.error("Product ID and quantity are required");
    return;
  }

  if (!accessToken) {
    toast.error("Please log in to add items to the cart.");
    navigate("/login");
    return;
  }

  const response = await fetch(`${APP_API_BASEURL}/carts/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      productId,
      quantity: Number(quantity),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add item to cart.");
  }

  toast.success("Item added to cart!");

  return redirect("/cart");
};
