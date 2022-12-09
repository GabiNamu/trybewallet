import { ADD_CURRENCIES_ACTION, ERROR_MESSAGE, SAVE_FORM_EXPENSES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES_ACTION:
    return ({
      ...state,
      currencies: action.payload.filter((element) => element !== 'USDT'),
    });
  case SAVE_FORM_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length,
          ...action.payload[0],
          exchangeRates: action.payload[1] }],
    });
  case ERROR_MESSAGE:
    return ({
      ...state,
      error: action.erro,
    });
  default:
    return state;
  }
};

export default wallet;
