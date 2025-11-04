import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  const [cart, setCart] = useState([]);

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<HomePage cart={cart} fetchCartItems={fetchCartItems} />}
        />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="/orders" element={<OrdersPage cart={cart} />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>

      {/* Toastify Container (for global notifications) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
