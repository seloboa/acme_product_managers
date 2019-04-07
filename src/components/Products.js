import React from 'react';
import Product from './Product';

const Products = props => {
  const {products,managers} = props;
  return (
    <ul className="list-group">
      {products.map(product => {
        return (
          <li key={product.id} className="list-group-item">
            <Product product={product} managers={managers}/>
          </li>
        );
      })}
    </ul>
  );
};

export default Products;
