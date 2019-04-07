import React from 'react';
import Form from './Form';

const Product = props => {
  const {product, managers, handleChange} = props;
  return (
    <div>
      <h6>{product.name}</h6>
      <Form
        managers={managers}
        product={product}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Product;
