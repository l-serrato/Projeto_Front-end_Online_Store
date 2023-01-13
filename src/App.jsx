import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ListDetails from './components/ListDetails';
import Checkout from './components/Chekout';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exat
          path="/listdetails/:id"
          render={ (props) => (
            <ListDetails { ...props } />
          ) }
        />
        <Route
          path="/cart"
          exact
          render={ () => (

            <Cart />

          ) }
        />
        <Route
          data-testid="checkout-products"
          exact
          path="/checkout"
          render={ (props) => (
            <Checkout { ...props } />
          ) }
        />
        <Route className="App" exact path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
}

export default App;
