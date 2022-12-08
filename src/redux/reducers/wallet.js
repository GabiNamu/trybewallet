import { ADD_CURRENCIES_ACTION } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
