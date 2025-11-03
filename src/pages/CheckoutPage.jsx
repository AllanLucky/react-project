import { Link } from 'react-router-dom';
import CheckoutHeader from '../components/CheckoutHeader';
import FormatMoney from '../utils/Money';
import './CheckoutPage.css';

const CheckoutPage = ({ cart }) => {
  return (
    <>
      <CheckoutHeader />

      <main className="checkout-page">
        <h1 className="page-title">Review your order</h1>

        <div className="checkout-grid">
          {/* === Order Summary Section === */}
          <section className="order-summary">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((cartItem) => (
                <article key={cartItem.id} className="cart-item-container">
                  <p className="delivery-date">Delivery date: Tuesday, June 21</p>

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
                          Quantity:{" "}
                          <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <button className="update-quantity-link link-primary">Update</button>
                        <button className="delete-quantity-link link-primary">Delete</button>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <h3 className="delivery-options-title">Choose a delivery option:</h3>
                      <label className="delivery-option">
                        <input
                          type="radio"
                          defaultChecked
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.id}`}
                        />
                        <div>
                          <p className="delivery-option-date">Tuesday, June 21</p>
                          <p className="delivery-option-price">FREE Shipping</p>
                        </div>
                      </label>

                      <label className="delivery-option">
                        <input
                          type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.id}`}
                        />
                        <div>
                          <p className="delivery-option-date">Wednesday, June 15</p>
                          <p className="delivery-option-price">$4.99 - Shipping</p>
                        </div>
                      </label>

                      <label className="delivery-option">
                        <input
                          type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.id}`}
                        />
                        <div>
                          <p className="delivery-option-date">Monday, June 13</p>
                          <p className="delivery-option-price">$9.99 - Shipping</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          {/* === Payment Summary Section === */}
          <aside className="payment-summary">
            <h2 className="payment-summary-title">Payment Summary</h2>

            <div className="payment-summary-row">
              <span>Items ({cart.length}):</span>
              <span className="payment-summary-money">
                $
                {cart
                  .reduce(
                    (sum, item) => sum + item.quantity * item.product.priceCents,
                    0
                  )
                  .toFixed(2) / 100}
              </span>
            </div>

            <div className="payment-summary-row">
              <span>Shipping &amp; handling:</span>
              <span className="payment-summary-money">$4.99</span>
            </div>

            <div className="payment-summary-row subtotal-row">
              <span>Total before tax:</span>
              <span className="payment-summary-money">$47.74</span>
            </div>

            <div className="payment-summary-row">
              <span>Estimated tax (10%):</span>
              <span className="payment-summary-money">$4.77</span>
            </div>

            <div className="payment-summary-row total-row">
              <strong>Order total:</strong>
              <strong className="payment-summary-money">$52.51</strong>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </aside>
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;
