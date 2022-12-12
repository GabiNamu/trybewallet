import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses, initialEdit } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(id));
  };

  handleEdit = (e) => {
    const { dispatch } = this.props;
    dispatch(initialEdit(e.target.id));
    console.log(e.target.id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((
            { description, tag, method,
              currency, exchangeRates, value, id },
          ) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ parseFloat(value).toFixed(2) }</td>
              <td>{ exchangeRates[currency].name}</td>
              <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleClick(id) }
                >
                  Deletar
                </button>
                <button
                  type="button"
                  id={ id }
                  data-testid="edit-btn"
                  onClick={ (e) => this.handleEdit(e) }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      ask: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
