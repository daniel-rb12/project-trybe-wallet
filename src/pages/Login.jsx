import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';

const PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.buttonValidator();
    });
  };

  buttonValidator = () => {
    const { email, password } = this.state;
    const regexEmailValidator = /\S+@\S+\.\S+/;
    const emailValidator = regexEmailValidator.test(email);
    if (password.length >= PASSWORD_LENGTH && emailValidator) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  };

  buttonAction = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonDisable } = this.state;
    return (
      <form>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisable }
          onClick={ this.buttonAction }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
export default connect()(Login);
