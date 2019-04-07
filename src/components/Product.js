import React from 'react';
import Form from './Form';

const Product = props => {
  const {product, managers, handleChange, handleSave} = props;
  return (
    <div>
      <h6>{product.name}</h6>
      <Form
        managers={managers}
        product={product}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Product;
