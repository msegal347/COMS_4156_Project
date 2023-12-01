import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

const server = setupServer(
  rest.post('/api/user/register', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Registration successful!',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders registration form', () => {
  render(
    <MemoryRouter>
      <RegistrationPage />
    </MemoryRouter>
  );

  expect(screen.getByText('Register')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText('Select Role')).toBeInTheDocument();
});

test('submits registration form successfully', async () => {
  render(
    <MemoryRouter>
      <RegistrationPage />
    </MemoryRouter>
  );

  userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
  userEvent.type(screen.getByPlaceholderText('Password'), 'password');
  userEvent.selectOptions(screen.getByRole('combobox'), 'source');
  userEvent.type(screen.getByPlaceholderText('Address'), '123 Main St');

  fireEvent.click(screen.getByText('Register'));

  await waitFor(() => {
    expect(screen.getByText('Registration successful!')).toBeInTheDocument();
  });
});

test('handles registration form submission error', async () => {
  server.use(
    rest.post('/api/user/register', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
    })
  );

  render(
    <MemoryRouter>
      <RegistrationPage />
    </MemoryRouter>
  );

  userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
  userEvent.type(screen.getByPlaceholderText('Password'), 'password');
  userEvent.selectOptions(screen.getByRole('combobox'), 'source');
  userEvent.type(screen.getByPlaceholderText('Address'), '123 Main St');

  fireEvent.click(screen.getByText('Register'));

  await waitFor(() => {
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
  });
});
