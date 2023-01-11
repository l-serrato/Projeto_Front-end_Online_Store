import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class home extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link type="button" data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
      </div>
    );
  }
}

export default home;
