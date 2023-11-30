import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import LoginPage from './LoginPage';

// Mocking axios.post to avoid actual API calls during testing
jest.mock('axios');

describe('LoginPage Component', () => {
  it('renders the login form', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const mockToken = 'mock-token';
    axios.post.mockResolvedValueOnce({ data: { role: 'source', token: mockToken } });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    });
  });

  it('displays error message on invalid login', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: 'Invalid credentials' } });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'invalidpassword' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText('Invalid login credentials')).toBeInTheDocument();
    });
  });
});

it('submits the form with valid data', async () => {
  const mockToken = 'mock-token';
  axios.post.mockResolvedValueOnce({ data: { role: 'source', token: mockToken } });

  render(<LoginPage />);

  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
  });
});

it('displays error message on invalid login', async () => {
  axios.post.mockRejectedValueOnce({ response: { data: 'Invalid credentials' } });

  render(<LoginPage />);

  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'invalid@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'invalidpassword' },
  });

  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalled();
    expect(screen.getByText('Invalid login credentials')).toBeInTheDocument();
  });
});
