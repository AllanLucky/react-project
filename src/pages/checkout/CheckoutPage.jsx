import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CheckoutHeader from "../../components/CheckoutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import FormatMoney from "../../utils/Money"; // ✅ Correct import (not just inclusion)
import "./checkoutpage.css";

const CheckoutPage = ({ cart }) => {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [loading, setLoading] = useState(true); // optional loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deliveryRes, paymentRes] = await Promise.all([
          axios.get("/api/delivery-options?expand=estimatedDeliveryTime"),
          axios.get("/api/payment-summary"),
        ]);

        setDeliveryOption(deliveryRes.data);
        setPaymentSummary(paymentRes.data);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Safely access payment summary values with fallbacks
  const totalItems = paymentSummary?.totalItems ?? cart.length;
  const productCostCents = paymentSummary?.productCostCents ?? 0;
  const shippingCostCents = paymentSummary?.shippingCostCents ?? 0;
  const totalCostBeforeTaxCents = paymentSummary?.totalCostBeforeTaxCents ?? 0;
  const taxCents = paymentSummary?.taxCents ?? 0;
  const totalCostCents = paymentSummary?.totalCostCents ?? 0;

  if (loading) {
    return (
      <main className="checkout-page loading-page">
        <p>Loading checkout details...</p>
      </main>
    );
  }

  return (
    <>
      <CheckoutHeader />

      <main className="checkout-page">
        <h1 className="page-title">Review your order</h1>

        <div className="checkout-grid">
          {/* 🛒 Order Summary Section */}
          <OrderSummary cart={cart} deliveryOption={deliveryOption} />

          {/* 💳 Payment Summary Section */}
          {paymentSummary ? (
            <PaymentSummary
              paymentSummary={paymentSummary}
              totalItems={totalItems}
              productCostCents={productCostCents}
              shippingCostCents={shippingCostCents}
              totalCostBeforeTaxCents={totalCostBeforeTaxCents}
              taxCents={taxCents}
              totalCostCents={totalCostCents}
            />
          ) : (
            <div className="loading-summary">
              <p>Loading payment details...</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;

