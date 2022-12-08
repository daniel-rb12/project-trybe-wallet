import getCoins from '../../services/moedaAPI';

// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';

export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS';
export const RESPONSE_ERROR = 'RESPONSE_ERROR';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  email,
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
