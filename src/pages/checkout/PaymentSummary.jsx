import axios from "axios";
import FormatMoney from "../../utils/Money";
import { useNavigate } from "react-router-dom";

const PaymentSummary = ({
  totalItems,
  productCostCents,
  shippingCostCents,
  totalCostBeforeTaxCents,
  taxCents,
  totalCostCents,
  fetchCartItems,
}) => {
  const navigate = useNavigate(); 

  const createOrder = async () => { 
    await axios.post("/api/orders");
    await fetchCartItems();
    navigate("/orders");
  };

  return (
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

      <button
        className="place-order-button button-primary"
        onClick={createOrder}
      >
        Place your order
      </button>
    </aside>
  );
};

export default PaymentSummary;
