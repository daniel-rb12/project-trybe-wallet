import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

it('A página deve conter um campo de email', () => {
  renderWithRouterAndRedux(<App />);

  const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });

  expect(inputEmail).toBeInTheDocument();
});

it('A página deve conter um campo de senha', () => {
  renderWithRouterAndRedux(<App />);

  const inputPassword = screen.getByLabelText(/senha/i);

  expect(inputPassword).toBeInTheDocument();
});

it('A página deve conter um botão de entrar', () => {
  renderWithRouterAndRedux(<App />);

  const buttonLogin = screen.getByRole('button', { name: /entrar/i });

  expect(buttonLogin).toBeInTheDocument();
});
it('É possível logar com email e senha e ser redirecionado', async () => {
  renderWithRouterAndRedux(<App />);

  const inputEmail = screen.getByRole('textbox', { name: 'E-mail' });
  const inputPassword = screen.getByLabelText(/senha/i);
  const buttonLogin = screen.getByRole('button', { name: /entrar/i });

  userEvent.type(inputEmail, 'teste@teste.com');
  userEvent.type(inputPassword, '123456');
  userEvent.click(buttonLogin);

  const valueLabel = screen.getByText(/valor:/i);

  expect(valueLabel).toBeInTheDocument();
});

it('Verifica as existências dos inputs na rota "carteira"', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const valueInput = screen.getByRole('textbox', { name: /valor:/i });
  const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
  const coinInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId(/method-input/i);
  const tagInput = screen.getByTestId('tag-input');

  expect(valueInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(coinInput).toBeInTheDocument();
  expect(methodInput).toBeInTheDocument();
  expect(tagInput).toBeInTheDocument();
});

it('Verifica a existência do botão "Adicionar despesa"', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

  expect(addButton).toBeInTheDocument();
});

it('Verifica se é feito fetch', () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });

  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  expect(global.fetch).toHaveBeenCalledTimes(1);

  global.fetch.mockClear();
});

it('Verifica se é adicionada a despesa', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const valueInput = screen.getByRole('textbox', { name: /valor:/i });
  const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
  const coinInput = await screen.findByTestId('currency-input', { name: 'USD' });
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');
  const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

  userEvent.type(valueInput, '10');
  userEvent.type(descriptionInput, 'teste');
  userEvent.selectOptions(methodInput, ['Dinheiro']);
  userEvent.selectOptions(tagInput, ['Alimentação']);

  expect(coinInput).toBeInTheDocument();

  userEvent.click(addButton);

  expect(global.fetch).toHaveBeenCalledTimes(2);

  const description = await screen.findByRole('cell', { name: /teste/i });
  const tag = await screen.findByRole('cell', { name: /alimentação/i });
  const method = await screen.findByRole('cell', { name: /dinheiro/i });
  const value = await screen.findByRole('cell', { name: /10\.00/i });
  const coin = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
  const ask = await screen.findByRole('cell', { name: /4\.75/i });
  const finalValue = await screen.findByRole('cell', { name: /47\.53/i });
  const editButton = screen.getByRole('button', { name: 'Editar' });
  const deleteButton = screen.getByRole('button', { name: 'Excluir' });

  expect(description).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(value).toBeInTheDocument();
  expect(coin).toBeInTheDocument();
  expect(ask).toBeInTheDocument();
  expect(finalValue).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

it('Verifica se é possível excluir uma despesa', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
  userEvent.click(addButton);

  const deleteButton = await screen.findByRole('button', { name: 'Excluir' });
  userEvent.click(deleteButton);

  const editButton = await screen.findByRole('button', { name: 'Editar' });
  expect(editButton).not.toBeInTheDocument();
});

it('Verifica se é possível editar uma despesa', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

  const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
  userEvent.click(addButton);

  const editButton = await screen.findByRole('button', { name: 'Editar' });
  userEvent.click(editButton);

  const valueInput = screen.getByRole('textbox', { name: /valor:/i });
  const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');
  const confirmEdit = screen.getByRole('button', { name: /editar despesa/i });

  userEvent.type(valueInput, '10');
  userEvent.type(descriptionInput, 'teste');
  userEvent.selectOptions(methodInput, ['Dinheiro']);
  userEvent.selectOptions(tagInput, ['Alimentação']);

  userEvent.click(confirmEdit);

  const description = await screen.findByRole('cell', { name: /teste/i });
  const tag = await screen.findByRole('cell', { name: /alimentação/i });
  const method = await screen.findByRole('cell', { name: /dinheiro/i });
  const value = await screen.findByRole('cell', { name: /10\.00/i });
  const coin = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
  const ask = await screen.findByRole('cell', { name: /4\.75/i });
  const finalValue = await screen.findByRole('cell', { name: /47\.53/i });
  const deleteButton = screen.getByRole('button', { name: 'Excluir' });

  expect(description).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(value).toBeInTheDocument();
  expect(coin).toBeInTheDocument();
  expect(ask).toBeInTheDocument();
  expect(finalValue).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
