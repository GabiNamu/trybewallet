import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('componente Login', () => {
  test('verifica se os componentes do login estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId(/password-input/i);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('verifica se é possivel escrever nos inputs e clicar no botão', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId(/password-input/i);
    const email = 'gabrielanamu@live.com';

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, '123456');

    expect(button.disabled).toBe(false);
    expect(inputEmail.value).toBe(email);
    expect(inputPassword.value).toBe('123456');
    userEvent.click(button);

    const title = screen.getByRole('heading', {
      name: /trybewallet/i,
    });

    expect(title).toBeInTheDocument();
  });

  test('verifica se o botão fica desabilitado com senha menor que 6 digitos', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId(/password-input/i);

    userEvent.type(inputEmail, 'gabi@live.com');
    userEvent.type(inputPassword, '1234');

    expect(button.disabled).toBe(true);
    expect(inputEmail.value).toBe('gabi@live.com');
    expect(inputPassword.value).toBe('1234');
  });

  test('verifica se o botão fica desabilitado caso o email esteja errado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId(/password-input/i);

    userEvent.type(inputEmail, 'gabriela');
    userEvent.type(inputPassword, '123456');

    expect(button.disabled).toBe(true);
    expect(inputEmail.value).toBe('gabriela');
    expect(inputPassword.value).toBe('123456');
  });
});

describe('component Header', () => {
  test('verifica se as informações estão renderizadas', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId(/password-input/i);

    userEvent.type(inputEmail, 'gabriela@live.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const price = screen.getByTestId(/total-field/i);

    const title = screen.getByRole('heading', {
      name: /trybewallet/i,
    });
    const emailEl = screen.getByText(/gabriela@live.com/i);

    expect(title).toBeInTheDocument();
    expect(emailEl).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});

describe('component WalletForm', () => {
  test('verifica se os elementos estão na tela', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId(/password-input/i);

    userEvent.type(inputEmail, 'gabriela@live.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');

    const brlEl = screen.getByText(/brl/i);
    const buttonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const descriptionEl = screen.getByRole('textbox');

    expect(brlEl).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
    expect(descriptionEl).toBeInTheDocument();
  });
});
