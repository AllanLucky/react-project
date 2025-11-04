import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FormatMoney from "../utils/Money";

const Products = ({ product, fetchCartItems }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity,
      });

      await fetchCartItems();

      // ✅ Show success toast at top-right
      toast.success(`${product.name} added to cart! 🛒`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);

      // ❌ Show error toast if something goes wrong
      toast.error("Failed to add product. Please try again!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="product-container">
      {/* Product Image */}
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Name */}
      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      {/* Product Rating */}
      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          alt="Rating"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      {/* Product Price */}
      <div className="product-price">
        {FormatMoney(product.priceCents ?? product.price)}
      </div>

      {/* Quantity Selector */}
      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Add to Cart Button */}
      <button
        className="add-to-cart-button button-primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Products;
