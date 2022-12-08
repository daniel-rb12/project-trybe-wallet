import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoin } from '../redux/actions';

class WalletForm extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { dispatch, currencies } = this.props;
    await dispatch(fetchCoin());
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
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
            id="value"
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
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
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
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
