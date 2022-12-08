export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const ADD_CURRENCIES_ACTION = 'ADD_CURRENCIES_ACTION';

export const userInfoAction = (email) => ({
  type: SAVE_USER_INFO,
  payload: email,
});

const addCurrenciesAction = (currencies) => ({
  type: ADD_CURRENCIES_ACTION,
  payload: currencies,
});

export const currenciesAction = () => ((dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      console.log(Object.keys(data));
      dispatch(addCurrenciesAction(Object.keys(data)));
    });
});
