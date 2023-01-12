import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ListDetails extends Component {
  state = {
    data: undefined,
  };

  componentDidMount() {
    this.funcGetProduct();
  }

  funcGetProduct = async () => {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    const data = await getProductById(id);
    console.log(data);
    this.setState({
      data,
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <h1 data-testid="product-detail-name">{data ? data.title : null}</h1>
        <img
          data-testid="product-detail-image"
          src={ data ? data.thumbnail : '' }
          alt=""
        />
        <h2 data-testid="product-detail-price">{data ? data.price : ''}</h2>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Adicionar ao Carrinho
          </button>
        </Link>
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
