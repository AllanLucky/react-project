import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import './HomePage.css';
import axios from 'axios';

const HomePage = ({ cart, fetchCartItems }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <ProductCard products={products} fetchCartItems={fetchCartItems} />
      </div>
    </>
  );
};

export default HomePage;
