import React from 'react';
import Product from './Product';

const Products = props => {
  const {
    products,
    managers,
    handleChange,
    handleSave,
    selectedManagers,
  } = props;
  return (
    <ul className="list-group">
      {products.map(product => {
        return (
          <li key={product.id} className="list-group-item">
            <Product
              product={product}
              selectedManagers={selectedManagers}
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
