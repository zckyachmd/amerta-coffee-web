import { APP_API_BASEURL } from "@/lib/env";

const imageSlides = [
  {
    imageUrl:
      "https://d8g5mz6srwlcs.cloudfront.net/original/66e26a620c6ce765056231.jpg",
    url: "#",
  },
  {
    imageUrl:
      "https://d8g5mz6srwlcs.cloudfront.net/original/66e26e3ea0a87535503441.jpg",
    url: "#",
  },
  {
    imageUrl:
      "https://d8g5mz6srwlcs.cloudfront.net/original/66e26e3ea0a87535503441.jpg",
    url: "#",
  },
  {
    imageUrl:
      "https://d8g5mz6srwlcs.cloudfront.net/original/66e256e2bc73c391604882.jpg",
    url: "#",
  },
  {
    imageUrl:
      "https://d8g5mz6srwlcs.cloudfront.net/original/66e3a5327e313561543844.jpg",
    url: "#",
  },
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
