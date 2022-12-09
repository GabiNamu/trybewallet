import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    return (
      <header>
        <h1>Trybewallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {expenses.length !== 0 ? expenses.reduce((sum, element) => {
            const { currency } = element;
            const mul = element.value * element.exchangeRates[currency].ask;
            const total = sum + mul;
            return total;
          }, 0).toFixed(2) : 0}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      ask: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
