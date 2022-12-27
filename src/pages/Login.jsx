import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';
import '../css/login.css';

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
      <div className="flex justify-center items-center h-screen">
        <form className="max-w-sm m-4 p-10 bg-black bg-opacity-80 rounded shadow-xl">
          <p className="text-white font-medium text-center text-lg font-bold">LOGIN</p>
          <label className="block pt-2 pb-5 text-sm text-white" htmlFor="email">
            E-mail
            <input
              data-testid="email-input"
              className="w-full mt-1 px-5 py-1 text-gray-700 bg-gray-600
              rounded focus:outline-none focus:bg-white"
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label className="block text-sm text-white" htmlFor="password">
            Senha
            <input
              data-testid="password-input"
              className="w-full px-5 mt-1 mb-6 py-1 text-gray-700 bg-gray-600 rounded
              focus:outline-none focus:bg-white"
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <div className="flex justify-center w-full">
            <button
              type="button"
              className="px-4 py-1 text-white font-light bg-sky-500
              disabled:bg-gray-300 rounded"
              disabled={ buttonDisable }
              onClick={ this.buttonAction }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
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
