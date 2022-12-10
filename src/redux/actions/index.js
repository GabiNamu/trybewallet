export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const ADD_CURRENCIES_ACTION = 'ADD_CURRENCIES_ACTION';
export const SAVE_FORM_EXPENSES = 'SAVE_FORM_EXPENSES';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const INITIAL_EDIT = 'INITIAL_EDIT';
export const SAVE_EDIT = 'SAVE_EDIT';

export const userInfoAction = (email) => ({
  type: SAVE_USER_INFO,
  payload: email,
});

const addCurrenciesAction = (currencies) => ({
  type: ADD_CURRENCIES_ACTION,
  payload: currencies,
});

export const saveFormExpenses = (expenses, coin) => ({
  type: SAVE_FORM_EXPENSES,
  payload: [expenses, coin],
});

export const erroMessage = (erro) => ({
  type: ERROR_MESSAGE,
  erro,
});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  id,
});

export const initialEdit = (id) => ({
  type: INITIAL_EDIT,
  id,
});

export const saveEdit = (info) => ({
  type: SAVE_EDIT,
  payload: info,
});

export const currencyCountingAction = (expenses, coin) => ((dispatch) => {
  try {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data[coin].ask);
        dispatch(saveFormExpenses(expenses, data));
      });
  } catch (error) {
    dispatch(erroMessage(error));
  }
});

export const currenciesAction = () => ((dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      console.log(Object.keys(data));
      dispatch(addCurrenciesAction(Object.keys(data)));
    });
});
