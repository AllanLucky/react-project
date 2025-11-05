import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import FormatMoney from "../../utils/Money";

const OrderSummary = ({ cart = [], fetchCartItems }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  // Default delivery options
  const deliveryOptions = [
    { id: 1, days: 5, priceCents: 0 },
    { id: 2, days: 7, priceCents: 300 },
    { id: 3, days: 10, priceCents: 600 },
  ];

  const calculateDate = (days) => dayjs().add(days, "day").toDate();

  // ✅ Set default delivery option (5 days)
  useEffect(() => {
    if (cart.length > 0) {
      const initial = {};
      cart.forEach((item) => {
        initial[item.productId] = deliveryOptions[0].id;
      });
      setSelectedOptions(initial);
    }
  }, [cart]);

  // ✅ Update delivery option (radio button)
  const updateDeliveryOption = async (cartItem, optionId) => {
    try {
      setSelectedOptions((prev) => ({ ...prev, [cartItem.productId]: optionId }));
      await axios.patch(`/api/cart-items/${cartItem.productId}`, {
        deliveryOptionId: optionId,
      });
      await fetchCartItems();
      toast.success("Delivery option updated successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error updating delivery option:", error);
      toast.error("Failed to update delivery option.", {
        position: "top-right",
      });
    }
  };

  // ✅ Update quantity button
  const handleUpdateQuantity = async (cartItem) => {
    try {
      const newQuantity = prompt("Enter new quantity:", cartItem.quantity);
      if (!newQuantity || isNaN(newQuantity) || newQuantity <= 0) return;

      await axios.patch(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(newQuantity),
      });
      await fetchCartItems();
      toast.success("Quantity updated successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.", {
        position: "top-right",
      });
    }
  };

  // ✅ Delete cart item (improved)
  const handleDeleteItem = async (cartItem) => {
    try {
      const response = await axios.delete(`/api/cart-items/${cartItem.productId}`, {
        validateStatus: (status) => status >= 200 && status < 300 || status === 204,
      });

      // ✅ Treat 200 and 204 as success
      if (response.status === 200 || response.status === 204) {
        toast.success("Item deleted successfully!", {
          position: "top-right",
        });
      }

      await fetchCartItems();
    } catch (error) {
      // ✅ Check if backend returned 204 with no content
      if (error.response && error.response.status === 204) {
        toast.success("Item deleted successfully!", {
          position: "top-right",
        });
        await fetchCartItems();
        return;
      }

      console.error("Error deleting item:", error);
      toast.error("Failed to delete item.", {
        position: "top-right",
      });
    }
  };


  // ✅ Empty cart state
  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <section className="order-summary">
      {cart.map((cartItem) => {
        const selectedId = selectedOptions[cartItem.productId];
        const selectedOption = deliveryOptions.find((o) => o.id === selectedId);

        return (
          <article key={cartItem.productId} className="cart-item-container">
            {/* === Delivery Date === */}
            <p className="delivery-date">
              {selectedOption
                ? `Arriving ${dayjs(calculateDate(selectedOption.days)).format(
                  "MMMM D, YYYY"
                )}`
                : "Choose a delivery option"}
            </p>

            <div className="cart-item-details-grid">
              <img
                className="product-image"
                src={cartItem.product.image}
                alt={cartItem.product.name}
              />

              <div className="cart-item-details">
                <h2 className="product-name">{cartItem.product.name}</h2>
                <p className="product-price">
                  {FormatMoney(cartItem.product.priceCents)}
                </p>

                {/* === Quantity + Buttons === */}
                <div className="product-quantity">
                  <span>
                    Quantity:{" "}
                    <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <button
                    className="update-quantity-link link-primary"
                    onClick={() => handleUpdateQuantity(cartItem)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-quantity-link link-primary"
                    onClick={() => handleDeleteItem(cartItem)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* === Delivery Options === */}
              <div className="delivery-options">
                <h3 className="delivery-options-title">
                  Choose a delivery option:
                </h3>

                {deliveryOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`delivery-option ${selectedOptions[cartItem.productId] === option.id
                      ? "selected-option"
                      : ""
                      }`}
                  >
                    <input
                      type="radio"
                      name={`delivery-option-${cartItem.productId}`}
                      className="delivery-option-input"
                      checked={
                        selectedOptions[cartItem.productId] === option.id
                      }
                      onChange={() =>
                        updateDeliveryOption(cartItem, option.id)
                      }
                    />
                    <div>
                      <p className="delivery-option-date">
                        {dayjs(calculateDate(option.days)).format(
                          "MMMM D, YYYY"
                        )}
                      </p>
                      <p className="delivery-option-price">
                        {option.priceCents === 0
                          ? "FREE Shipping"
                          : `${FormatMoney(option.priceCents)} - Shipping`}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default OrderSummary;
