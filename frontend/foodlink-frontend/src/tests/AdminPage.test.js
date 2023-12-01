import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminPage from './AdminPage';

jest.mock('../services/api', () => ({
  getUsers: jest.fn(() => Promise.resolve({ data: [] })),
  getRecentTransactions: jest.fn(() => Promise.resolve({ data: [] })),
  getAuditLogs: jest.fn(() => Promise.resolve({ data: [] })),
  getAnalytics: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('AdminPage', () => {
  it('renders without crashing', async () => {
    render(<AdminPage />);

    expect(screen.queryByText('Loading...')).toBeNull();

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  it('renders the user management section', async () => {
    render(<AdminPage />);

    expect(screen.getByText('User Management')).toBeInTheDocument();
  });
});
