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

    userEvent.type(inputEmail, 'a@live.com');
    userEvent.type(inputPassword, '1234');

    expect(button.disabled).toBe(true);
    expect(inputEmail.value).toBe('a@live.com');
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

    userEvent.type(inputEmail, 'gabi@live.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const price = screen.getByTestId(/total-field/i);

    const title = screen.getByRole('heading', {
      name: /trybewallet/i,
    });
    const emailEl = screen.getByText(/gabi@live.com/i);

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

  test('verifica se o fetch é chamado novamente quando clica no botão de adicionar', async () => {
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

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const elTable = screen.getByRole('columnheader', {
      name: /moeda de conversão/i,
    });
    const elTable2 = screen.getByRole('columnheader', {
      name: /tag/i,
    });

    userEvent.type(inputValue, 10);
    userEvent.type(inputDescription, 'dez');
    const buttonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.click(buttonAdd);
    const select = screen.getByTestId('tag-input');
    const usd = screen.getByRole('columnheader', {
      name: /tag/i,
    });

    const food = await screen.findByText(/alimentação/i);

    const deleteButton = await screen.findByRole('button', {
      name: /deletar/i,
    });

    const editButton = await screen.findByRole('button', {
      name: /editar/i,
    });
    expect(select).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(usd).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(elTable).toBeInTheDocument();
    expect(elTable2).toBeInTheDocument();

    userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'dez');
    userEvent.click(buttonAdd);

    userEvent.click(await screen.findByRole('button', {
      name: /editar/i,
    }));
    userEvent.type(inputValue, '20');
    userEvent.type(inputDescription, 'vinte');
    const save = await screen.findByRole('button', {
      name: /editar despesa/i,
    });
    userEvent.click(save);

    expect(await screen.findByText('20.00')).toBeInTheDocument();
    expect(await screen.findByText('vinte')).toBeInTheDocument();
  });
});
