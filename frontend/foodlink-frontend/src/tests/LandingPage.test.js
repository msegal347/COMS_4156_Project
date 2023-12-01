import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';

jest.mock('../services/api', () => ({
  loginUser: jest.fn(() => Promise.resolve({ data: { role: 'source', token: 'fakeToken' } })),
}));

describe('LoginPage', () => {
  it('renders LoginPage component and successfully logs in', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument());

    expect(window.location.href).toBe('http://localhost/source');
  });

  it('renders LoginPage component and handles login error', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    loginUser.mockImplementationOnce(() =>
      Promise.reject({ response: { data: { message: 'Invalid credentials' } } })
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'invalidPassword' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(screen.getByText('Invalid login credentials')).toBeInTheDocument());

    expect(window.location.href).toBe('http://localhost/');
  });
});
