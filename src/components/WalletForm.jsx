import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoin, getExpenses } from '../redux/actions';
import getCoins from '../services/moedaAPI';

class WalletForm extends Component {
  state = {
    isLoading: true,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    total: 0,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCoin());
    this.setState({ isLoading: false });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
    });
  };

  buttonAction = async () => {
    const { dispatch, expenses } = this.props;
    const { value, description, currency, method, tag, total } = this.state;
    const callAPI = await getCoins();
    const objExpenses = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: callAPI,
    };

    dispatch(getExpenses(objExpenses));

    const valueExpense = +value;
    this.setState({ value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      total: total + valueExpense,
    });
  };

  render() {
    const { isLoading, value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label
          htmlFor="value"
        >
          Valor:
          <input
            data-testid="value-input"
            type="text"
            name="value"
            value={ value }
            id="value"
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="description"
        >
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          { isLoading ? <option value="carregando">Carregando...</option> : (
            currencies.map((coin) => (
              <option key={ coin } value={ coin }>{ coin }</option>
            ))) }
        </select>
        <select
          data-testid="method-input"
          name="method"
          id="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.buttonAction }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.object,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
