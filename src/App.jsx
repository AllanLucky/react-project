import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage'; // ✅ Added this import
import TrackingPage from './pages/TrackingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} /> {/* ✅ Fixed space */}
      <Route path="/tracking" element={<TrackingPage />} /> {/* ✅ Fixed space */}
    </Routes>
  );
}

export default App;
