import { Link } from 'react-router-dom';
import './header.css';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <title>Home Page</title>

      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img
              className="logo"
              src="images/logo-white.png"
              alt="Logo"
            />
            <img
              className="mobile-logo"
              src="images/mobile-logo-white.png"
              alt="Mobile Logo"
            />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
          />

          <button className="search-button">
            <img
              className="search-icon"
              src="images/icons/search-icon.png"
              alt="Search"
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
              alt="Cart"
            />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="home-page">
        <div className="products-grid">
          {/* === Product 1 === */}
          <div className="product-container">
            <div className="product-image-container">
              <img
                className="product-image"
                src="images/products/athletic-cotton-socks-6-pairs.jpg"
                alt="Athletic Cotton Socks"
              />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Black and Gray Athletic Cotton Socks - 6 Pairs
            </div>

            <div className="product-rating-container">
              <img
                className="product-rating-stars"
                src="images/ratings/rating-45.png"
                alt="Rating"
              />
              <div className="product-rating-count link-primary">87</div>
            </div>

            <div className="product-price">$10.90</div>

            <div className="product-quantity-container">
              <select>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" alt="Added" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>

          {/* === Product 2 === */}
          <div className="product-container">
            <div className="product-image-container">
              <img
                className="product-image"
                src="images/products/intermediate-composite-basketball.jpg"
                alt="Basketball"
              />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Intermediate Size Basketball
            </div>

            <div className="product-rating-container">
              <img
                className="product-rating-stars"
                src="images/ratings/rating-40.png"
                alt="Rating"
              />
              <div className="product-rating-count link-primary">127</div>
            </div>

            <div className="product-price">$20.95</div>

            <div className="product-quantity-container">
              <select>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" alt="Added" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>

          {/* === Product 3 === */}
          <div className="product-container">
            <div className="product-image-container">
              <img
                className="product-image"
                src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
                alt="T-Shirt"
              />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Adults Plain Cotton T-Shirt - 2 Pack
            </div>

            <div className="product-rating-container">
              <img
                className="product-rating-stars"
                src="images/ratings/rating-45.png"
                alt="Rating"
              />
              <div className="product-rating-count link-primary">56</div>
            </div>

            <div className="product-price">$7.99</div>

            <div className="product-quantity-container">
              <select>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" alt="Added" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
