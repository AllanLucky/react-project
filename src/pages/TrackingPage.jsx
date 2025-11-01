import { Link } from 'react-router-dom';
import './tracking.css';

const TrackingPage = () => {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/orders" className="header-link">
            <img className="logo" src="images/logo-white.png" alt="Logo" />
            <img
              className="mobile-logo"
              src="images/mobile-logo-white.png"
              alt="Mobile Logo"
            />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />
          <button className="search-button">
            <img
              className="search-icon"
              src="images/icons/search-icon.png"
              alt="Search Icon"
            />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img
              className="cart-icon"
              src="images/icons/cart-icon.png"
              alt="Cart Icon"
            />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">Arriving on Monday, June 13</div>

          <div className="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div className="product-info">Quantity: 1</div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
            alt="Product"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
