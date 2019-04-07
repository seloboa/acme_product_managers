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
      error: '',
    };
  }

  async componentDidMount() {
    try {
      const [products, managers] = await Promise.all([
        axios.get('/api/products').then(response => response.data),
        axios.get('/api/users').then(response => response.data),
      ]);
      this.setState({...this.state, products: products, managers: managers});
    } catch (err) {
      this.setState({...this.state, error: err.message});
    }
  }

  handleChange = (event, productId) => {
    const {target} = event;
    const productIndex = this.state.products.findIndex(
      product => product.id === productId
    );
    const newArr = this.state.products.slice();
    newArr[productIndex].user = this.state.managers.find(
      manager => manager.id === target.value * 1
    );
    newArr[productIndex].userId = target.value * 1;
    this.setState({...this.state, products: newArr});
  };

  handleSave = async productId => {
    try {
      const productToUpdateToDb = this.state.products.find(
        product => product.id === productId
      );
      const newProduct = await axios
        .put(`/api/products/${productId}`, productToUpdateToDb)
        .then(res => res.data[0]);
      newProduct.user = this.state.managers.find(
        manager => manager.id === newProduct.userId
      );
      const newArr = this.state.products.slice();
      const newProductIndex = newArr.findIndex(
        product => product.id === newProduct.id
      );
      newArr[newProductIndex] = newProduct;
      this.setState({...this.state, products: newArr});
    } catch (err) {
      this.setState({...this.state, error: err.message});
    }
  };

  render() {
    const {products, managers} = this.state;
    return (
      <Fragment>
        <div>
          <h1>Acme Product Managers</h1>
          <Nav />
        </div>
        <Route
          exact
          path="/"
          render={() => `We have openings for Product Managers!`}
        />
        <Route
          path="/products"
          render={props => (
            <Products
              products={products}
              managers={managers}
              handleChange={this.handleChange}
              handleSave={this.handleSave}
            />
          )}
        />
        <Route
          path="/users"
          render={props => <Managers managers={managers} />}
        />
      </Fragment>
    );
  }
}
