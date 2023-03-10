import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencyCountingAction, saveEdit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { currency } = this.state;
    const { dispatch } = this.props;
    dispatch(currencyCountingAction(this.state, currency));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleEdit = () => {
    const { dispatch } = this.props;
    dispatch(saveEdit(this.state));
    this.setState({
      value: '',
      description: '',
    });
    console.log(this.state);
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form action="" className="form-walletForm">
        <div className="conatiner-realForm-walletForm">
          <label htmlFor="descricao" className="label-walletForm">
            Descrição da despesa:
            <input
              className="input-walletForm"
              id="descricao"
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="categoria" className="label-walletForm">
            Categoria da despesa:
            <select
              name="tag"
              className="input-category-walletForm"
              id="categoria"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="valor" className="label-walletForm">
            Valor:
            <input
              className="input-value-walletForm"
              type="number"
              id="valor"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="metodo" className="label-walletForm">
            Método de pagamento:
            <select
              name="method"
              className="input-method-walletForm"
              value={ method }
              id="metodo"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="moeda" className="label-walletForm">
            Moeda:
            <select
              name="currency"
              className="input-currency-walletForm"
              id="moeda"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((element) => (
                <option key={ element } value={ element }>
                  {element}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="container-button-walletForm">
          <button
            type="button"
            onClick={ editor ? this.handleEdit : this.handleSubmit }
            className="button-add-walletForm"
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
