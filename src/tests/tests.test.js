import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
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
