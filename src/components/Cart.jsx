import { Component } from 'react';

export default class Cart extends Component {
  state = {
    loading: true,
    productIds: [],
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
          </div>
        )) : <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
      </div>
    );
  }
}
