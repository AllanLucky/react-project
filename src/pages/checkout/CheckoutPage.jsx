import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutHeader from "../../components/CheckoutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import { toast } from "react-toastify";
import "./checkoutpage.css";

const CheckoutPage = ({ cart, fetchCartItems }) => {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch delivery options and payment summary on mount
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const [deliveryRes, paymentRes] = await Promise.all([
          axios.get("/api/delivery-options"),
          axios.get("/api/payment-summary"),
        ]);

        setDeliveryOption(deliveryRes.data);
        setPaymentSummary(paymentRes.data);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
        toast.error("Failed to load checkout details. Please try again.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, []);

  // ✅ Re-fetch payment summary when cart changes
  useEffect(() => {
    const fetchPaymentSummary = async () => {
      try {
        const res = await axios.get("/api/payment-summary");
        setPaymentSummary(res.data);
      } catch (error) {
        console.error("Error fetching updated payment summary:", error);
      }
    };

    if (cart.length > 0) fetchPaymentSummary();
  }, [cart]);

  // ✅ Safe access using optional chaining
  const totalItems = paymentSummary?.totalItems ?? cart.length;
  const productCostCents = paymentSummary?.productCostCents ?? 0;
  const shippingCostCents = paymentSummary?.shippingCostCents ?? 0;
  const totalCostBeforeTaxCents = paymentSummary?.totalCostBeforeTaxCents ?? 0;
  const taxCents = paymentSummary?.taxCents ?? 0;
  const totalCostCents = paymentSummary?.totalCostCents ?? 0;

  // ✅ Loading state
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
          <OrderSummary
            cart={cart}
            deliveryOption={deliveryOption}
            fetchCartItems={fetchCartItems}
          />

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
