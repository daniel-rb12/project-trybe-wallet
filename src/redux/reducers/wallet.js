import { GET_EXPENSES, REQUEST_API, RESPONSE_ERROR, RESPONSE_SUCCESS, REMOVE_EXPENSE,
  EDIT_EXPENSE, CONFIRM_EDIT } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case RESPONSE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.coins,
    };
  case RESPONSE_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  case CONFIRM_EDIT:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        expense.id === state.idToEdit ? action.expenseEdit : expense)),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
