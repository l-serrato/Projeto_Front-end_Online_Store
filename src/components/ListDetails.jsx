import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import addCart from '../services/addCart';

class ListDetails extends Component {
  state = {
    data: undefined,
    avaliation: '',
    email: '',
    rating: undefined,
  };

  componentDidMount() {
    this.funcGetProduct();
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
    const { email, rating, avaliation } = this.state;
    if (email.length > 0 && email.includes('@') && rating) {
      const dict = undefined;
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

  render() {
    const { data, avaliation, email } = this.state;

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
          onClick={ () => addCart(data) }
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
            name="avaliation"
            onChange={ this.upText }
            value={ avaliation }
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
