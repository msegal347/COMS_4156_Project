import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from './DashboardPage';

jest.mock('../services/api', () => ({
  getRecentTransactions: jest.fn(() => Promise.resolve({ data: [] })),
  getPendingRequests: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('DashboardPage', () => {
  it('renders DashboardPage component', async () => {
    render(<DashboardPage />);
    await waitFor(() => screen.getByText('Dashboard'));

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Food Type')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    expect(screen.getByText('Order Date')).toBeInTheDocument();
    expect(screen.getByText('Expected Delivery')).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles transaction selection and details toggle', async () => {
    render(<DashboardPage />);
    await waitFor(() => screen.getByText('Dashboard'));

    fireEvent.click(screen.getAllByText('Select')[0]);

    expect(screen.getByText('Order Date')).toBeInTheDocument();
    expect(screen.getByText('Expected Delivery')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Select')[0]);

    await waitFor(() => {
      expect(screen.queryByText('Order Date')).toBeNull();
      expect(screen.queryByText('Expected Delivery')).toBeNull();
    });
  });

  it('handles details toggle without selecting transaction', async () => {
    render(<DashboardPage />);
    await waitFor(() => screen.getByText('Dashboard'));

    fireEvent.click(screen.getAllByText('Select')[0]);
    fireEvent.click(screen.getAllByText('Select')[0]);

    await waitFor(() => {
      expect(screen.queryByText('Order Date')).toBeNull();
      expect(screen.queryByText('Expected Delivery')).toBeNull();
    });

    fireEvent.click(screen.getAllByText('Select')[0]);

    expect(screen.getByText('Order Date')).toBeInTheDocument();
    expect(screen.getByText('Expected Delivery')).toBeInTheDocument();
  });
});
