import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      carrinho: [],
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      pagamento: '',
      invalid: false,
    };
  }

  componentDidMount() {
    const grupoUm = JSON.parse(localStorage.getItem('IDS'));
    if (grupoUm !== null) {
      this.setState({ carrinho: grupoUm });
    }
  }

  grupoUmD = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    const { nome, email, cpf, telefone,
      cep, endereco, pagamento } = this.state;
    const infos = [nome, email, cpf, telefone,
      cep, endereco, pagamento];
    const invalid = infos.some((item) => item.length === 0);
    this.setState({ invalid });
    if (!invalid) {
      localStorage.clear();
      history.push('/');
    }
  };

  render() {
    const { carrinho, nome, email, cpf, telefone,
      cep, endereco, invalid } = this.state;
    return (
      <div>
        { carrinho.map((item, index) => (
          <div key={ index }>
            <p>{item.title}</p>
            <p>{`R$ ${item.contTeste ? item.price * item.contTeste : item.price * 1}`}</p>
          </div>
        ))}
        <form>
          <label htmlFor="checkout-fullname">
            Nome Completo
            <input
              type="text"
              data-testid="checkout-fullname"
              name="nome"
              value={ nome }
              onChange={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="checkout-email">
            Email
            <input
              type="email"
              data-testid="checkout-email"
              name="email"
              value={ email }
              onChange={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="checkout-cpf">
            CPF
            <input
              type="text"
              data-testid="checkout-cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="checkout-phone">
            Telefone
            <input
              type="text"
              data-testid="checkout-phone"
              name="telefone"
              value={ telefone }
              onChange={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="checkout-cep">
            CEP
            <input
              type="text"
              data-testid="checkout-cep"
              name="cep"
              value={ cep }
              onChange={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="checkout-address">
            Endereço
            <input
              type="text"
              data-testid="checkout-address"
              name="endereco"
              value={ endereco }
              onChange={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="ticket-payment">
            Boleto
            <input
              type="radio"
              name="pagamento"
              data-testid="ticket-payment"
              value="boleto"
              onClick={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="visa-payment">
            Visa
            <input
              type="radio"
              name="pagamento"
              data-testid="visa-payment"
              value="visa"
              onClick={ this.grupoUmD }
              required
            />
          </label>
          <label htmlFor="master-payment">
            MasterCard
            <input
              type="radio"
              name="pagamento"
              data-testid="master-payment"
              value="mastercard"
              required
              onClick={ this.grupoUmD }
            />
          </label>
          <label htmlFor="elo-payment">
            Elo
            <input
              required
              type="radio"
              name="pagamento"
              data-testid="elo-payment"
              value="elo"
            />
          </label>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.handleClick }
            required
          >
            Enviar
          </button>
          { invalid ? <span data-testid="error-msg"> Campos inválidos</span> : null}
        </form>
      </div>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Checkout;
