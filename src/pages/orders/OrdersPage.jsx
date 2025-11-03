import { useEffect, useState, Fragment } from 'react';
import Header from '../../components/Header';
import './orderspage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import FormatMoney from '../../utils/Money';

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/api/orders?expand=products')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <>
      <Header cart={cart} />
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" alt="Logo" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Mobile Logo" />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />
          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" alt="Search Icon" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart Icon" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format('MMMM D, YYYY')}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{FormatMoney(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map((orderproduct) => (
                  <Fragment key={orderproduct.product.id}>
                    <div className="product-image-container">
                      <img src={orderproduct.product.image} alt={orderproduct.product.name} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">{orderproduct.product.name}</div>
                      <div className="product-delivery-date">
                        Arriving on: {dayjs(orderproduct.estimatedDeliveryTimeMs).format('MMMM D, YYYY')}
                      </div>
                      <div className="product-quantity">Quantity: {orderproduct.quantity}</div>
                      <button className="buy-again-button button-primary">
                        <img className="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again" />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>
                  </Fragment>
                ))}
                <div className="product-actions">
                  <Link to="/tracking">
                    <button className="track-package-button button-secondary">
                      Track package
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
