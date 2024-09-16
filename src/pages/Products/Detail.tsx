import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Detail Product</h1>
      <p>Ini adalah detail untuk produk: {productId}</p>
    </div>
  );
};

export default ProductDetail;
