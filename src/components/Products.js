import React from 'react';
import Product from './Product';

const Products = props => {
  const {products, managers, handleChange, handleSave} = props;
  return (
    <ul className="list-group">
      {products.map(product => {
        return (
          <li key={product.id} className="list-group-item">
            <Product
              product={product}
              managers={managers}
              handleChange={handleChange}
              handleSave={handleSave}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Products;
