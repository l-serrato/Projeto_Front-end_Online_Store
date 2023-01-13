import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    loading: true,
    infoCategory: undefined,
    search: '',
    result: '',
  };

  componentDidMount() {
    this.funcGetCategories();
  }

  funcGetCategories = async () => {
    const infoCategory = await getCategories();
    // console.log();
    this.setState({
      loading: false,
      infoCategory,
    });
  };

  inputText = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchButton = async () => {
    const { search } = this.state;
    // console.log(infoCategory);
    const apiSearch = getProductsFromCategoryAndQuery;
    const response = await apiSearch('', search);
    const result = response.results;
    this.setState({
      result,
    });
  };

  categs = async (event) => {
    const { name } = event.target;
    const categoria = await getProductsFromCategoryAndQuery(name);
    this.setState({
      result: categoria.results,
    });
  };

  addCart = (event, eachResult) => {
    // console.log(eachResult);
    const getStorage = JSON.parse(localStorage.getItem('IDS')) || [];
    const verific = getStorage.length > 0
      ? getStorage.find((elemento) => elemento.id === eachResult.id) : false;
    // console.log(verific);
    if (verific) {
      let { contTeste } = verific;
      contTeste = contTeste ? contTeste + 1 : 2;
      verific.contTeste = contTeste;
      // console.log(verific);
      const filtro = getStorage.filter((elemento) => elemento.id !== eachResult.id);
      // console.log(filtro);
      filtro.push(verific);
      localStorage.setItem('IDS', JSON.stringify(filtro));
    } else {
      getStorage.push(eachResult);
      localStorage.setItem('IDS', JSON.stringify(getStorage));
    }
  };

  render() {
    const { loading, infoCategory, result, search } = this.state;
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
                <Link
                  data-testid="product-detail-link"
                  to={ `/listdetails/${eachResult.id}` }
                >
                  <img src={ eachResult.thumbnail } alt="" />
                  <span>{eachResult.title}</span>
                  <span>
                    { eachResult.price }
                    { eachResult.currency_id }
                  </span>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  onClick={ (event) => this.addCart(event, eachResult) }
                  type="button"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </section>
        )}
        { search === '' ? (
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        ) : ''}
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">Carrinho</button>
        </Link>
        <div>
          {loading ? null
            : infoCategory.map((elemento) => (
              <button
                name={ elemento.id }
                data-testid="category"
                key={ elemento.id }
                type="button"
                onClick={ (event) => this.categs(event) }
              >

                {elemento.name}
              </button>
            ))}
        </div>
      </>
    );
  }
}
