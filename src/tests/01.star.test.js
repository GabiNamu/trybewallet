// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
// import { renderWithRouterAndRedux } from './helpers/renderWith';
// import mockData from './helpers/mockData';
// import { clear } from '@testing-library/user-event/dist/clear';

// describe('verifica tudo que é pedido no requisito 1', () => {
//   test('verifica login', () => {
//     const { store, history } = renderWithRouterAndRedux(<App />);
//     expect(history.location.pathname).toBe('/');

//     const inputEmail = screen.getByTestId(/email-input/i);
//     const inputPassword = screen.getByTestId(/password-input/i);
//     const button = screen.getByRole('button', { name: /entrar/i });

//     expect(inputEmail).toBeInTheDocument();
//     expect(inputPassword).toBeInTheDocument();
//     expect(button).toBeInTheDocument();

//     userEvent.type(inputEmail, 'gabreielanamu@live.com');
//     userEvent.type(inputPassword, '123456');

// expect(button.disabled).toBe(true);
// userEvent.type(inputEmail, clear);
// userEvent.type(inputEmail, '.com');
// console.log(inputEmail.value);
// userEvent.type(inputPassword, '1234');

// expect(button.disabled).toBe(true);

// userEvent.type(inputPassword, '56');

//     expect(button.disabled).toBe(false);
//     expect(inputEmail.value).toBe('gabreielanamu@live.com');
//     expect(inputPassword.value).toBe('123456');
//     userEvent.click(button);
//     expect(store.getState().user.email).toBe('gabreielanamu@live.com');
//     expect(history.location.pathname).toBe('/carteira');
//   });

//   test('login - falaha', () => {
//     const { store, history } = renderWithRouterAndRedux(<App />);
//     expect(history.location.pathname).toBe('/');

//     const inputEmail = screen.getByRole('textbox');
//     const inputPassword = screen.getByTestId(/password-input/i);
//     const button = screen.getByRole('button', { name: /entrar/i });

//     userEvent.type(inputEmail, 'gabreielanamu@live');
//     userEvent.type(inputPassword, '123456');

//     expect(button.disabled).toBe(true);
//   });

//   test('login - flha 2', () => {
//     const { store, history } = renderWithRouterAndRedux(<App />);
//     expect(history.location.pathname).toBe('/');

//     const inputEmail = screen.getByRole('textbox');
//     const inputPassword = screen.getByTestId(/password-input/i);
//     const button = screen.getByRole('button', { name: /entrar/i });

//     userEvent.type(inputEmail, 'gabreielanamu@live.com');
//     userEvent.type(inputPassword, '1234');

//     expect(button.disabled).toBe(true);
//   })
// });
