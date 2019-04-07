import React from 'react';

const Product = props => {
  const {product} = props;
  return (
    <div>
      <h6>{product.name}</h6>
    </div>
  );
};

export default Product;
