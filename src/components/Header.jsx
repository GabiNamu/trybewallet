import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../pages/css/logo Trybe Wallet.png';
import coin from '../pages/css/Vector-5.png';
import profile from '../pages/css/Vector-6.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    return (
      <header className="header-header">
        <img src={ logo } alt="logo trybeWallet" />
        <div className="container-total-header">
          <img src={ coin } alt="imagem de moedas" />
          <p className="title-total-header">Total de despesas:</p>
          <p data-testid="total-field" className="title-total-header">
            {expenses.length !== 0 ? expenses.reduce((sum, element) => {
              const { currency } = element;
              const mul = element.value * element.exchangeRates[currency].ask;
              const total = sum + mul;
              return total;
            }, 0).toFixed(2) : (0).toFixed(2)}
          </p>
          <p data-testid="header-currency-field" className="title-total-header">BRL</p>
        </div>
        <div className="container-total-header">
          <img src={ profile } alt="icon de perfil" />
          <p data-testid="email-field" className="email-header">{ email }</p>
        </div>
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
