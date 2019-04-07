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
          render={props => <Products products={products} managers={managers} />}
        />
        <Route
          path="/users"
          render={props => <Managers managers={managers} />}
        />
      </Fragment>
    );
  }
}
