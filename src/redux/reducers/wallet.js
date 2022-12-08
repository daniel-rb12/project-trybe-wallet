import { REQUEST_API, RESPONSE_ERROR, RESPONSE_SUCCESS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  isLoading: false,
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
  default:
    return state;
  }
};

export default wallet;
