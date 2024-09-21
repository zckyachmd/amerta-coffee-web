import { APP_API_BASEURL } from "@/lib/env";

const imageSlides = [
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+1", url: "/page1" },
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+2", url: "/page2" },
  { imageUrl: "https://placehold.co/1920x1080?text=Slider+3", url: "/page3" },
];

export const loader = async () => {
  try {
    const response = await fetch(`${APP_API_BASEURL}/products?limit=6`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = (await response.json()) as { data: { products: any } };

    return { products: data.data?.products, imageSlides };
  } catch {
    return { products: [], imageSlides };
  }
};
