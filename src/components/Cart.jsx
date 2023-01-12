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
    console.log(productIds);
    this.setState({
      loading: false,
      productIds,
    });
  };

  render() {
    const { loading, productIds } = this.state;
    console.log(productIds);
    return (
      <div>
        {loading ? <h1>Carregando...</h1> : null}
        {productIds.length > 0 ? productIds.map((elemento, index) => (
          <>
            <p
              data-testid="shopping-cart-product-name"
              key={ elemento.id }
            >
              {elemento.title}
            </p>
            <p data-testid="shopping-cart-product-quantity">{index}</p>
          </>
        )) : null}
      </div>
    );
  }
}
