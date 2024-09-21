import { loader } from "./ProductDetailLoader";
import ProductDetail from "./ProductDetail";
import { action } from "./ProductDetailAction";

const ProductRoute = {
  ProductLoader: loader,
  ProductDetail,
  ProductDetailAction: action,
};

export default ProductRoute;
