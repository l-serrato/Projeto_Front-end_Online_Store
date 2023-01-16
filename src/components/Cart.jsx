import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  state = {
    loading: true,
    productIds: undefined,
  };

  async componentDidMount() {
    await this.funcGetLocalStorage();
  }

  funcGetLocalStorage = () => {
    const productIds = JSON.parse(localStorage.getItem('IDS'));
    // console.log(productIds);
    // console.log(productIds);
    this.setState({
      loading: false,
      productIds,
    });
  };

  FuncExcluir = ({ target: { value, name } }) => {
    const getProducts = JSON.parse(localStorage.getItem('IDS'));
    const decisao = value === 'Excluir';
    if (decisao || (value === '-' && contTeste === 1)) {
      const filtro = getProducts.filter((elemento) => elemento.id !== name);
      localStorage.setItem('IDS', JSON.stringify(filtro));
    }
    this.funcGetLocalStorage();
  };

  funcAdd = ({ target: { name } }) => {
    const getProducts = JSON.parse(localStorage.getItem('IDS'));
    const verific = getProducts.find((elemento) => elemento.id === name);
    console.log(verific);
    let { contTeste } = verific;
    contTeste = contTeste || 1;
    verific.contTeste = verific.available_quantity > contTeste
      ? contTeste + 1 : contTeste;
    const filtro = getProducts.filter((elemento) => elemento.id !== name);
    filtro.push(verific);
    localStorage.setItem('IDS', JSON.stringify(filtro));
    this.funcGetLocalStorage();
  };

  funcMinus = ({ target: { name } }) => {
    const getProducts = JSON.parse(localStorage.getItem('IDS'));
    const verific = getProducts.find((elemento) => elemento.id === name);
    // console.log(verific);
    let { contTeste } = verific;
    contTeste = contTeste || 1;
    verific.contTeste = contTeste - 1;
    const filtro = getProducts.filter((elemento) => elemento.id !== name);
    filtro.push(verific);
    localStorage.setItem('IDS', JSON.stringify(filtro));
    this.funcGetLocalStorage();
  };

  render() {
    const { loading, productIds } = this.state;
    // console.log(productIds);
    return (
      <div>
        {loading ? <h1>Carregando...</h1> : null}
        {productIds ? productIds.map((elemento) => (
          <div key={ elemento.id }>
            <p
              data-testid="shopping-cart-product-name"
            >
              {elemento.title}
            </p>
            <p data-testid="shopping-cart-product-quantity">
              {elemento.contTeste ? elemento.contTeste : 1}
            </p>
            <div>
              <button
                onClick={ (event) => this.funcAdd(event) }
                type="button"
                data-testid="product-increase-quantity"
                name={ elemento.id }
              >
                +
              </button>
              <button
                onClick={ (event) => this.funcMinus(event) }
                type="button"
                data-testid="product-decrease-quantity"
                name={ elemento.id }
              >
                -
              </button>
              <button
                onClick={ (event) => this.FuncExcluir(event) }
                type="button"
                data-testid="remove-product"
                name={ elemento.id }
                value="Excluir"
              >
                Excluir
              </button>
            </div>
          </div>
        )) : <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
        {productIds
          ? <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
          : null}
      </div>
    );
  }
}
