import React from 'react';
import Form from './Form';

const Product = props => {
  const {product,managers} = props;
  return (
    <div>
      <h6>{product.name}</h6>
      <Form managers = {managers}/>
    </div>
  );
};

export default Product;
