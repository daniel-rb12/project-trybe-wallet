import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmEdit, fetchCoin, getExpenses } from '../redux/actions';
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

  editButton = async () => {
    const { idToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const callAPI = await getCoins();
    const objExpenses = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: callAPI,
    };
    dispatch(confirmEdit(objExpenses));
    this.setState({ value: '',
      description: '',
    });
  };

  render() {
    const { isLoading, value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form className="flex items-center h-20 justify-around bg-gray-800">
        <label
          htmlFor="value"
        >
          <span className="pr-2 text-white">Valor:</span>
          <input
            data-testid="value-input"
            className="border-2 border-black text-sm rounded-xl p-0.5
            w-32 text-center focus:outline-0"
            type="text"
            name="value"
            value={ value.replace(',', '.') }
            id="value"
            maxLength="10"
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="description"
        >
          <span className="pr-2 text-white">Descrição:</span>
          <input
            data-testid="description-input"
            className="border-2 border-black text-sm rounded-xl
            p-0.5 text-center focus:outline-0"
            type="text"
            name="description"
            id="description"
            value={ description }
            maxLength="24"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          <span className="pr-2 text-white">Moeda:</span>
          <select
            data-testid="currency-input"
            className="rounded-xl text-center"
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
        </label>
        <label htmlFor="method">
          <span className="pr-2 text-white">Pagamento:</span>
          <select
            data-testid="method-input"
            className="rounded-xl text-center"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <span className="pr-2 text-white">Tag:</span>
          <select
            data-testid="tag-input"
            className="rounded-xl text-center"
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
        </label>
        {
          editor ? (
            <button
              type="button"
              className="px-4 py-1 text-white font-light bg-sky-500 rounded"
              onClick={ () => this.editButton() }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              className="px-4 py-1 text-white font-light bg-sky-500 rounded"
              onClick={ this.buttonAction }
            >
              Adicionar despesa
            </button>)
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.object,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
