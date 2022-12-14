const COIN_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCoins = async () => {
  const response = await fetch(`${COIN_BASE_API}`);
  const json = await response.json();
  try {
    return json;
  } catch (error) {
    return error.message;
  }
};

export default getCoins;
