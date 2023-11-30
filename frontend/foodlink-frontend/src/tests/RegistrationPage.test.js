// RegistrationPage.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import RegistrationPage from '../pages/RegistrationPage';

jest.mock('axios');

describe('RegistrationPage', () => {
  it('renders the component correctly', () => {
    render(
      <Router>
        <RegistrationPage />
      </Router>
    );

    // Ensure the form elements are present
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Select Role')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    // Mock axios.post to return a successful response
    axios.post.mockResolvedValueOnce({ data: { message: 'Registration successful!' } });

    render(
      <Router>
        <RegistrationPage />
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByText('Select Role').nextSibling, { target: { value: 'User' } });

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
  });

  it('handles form submission failure', async () => {
    // Mock axios.post to return an error response
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Registration failed' } } });

    render(
      <Router>
        <RegistrationPage />
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByText('Select Role').nextSibling, { target: { value: 'User' } });

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });
});
