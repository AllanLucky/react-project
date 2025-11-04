import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
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

  // Set default selected option (5 days)
  useEffect(() => {
    if (cart.length > 0) {
      const initial = {};
      cart.forEach((item) => {
        initial[item.id] = deliveryOptions[0].id;
      });
      setSelectedOptions(initial);
    }
  }, [cart]);

  const updateDeliveryOption = async (cartItemId, optionId) => {
    try {
      setSelectedOptions((prev) => ({ ...prev, [cartItemId]: optionId }));
      await axios.put(`/api/cart-items/${cartItemId}`, { optionId });
      await fetchCartItems();
    } catch (error) {
      console.error("Error updating delivery option:", error);
    }
  };

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <section className="order-summary">
      {cart.map((cartItem) => {
        const selectedId = selectedOptions[cartItem.id];
        const selectedOption = deliveryOptions.find((o) => o.id === selectedId);

        return (
          <article key={cartItem.id} className="cart-item-container">
            {/* === Delivery Date Display === */}
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
                  <button className="update-quantity-link link-primary">
                    Update
                  </button>
                  <button className="delete-quantity-link link-primary">
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
                    className={`delivery-option ${selectedOptions[cartItem.id] === option.id
                      ? "selected-option"
                      : ""
                      }`}
                  >
                    <input
                      type="radio"
                      name={`delivery-option-${cartItem.id}`}
                      className="delivery-option-input"
                      checked={selectedOptions[cartItem.id] === option.id}
                      onChange={() =>
                        updateDeliveryOption(cartItem.id, option.id)
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
