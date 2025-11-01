import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { products } from '../../starting-coder/data/products.js'
import './HomePage.css';

const HomePage = () => {

  fetch('http://localhost:3000/api/products')
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    });
  return (
    <>
      <title>Home Page</title>
      <Header />
      <div className="home-page">
        <div className="products-grid">
          {/* === Product 1 === */}
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={product.image}
                    alt="Athletic Cotton Socks"
                  />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    alt="Rating"
                  />
                  <div className="product-rating-count link-primary">{product.rating.count}</div>
                </div>

                <div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>

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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
