import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import convertDateFormat from '../utils/convertDateFormat';
import ProductInSaleCard from './ProductInSaleCard';

const testIdsPrefix = 'seller_order_details__';

function SellerOrderTable(props) {
  const {
    id,
    seller: { name },
    products,
    status,
    totalPrice,
    saleDate,
  } = props;

  const typographyBasicStyle = {
    fontSize: 14,
    color: '#000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
  };

  return (
    <Container>
      <Box
        sx={ {
          backgroundColor: '#E5E5E5',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '15px',
          justifyContent: 'space-around',
        } }
      >
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-order-id` }
        >
          <p>Pedido</p>
          { id }
        </Typography>
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-seller-name` }
        >
          <p>P.Vend:</p>
          { name }
        </Typography>
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-order-date` }
        >
          { convertDateFormat(saleDate) }
        </Typography>
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-delivery-status` }
        >
          { status }
        </Typography>
        <Button
          data-testid={ `${testIdsPrefix}button-preparing-check` }
        >
          Preparar Pedido
        </Button>
        <Button
          data-testid={ `${testIdsPrefix}button-dispatch-check` }
          disabled
        >
          Saiu para entrega
        </Button>
      </Box>
      <Box>
        { products
          .map((product, index) => (
            <ProductInSaleCard
              key={ index }
              { ...product }
              testIdsPrefix="seller_order_details__"
            />)) }
      </Box>
      <Typography
        data-testid={ `${testIdsPrefix}element-order-total-price` }
      >
        { totalPrice.replace('.', ',') }
      </Typography>
    </Container>
  );
}

SellerOrderTable.propTypes = {
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  seller: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SellerOrderTable;