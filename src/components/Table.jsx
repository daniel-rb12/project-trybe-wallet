import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0 && (
            expenses.map((exp) => (
              <tr key={ exp.description }>
                <td>
                  { exp.description }
                </td>
                <td>
                  { exp.tag }
                </td>
                <td>
                  { exp.method }
                </td>
                <td>
                  { (+exp.value).toFixed(2) }
                </td>
                <td>
                  { exp.exchangeRates[exp.currency].name }
                </td>
                <td>
                  { (+exp.exchangeRates[exp.currency].ask).toFixed(2) }
                </td>
                <td>
                  {(exp.value * exp.exchangeRates[exp.currency].ask).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
