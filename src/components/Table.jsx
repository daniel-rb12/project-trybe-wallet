import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = async (targetId) => {
    const { expenses, dispatch } = this.props;
    const newExpensesList = await expenses.filter((expense) => expense.id !== targetId);
    dispatch(removeExpense(newExpensesList));
  };

  editButton = (id) => {
    const { dispatch, expenses } = this.props;
    console.log(expenses[id]);
    dispatch(editExpense(id));
  };

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
              <tr key={ exp.id }>
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
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.editButton(exp.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(exp.id) }
                  >
                    Excluir
                  </button>
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()),
  length: PropTypes.number,
  map: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
