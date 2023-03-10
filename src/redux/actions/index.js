import getCoins from '../../services/moedaAPI';

// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const GET_EXPENSES = 'GET_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CONFIRM_EDIT = 'CONFIRM_EDIT';

export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  email,
});

export const getExpenses = (expenses) => ({
  type: GET_EXPENSES,
  expenses,
});

export const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  expenses,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});
export const confirmEdit = (expenseEdit) => ({
  type: CONFIRM_EDIT,
  expenseEdit,
});

export const requestApi = () => ({
  type: REQUEST_API,
});
export const responseSuccess = (coins) => ({
  type: RESPONSE_SUCCESS,
  coins,
});
export const responseError = (error) => ({
  type: RESPONSE_ERROR,
  error,
});

export function fetchCoin() {
  return async (dispatch) => {
    dispatch(requestApi());
    try {
      const response = await getCoins();
      const coinFilter = Object.keys(response).filter((coin) => coin !== 'USDT');
      dispatch(responseSuccess(coinFilter));
    } catch (error) {
      dispatch(responseError(error));
    }
  };
}
