import React, { Component } from 'react';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
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
      <div className="container-table">
        <table className="table">
          <thead>
            <tr>
              <th className="title-table">Descrição</th>
              <th className="title-table">Tag</th>
              <th className="title-table">Método de pagamento</th>
              <th className="title-table">Valor</th>
              <th className="title-table">Moeda</th>
              <th className="title-table">Câmbio utilizado</th>
              <th className="title-table">Valor convertido</th>
              <th className="title-table">Moeda de conversão</th>
              <th className="title-table">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((
              { description, tag, method,
                currency, exchangeRates, value, id },
              index,
            ) => (
              <tr key={ index } className="container-table-elements">
                <td className="table-elements">{ description }</td>
                <td className="table-elements">{ tag }</td>
                <td className="table-elements">{ method }</td>
                <td className="table-elements">{ parseFloat(value).toFixed(2) }</td>
                <td className="table-elements">{ exchangeRates[currency].name}</td>
                <td
                  className="table-elements"
                >
                  { parseFloat(exchangeRates[currency].ask).toFixed(2) }

                </td>
                <td
                  className="table-elements"
                >
                  { (value * exchangeRates[currency].ask).toFixed(2) }

                </td>
                <td className="table-elements">Real</td>
                <td className="table-elements">
                  <button
                    type="button"
                    className="button-table"
                    id={ id }
                    data-testid="edit-btn"
                    onClick={ (e) => this.handleEdit(e) }
                  >
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    className="button-table"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(id) }
                  >
                    <RiDeleteBack2Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
