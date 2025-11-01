import { Link } from "react-router-dom"
import './checkout-header.css';
const CheckoutHeader = () => {

  return (
    <>
      {/* ===== Header Section ===== */}
      <header className="checkout-header">
        <div className="header-content">
          {/* Left */}
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" alt="Logo" />
              <img className="mobile-logo" src="images/mobile-logo.png" alt="Mobile Logo" />
            </Link>
          </div>

          {/* Middle */}
          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          {/* Right */}
          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="Lock Icon" />
          </div>
        </div>
      </header>
    </>
  )

}
export default CheckoutHeader