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
    await apiFetch(`/carts/items`, {
      method: "POST",
      payload: {
        productId,
        quantity: Number(quantity),
      },
    });
  } catch (error: Error | any) {
    toast.error(error.message || "Failed to add item to cart!");
    return;
  }

  toast.success("Item added to cart!");
};
