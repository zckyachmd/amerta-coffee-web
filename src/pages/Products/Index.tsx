import { Link } from "react-router-dom";

const Products = () => {
  const productList = [
    { id: "kopi-arabica", name: "Kopi Arabica" },
    { id: "kopi-robusta", name: "Kopi Robusta" },
  ];

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
