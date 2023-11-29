import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import ProfilePage from './ProfilePage';

// Mocking axios.get and axios.put to avoid actual API calls during testing
jest.mock('axios');

describe('ProfilePage Component', () => {
  it('renders the profile form', () => {
    const { getByLabelText, getByText } = render(<ProfilePage />);

    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Address')).toBeInTheDocument();
    expect(getByText('Save Changes')).toBeInTheDocument();
  });

  it('fetches and displays profile data on mount', async () => {
    const mockProfileData = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
    };
    axios.get.mockResolvedValueOnce({ data: mockProfileData });

    const { getByDisplayValue } = render(<ProfilePage />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/user/profile');
      expect(getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(getByDisplayValue('john@example.com')).toBeInTheDocument();
      expect(getByDisplayValue('123 Main St')).toBeInTheDocument();
    });
  });

  it('updates profile data on form submit', async () => {
    const { getByLabelText, getByText } = render(<ProfilePage />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'New Name' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'new@example.com' } });
    fireEvent.change(getByLabelText('Address'), { target: { value: '456 Oak St' } });

    axios.put.mockResolvedValueOnce({});

    fireEvent.click(getByText('Save Changes'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('/api/user/profile', {
        name: 'New Name',
        email: 'new@example.com',
        address: '456 Oak St',
      });
      // Add more assertions based on your specific use case
    });
  });

  it('handles form submission error', async () => {
    const { getByText } = render(<ProfilePage />);

    axios.put.mockRejectedValueOnce({ response: { data: 'Update failed' } });

    fireEvent.click(getByText('Save Changes'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
      expect(getByText('Error updating profile')).toBeInTheDocument();
    });
  });
});
