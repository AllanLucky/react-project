import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FormatMoney from '../utils/Money';
import './HomePage.css';
import axios from 'axios';

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
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
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  {FormatMoney(product.priceCents ?? product.price)}
                </div>

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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
