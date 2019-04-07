import React from 'react';
import Product from './Product';

const Products = props => {
  const {products} = props;
  return (
    <ul className="list-group">
      {products.map(product => {
        return (
          <li key={product.id} className="list-group-item">
            <Product product={product}/>
          </li>
        );
      })}
    </ul>
  );
};

export default Products;
