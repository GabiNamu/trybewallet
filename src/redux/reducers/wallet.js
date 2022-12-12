import { ADD_CURRENCIES_ACTION,
  DELETE_EXPENSES, ERROR_MESSAGE, INITIAL_EDIT,
  SAVE_EDIT, SAVE_FORM_EXPENSES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  idCount: -1,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.payload.filter((element) => element !== 'USDT'),
    };
  case SAVE_FORM_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.idCount + 1,
          ...action.payload[0],
          exchangeRates: action.payload[1] }],
      idCount: state.idCount + 1,
    };
  case ERROR_MESSAGE:
    return {
      ...state,
      error: action.erro,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case INITIAL_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case SAVE_EDIT:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === Number(state.idToEdit)
          ? ({ id: expense.id, ...action.payload, exchangeRates: expense.exchangeRates })
          : expense)),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
