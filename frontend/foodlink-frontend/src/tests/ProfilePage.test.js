import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProfilePage from './ProfilePage';

const mockAxios = new MockAdapter(axios);

describe('ProfilePage', () => {
  const mockProfileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St',
  };

  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders ProfilePage component and updates profile successfully', async () => {
    mockAxios.onGet('/api/user/profile').reply(200, mockProfileData);
    mockAxios.onPut('/api/user/profile').reply(200);

    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByLabelText('Name:')).toHaveValue(mockProfileData.name);
      expect(screen.getByLabelText('Email:')).toHaveValue(mockProfileData.email);
      expect(screen.getByLabelText('Address:')).toHaveValue(mockProfileData.address);
    });

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'New Name' } });
    fireEvent.change(screen.getByLabelText('Address:'), { target: { value: '456 Oak St' } });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(mockAxios.history.put.length).toBe(1);
    });
  });

  it('handles error when fetching profile data', async () => {
    mockAxios.onGet('/api/user/profile').reply(500);

    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.queryByText('My Profile')).toBeInTheDocument();
      expect(screen.queryByLabelText('Name:')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Email:')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Address:')).not.toBeInTheDocument();
    });
  });

  it('handles error when updating profile', async () => {
    mockAxios.onGet('/api/user/profile').reply(200, mockProfileData);
    mockAxios.onPut('/api/user/profile').reply(500);

    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByLabelText('Name:')).toHaveValue(mockProfileData.name);
      expect(screen.getByLabelText('Email:')).toHaveValue(mockProfileData.email);
      expect(screen.getByLabelText('Address:')).toHaveValue(mockProfileData.address);
    });

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'New Name' } });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(mockAxios.history.put.length).toBe(1);
      expect(screen.queryByText('My Profile')).toBeInTheDocument();
      expect(screen.queryByLabelText('Name:')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Email:')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Address:')).not.toBeInTheDocument();
    });
  });
});
