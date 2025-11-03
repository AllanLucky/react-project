import dayjs from 'dayjs';
import FormatMoney from '../../utils/Money';

const OrderSummary = ({ cart, deliveryOption }) => {
  return (
    <section className="order-summary">
      {/* === Order Summary Section === */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((cartItem) => (
          <article key={cartItem.id} className="cart-item-container">
            <p className="delivery-date">
              {deliveryOption.length > 0
                ? dayjs(deliveryOption[0].estimatedDeliveryTimeMs)
                  .add(7, 'day')
                  .format('MMMM D, YYYY')
                : 'Loading...'}
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
                <div className="product-quantity">
                  <span>
                    Quantity:{' '}
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

              <div className="delivery-options">
                <h3 className="delivery-options-title">
                  Choose a delivery option:
                </h3>
                {deliveryOption.map((option) => (
                  <label key={option.id} className="delivery-option">
                    <input
                      type="radio"
                      defaultChecked
                      className="delivery-option-input"
                      name={`delivery-option-${cartItem.id}`}
                    />
                    <div>
                      <p className="delivery-option-date">
                        {dayjs(option.estimatedDeliveryTimeMs).format(
                          'MMMM D, YYYY'
                        )}
                      </p>
                      <p className="delivery-option-price">
                        {option.priceCents === 0
                          ? 'FREE Shipping'
                          : `${FormatMoney(option.priceCents)} - Shipping`}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </article>
        ))
      )}
    </section>
  );
};

export default OrderSummary;
