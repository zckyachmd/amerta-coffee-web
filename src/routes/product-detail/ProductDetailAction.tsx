import { getAccessToken } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";

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

  try {
    const response = await apiFetch(`/cart/item`, {
      method: "POST",
      payload: {
        productId,
        quantity: Number(quantity),
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to add item to cart.");
    }
  } catch (error: Error | any) {
    toast.error(error.message);
    return;
  }

  toast.success("Item added to cart!");
};
