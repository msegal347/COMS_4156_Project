import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuditorPage from './AuditorPage';

jest.mock('../services/api', () => ({
  getResources: jest.fn(() => Promise.resolve({ data: [] })),
  getAllocations: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('AuditorPage', () => {
  it('renders AuditorPage component', async () => {
    render(<AuditorPage />);
    await screen.findByText('Auditor Analytics');

    expect(screen.getByText('Available Quantity')).toBeInTheDocument();
    expect(screen.getByText('Transferred Quantity')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Food Type')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    expect(screen.getByText('Order Date')).toBeInTheDocument();
    expect(screen.getByText('Expected Delivery')).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles transaction selection', async () => {
    render(<AuditorPage />);
    await screen.findByText('Auditor Analytics');

    fireEvent.click(screen.getAllByText('Select')[0]);
    expect(screen.getByRole('img')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Select')[0]);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
