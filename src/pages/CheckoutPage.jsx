import './checkout-header.css';
import './CheckoutPage.css';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  return (
    <>
      <title>Checkout</title>

      {/* ===== Header Section ===== */}
      <header className="checkout-header">
        <div className="header-content">
          {/* Left */}
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" alt="Logo" />
              <img className="mobile-logo" src="images/mobile-logo.png" alt="Mobile Logo" />
            </Link>
          </div>

          {/* Middle */}
          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          {/* Right */}
          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="Lock Icon" />
          </div>
        </div>
      </header>

      {/* ===== Main Checkout Page ===== */}
      <main className="checkout-page">
        <h1 className="page-title">Review your order</h1>

        <div className="checkout-grid">
          {/* === Order Summary Section === */}
          <section className="order-summary">
            {/* First Item */}
            <article className="cart-item-container">
              <p className="delivery-date">Delivery date: Tuesday, June 21</p>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src="images/products/athletic-cotton-socks-6-pairs.jpg"
                  alt="Athletic Cotton Socks"
                />

                <div className="cart-item-details">
                  <h2 className="product-name">Black and Gray Athletic Cotton Socks - 6 Pairs</h2>
                  <p className="product-price">$10.90</p>
                  <div className="product-quantity">
                    <span>
                      Quantity: <span className="quantity-label">2</span>
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
                      name="delivery-option-1"
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
                      name="delivery-option-1"
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
                      name="delivery-option-1"
                    />
                    <div>
                      <p className="delivery-option-date">Monday, June 13</p>
                      <p className="delivery-option-price">$9.99 - Shipping</p>
                    </div>
                  </label>
                </div>
              </div>
            </article>

            {/* Second Item */}
            <article className="cart-item-container">
              <p className="delivery-date">Delivery date: Wednesday, June 15</p>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src="images/products/intermediate-composite-basketball.jpg"
                  alt="Basketball"
                />

                <div className="cart-item-details">
                  <h2 className="product-name">Intermediate Size Basketball</h2>
                  <p className="product-price">$20.95</p>
                  <div className="product-quantity">
                    <span>
                      Quantity: <span className="quantity-label">1</span>
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
                      className="delivery-option-input"
                      name="delivery-option-2"
                    />
                    <div>
                      <p className="delivery-option-date">Tuesday, June 21</p>
                      <p className="delivery-option-price">FREE Shipping</p>
                    </div>
                  </label>

                  <label className="delivery-option">
                    <input
                      type="radio"
                      defaultChecked
                      className="delivery-option-input"
                      name="delivery-option-2"
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
                      name="delivery-option-2"
                    />
                    <div>
                      <p className="delivery-option-date">Monday, June 13</p>
                      <p className="delivery-option-price">$9.99 - Shipping</p>
                    </div>
                  </label>
                </div>
              </div>
            </article>
          </section>

          {/* === Payment Summary Section === */}
          <aside className="payment-summary">
            <h2 className="payment-summary-title">Payment Summary</h2>

            <div className="payment-summary-row">
              <span>Items (3):</span>
              <span className="payment-summary-money">$42.75</span>
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
