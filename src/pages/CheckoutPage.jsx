import { Link } from 'react-router-dom';
import CheckoutHeader from '../components/CheckoutHeader';
import FormatMoney from '../utils/Money';
import dayjs from 'dayjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ cart }) => {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deliveryRes, paymentRes] = await Promise.all([
          axios.get('/api/delivery-options?expand=estimatedDeliveryTime'),
          axios.get('/api/payment-summary')
        ]);
        setDeliveryOption(deliveryRes.data);
        setPaymentSummary(paymentRes.data);
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    };

    fetchData();
  }, []);

  // Safely access payment summary values
  const totalItems = paymentSummary?.totalItems ?? cart.length;
  const productCostCents = paymentSummary?.productCostCents ?? 0;
  const shippingCostCents = paymentSummary?.shippingCostCents ?? 0;
  const totalCostBeforeTaxCents =
    paymentSummary?.totalCostBeforeTaxCents ?? 0;
  const taxCents = paymentSummary?.taxCents ?? 0;
  const totalCostCents = paymentSummary?.totalCostCents ?? 0;

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
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
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

          {/* === Payment Summary Section === */}
          <aside className="payment-summary">
            <h2 className="payment-summary-title">Payment Summary</h2>

            <div className="payment-summary-row">
              <span>Items ({totalItems}):</span>
              <span className="payment-summary-money">
                {FormatMoney(productCostCents)}
              </span>
            </div>

            <div className="payment-summary-row">
              <span>Shipping &amp; handling:</span>
              <span className="payment-summary-money">
                {FormatMoney(shippingCostCents)}
              </span>
            </div>

            <div className="payment-summary-row subtotal-row">
              <span>Total before tax:</span>
              <span className="payment-summary-money">
                {FormatMoney(totalCostBeforeTaxCents)}
              </span>
            </div>

            <div className="payment-summary-row">
              <span>Estimated tax (10%):</span>
              <span className="payment-summary-money">
                {FormatMoney(taxCents)}
              </span>
            </div>

            <div className="payment-summary-row total-row">
              <strong>Order total:</strong>
              <strong className="payment-summary-money">
                {FormatMoney(totalCostCents)}
              </strong>
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
