import React, { Component } from 'react';
import * as api from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      categories: [],
      result: [],
    };
  }

  componentDidMount() {
    api.getCategories();
    api.getCategories().then((data) => {
      this.setState({
        categories: data,
      });
    });
  }

  inputText = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchButton = async () => {
    const { search, categories } = this.state;
    console.log(categories);
    const apiSearch = api.getProductsFromCategoryAndQuery;
    const response = await apiSearch('', search);
    const result = response.results;
    this.setState({
      result,
    });
  };

  render() {
    const { search, result, categories } = this.state;

    return (
      <>
        <input
          data-testid="query-input"
          type="text"
          onChange={ this.inputText }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.searchButton }
        >
          Pesquisar
        </button>
        {result.length < 1 ? <h1>Nenhum produto foi encontrado</h1> : (
          <section>
            {result.map((eachResult) => (
              <div data-testid="product" key={ eachResult.id }>
                <img src={ eachResult.thumbnail } alt="" />
                <span>{eachResult.title}</span>
                <span>
                  { eachResult.price }
                  { eachResult.currency_id }
                </span>
              </div>
            ))}
          </section>
        )}
        { search === '' ? (
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        ) : ''}

        {categories.map((cat) => (
          <button data-testid="category" type="button" key={ cat.id }>
            {cat.name}
          </button>
        ))}
      </>
    );
  }
}
