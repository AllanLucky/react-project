import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import TrackingPage from './pages/TrackingPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]); // ✅ Added this line
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));

    axios.get('/api/cart-items')
      .then((response) => setCart(response.data))
      .catch((error) => console.error('Error fetching cart items:', error));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage products={products} cart={cart} />} /> {/* ✅ Passed products */}
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
