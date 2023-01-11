import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class home extends Component {
  state = {
    loading: true,
    infoCategory: undefined,
  };

  componentDidMount() {
    this.funcGetCategories();
  }

  funcGetCategories = async () => {
    const infoCategory = await getCategories();
    console.log();
    this.setState({
      loading: false,
      infoCategory,
    });
  };

  render() {
    const { loading, infoCategory } = this.state;
    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">Carrinho</button>
        </Link>
        <div>
          {loading ? null
            : infoCategory.map((elemento) => (
              <button data-testid="category" key={ elemento.id } type="button">
                {elemento.name}
              </button>
            ))}
        </div>
      </div>
    );
  }
}

export default home;
