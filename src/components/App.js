import React, {Component, Fragment} from 'react';
import Nav from './Nav';
import {Route} from 'react-router-dom';
import Products from './Products';
import Managers from './Managers';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      managers: [],
      selectedManagers: [],
      error: '',
    };
  }

  async componentDidMount() {
    try {
      const [products, managers] = await Promise.all([
        axios.get('/api/products').then(response => response.data),
        axios.get('/api/users').then(response => response.data),
      ]);
      //deep copy products to make a managed state prop
      const selectedManagers = JSON.parse(JSON.stringify(products));
      this.setState({
        products,
        managers,
        selectedManagers,
      });
    } catch (err) {
      this.setState({error: err.message});
    }
  }

  handleChange = (event, productId) => {
    const {target} = event;
    const productIndex = this.state.selectedManagers.findIndex(
      product => product.id === productId
    );
    const newArr = this.state.selectedManagers.slice();
    newArr[productIndex].user = this.state.managers.find(
      manager => manager.id === target.value * 1
    );
    target.value === '000'
      ? (newArr[productIndex].userId = null)
      : (newArr[productIndex].userId = target.value * 1);
    this.setState({selectedManagers: newArr});
  };

  handleSave = async productId => {
    try {
      const newProduct = this.state.selectedManagers.find(
        product => product.id === productId
      );

      await axios.put(`/api/products/${productId}`, {
        userId: newProduct.userId,
      });

      //update Products to the new updated product
      const newProductArr = this.state.products.slice();
      const newProductIndex = newProductArr.findIndex(
        product => product.id === newProduct.id
      );
      newProductArr[newProductIndex] = JSON.parse(JSON.stringify(newProduct));

      //update Managers with their products
      const newManagerArr = this.state.managers.map(manager => {
        manager.products = manager.products.filter(
          product => product.id !== newProduct.id
        );
        return manager;
      });

      if (newProduct.userId !== null) {
        const newManagerIndex = newManagerArr.findIndex(
          manager => manager.id === newProduct.userId
        );
        newManagerArr[newManagerIndex].products.push(newProduct);
      }

      //set state
      this.setState({
        products: newProductArr,
        managers: newManagerArr,
      });
    } catch (err) {
      console.log(err);
      this.setState({error: err.message});
    }
  };

  render() {
    console.log(this.state);
    const {products, managers, error, selectedManagers} = this.state;
    const managersWithProducts = managers.filter(
      manager => manager.products.length > 0
    );
    return (
      <Fragment>
        <div>
          <h1>Acme Product Managers</h1>
          <Nav managers={managersWithProducts} />
          {error ? <h2 style={{color: 'red'}}>{`error: ${error}`}</h2> : ''}
        </div>
        <Route
          exact
          path="/"
          render={() => `We have openings for Product Managers!`}
        />
        <Route
          path="/products"
          render={() => (
            <Products
              products={products}
              selectedManagers={selectedManagers}
              managers={managers}
              handleChange={this.handleChange}
              handleSave={this.handleSave}
            />
          )}
        />
        <Route
          path="/users"
          render={() => <Managers managers={managersWithProducts} />}
        />
      </Fragment>
    );
  }
}
