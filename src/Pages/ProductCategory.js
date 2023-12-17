import React from "react";
import { useParams, Link } from "react-router-dom";
import Product from "../Components/Product";

const ProductCategory = () => {
  const { categoryId } = useParams();

  const dummyImageUrl = "https://m.media-amazon.com/images/I/71pv8TCWnxS._SY466_.jpg";

  const products = [
    { id: 1, name: "Product 1", category: 1, imageUrl: dummyImageUrl, price: 19.99 },
    { id: 2, name: "Product 2", category: 1, imageUrl: dummyImageUrl, price: 29.99 },
    { id: 3, name: "Product 3", category: 2, imageUrl: dummyImageUrl, price: 39.99 },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "80vw" }}>
        <h2>Products in Category {categoryId}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
              <Product imageUrl={product.imageUrl} name={product.name} price={product.price} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
