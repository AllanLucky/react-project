import { Link } from 'react-router-dom';
import './header.css';

const Header = ({ cart = [] }) => {
  // Safely calculate total cart quantity
  const totalQuantity = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  return (
    <header className="header">
      {/* ===== Left Section (Logo) ===== */}
      <div className="left-section">
        <Link to="/" className="header-link">
          <img
            className="logo"
            src="./images/logo-white.png"
            alt="Logo"
          />
          {/* Uncomment if you want mobile version of logo */}
          <img
            className="mobile-logo"
            src="/images/mobile-logo-white.png"
            alt="Mobile Logo"
          />
        </Link>
      </div>

      {/* ===== Middle Section (Search Bar) ===== */}
      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
        />
        <button className="search-button">
          <img
            className="search-icon"
            src="/images/icons/search-icon.png"
            alt="Search"
          />
        </button>
      </div>

      {/* ===== Right Section (Orders + Cart) ===== */}
      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img
            className="cart-icon"
            src="/images/icons/cart-icon.png"
            alt="Cart"
          />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
