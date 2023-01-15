import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import addCart from '../services/addCart';
import controlLS from '../services/controlLS';
import { getCart } from '../services/cart';

class ListDetails extends Component {
  state = {
    data: undefined,
    text: '',
    email: '',
    rating: undefined,
    valid: true,
    feedbacks: undefined,
    numberCart: undefined,
  };

  componentDidMount() {
    this.funcGetProduct();
    this.funcGetLocalStorage();
    this.funcAddCart();
  }

  funcGetProduct = async () => {
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    const data = await getProductById(id);
    // console.log(data);
    this.setState({
      data,
    });
  };

  checkForm = () => {
    const { email, rating, text } = this.state;
    const { match: { params: { id } } } = this.props;
    if (email.length > 0 && email.includes('@') && rating) {
      this.setState({
        valid: true,
      });
      controlLS(id, { email, rating, text });
      this.funcGetLocalStorage();
      this.setState({
        rating: undefined,
        email: '',
        text: '',
      });
    } else {
      this.setState({
        valid: false,
      });
    }
  };

  upText = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  getRating = ({ target: { value } }) => {
    this.setState({
      rating: value,
    });
  };

  funcGetLocalStorage = () => {
    const { match: { params: { id } } } = this.props;
    const feedbacks = JSON.parse(localStorage.getItem(`${id}`));
    this.setState({
      feedbacks,
    });
  };

  funcAddCart = (eachResult) => {
    if (eachResult) addCart(eachResult);
    const numberCart = getCart();
    this.setState({
      numberCart,
    });
  };

  render() {
    const { data, text, email, valid, feedbacks, numberCart } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{data ? data.title : null}</h1>
        <img
          data-testid="product-detail-image"
          src={ data ? data.thumbnail : '' }
          alt=""
        />
        <h2 data-testid="product-detail-price">
          R$
          {data ? data.price : ''}
        </h2>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.funcAddCart(data) }
        >
          Adicionar ao carrinho de compras
        </button>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho de compras
          </button>
        </Link>
        <p data-testid="shopping-cart-size">{numberCart}</p>
        <form>
          <h1>Avaliações</h1>
          <input
            data-testid="product-detail-email"
            placeholder="Email"
            onChange={ this.upText }
            name="email"
            value={ email }
            type="text"
            required
          />
          <label htmlFor="/">
            <input
              type="radio"
              data-testid="1-rating"
              onChange={ this.getRating }
              id="1"
              name="rating"
              value="1"

            />
            <input
              type="radio"
              data-testid="2-rating"
              onChange={ this.getRating }
              id="2"
              name="rating"
              value="2"

            />
            <input
              type="radio"
              data-testid="3-rating"
              onChange={ this.getRating }
              id="3"
              name="rating"
              value="3"

            />
            <input
              type="radio"
              data-testid="4-rating"
              onChange={ this.getRating }
              id="4"
              name="rating"
              value="4"

            />
            <input
              type="radio"
              data-testid="5-rating"
              onChange={ this.getRating }
              id="5"
              name="rating"
              value="5"

            />
          </label>
          <br />
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem (opcional)"
            name="text"
            onChange={ this.upText }
            value={ text }
            type="text"
          />
          <br />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.checkForm }
          >
            Avaliar
          </button>
          {valid ? null : <h1 data-testid="error-msg">Campos inválidos</h1>}
          {feedbacks ? feedbacks.map((elemento, index) => (
            <div key={ index }>
              <h1 data-testid="review-card-email">{elemento.email}</h1>
              <h1 data-testid="review-card-rating">{elemento.rating}</h1>
              <h1 data-testid="review-card-evaluation">{elemento.text}</h1>
            </div>
          )) : null}
        </form>
      </div>
    );
  }
}

export default ListDetails;

ListDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

ListDetails.defaultProps = {
  match: {},
};
