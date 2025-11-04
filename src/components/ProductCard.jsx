import React from "react";
import Products from "./Products";
import FormatMoney from "../utils/Money"; // Keep imports organized (external, then internal)

const ProductCard = ({ products = [], fetchCartItems }) => {
  if (!products.length) {
    return (
      <p className="text-center text-gray-500 py-8">
        No products available.
      </p>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <Products
          key={product.id}
          product={product}
          fetchCartItems={fetchCartItems}
        />
      ))}
    </div>
  );
};

export default ProductCard;
