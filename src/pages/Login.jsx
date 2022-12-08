import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesAction, userInfoAction } from '../redux/actions';

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

  handleSubmit = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userInfoAction(email));
    dispatch(currenciesAction());
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <main>
        <form action="">
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="button"
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
