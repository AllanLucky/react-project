import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import './HomePage.css';
import axios from 'axios';

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        <ProductCard products={products} />
      </div>
    </>
  );
};

export default HomePage;
