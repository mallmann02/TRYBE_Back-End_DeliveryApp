import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import BackgroundContainer from '../components/BackgroundContainer';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import ContextProducts from '../context/ContextProducts';

function CustomerProducts() {
  const gridStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
    marginLeft: 5,
  };

  const {
    findProducts,
    allProducts: products,
    cartProducts,
    calculateSubtotal,
  } = useContext(ContextProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      await findProducts();
      setLoading(false);
    }
    getProducts(); // eslint-disable-next-line
  }, []);

  const renderProductCard = () => products.map((product, index) => (
    <ProductCard key={ index } { ...product } />
  ));

  return (
    <BackgroundContainer>
      <NavBar />

      { loading
        ? <p>Loading</p>
        : <Grid sx={ gridStyle }>{ renderProductCard() }</Grid> }

      <Button
        disabled={ cartProducts.length === 0 }
        data-testid="customer_products__button-cart"
      >
        <Link
          to="/customer/checkout"
          data-testid="customer_products__checkout-bottom-value"
        >
          { calculateSubtotal(cartProducts).toString().replace('.', ',') }
        </Link>
      </Button>
    </BackgroundContainer>
  );
}

export default CustomerProducts;
