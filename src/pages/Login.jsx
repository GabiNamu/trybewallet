import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesAction, userInfoAction } from '../redux/actions';
import photo from './css/logo Trybe Wallet.png';

const PASSWORD_NUMBER = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(userInfoAction(email));
    dispatch(currenciesAction());
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <main className="main-form-login">
        <img src={ photo } alt="trybeWallet" />
        <form action="" className="form-login">
          <input
            type="email"
            name="email"
            className="input-login"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          {email.length !== 0
          && !email.includes('@')
          && !email.includes('.com')
            ? <p className="input-invalid">email inválido</p> : ''}
          <input
            type="password"
            name="password"
            className="input-login"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          {password.length < Number('6') && password.length !== 0
            ? <p className="input-invalid">senha inválida</p> : ''}
          <button
            type="button"
            className="button-login"
            disabled={
              password.length < PASSWORD_NUMBER || (!email.includes('@')
              || !email.includes('.com'))
            }
            onClick={ this.handleSubmit }
          >
            Entrar

          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
