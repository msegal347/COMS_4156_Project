import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import SinkPage from './SinkPage';

jest.mock('axios');

describe('SinkPage', () => {
  it('renders the component correctly', () => {
    render(<SinkPage />);

    // Ensure the component renders the title and form elements
    expect(screen.getByText('Material Requests')).toBeInTheDocument();
    expect(screen.getByText('Submit Request')).toBeInTheDocument();
    expect(screen.getByText('Material')).toBeInTheDocument();
    expect(screen.getByText('Available Quantity')).toBeInTheDocument();
    expect(screen.getByText('Request Quantity')).toBeInTheDocument();
  });

  it('fetches materials and displays them', async () => {
    const mockMaterials = [
      { id: 1, name: 'Apples', availableQuantity: 200 },
      { id: 2, name: 'Oranges', availableQuantity: 150 },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMaterials });

    render(<SinkPage />);

    // Wait for the materials to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Apples')).toBeInTheDocument();
      expect(screen.getByText('Oranges')).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    const mockMaterials = [
      { id: 1, name: 'Apples', availableQuantity: 200 },
      { id: 2, name: 'Oranges', availableQuantity: 150 },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMaterials });
    axios.post.mockResolvedValueOnce({ data: { message: 'Request submitted successfully!' } });

    render(<SinkPage />);

    // Fill in the request quantities
    fireEvent.change(screen.getByLabelText('Request Quantity').nextSibling, {
      target: { value: '10' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Submit Request'));

    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Request submitted successfully!')).toBeInTheDocument();
    });
  });

  it('handles form submission failure', async () => {
    const mockMaterials = [
      { id: 1, name: 'Apples', availableQuantity: 200 },
      { id: 2, name: 'Oranges', availableQuantity: 150 },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMaterials });
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Failed to submit request' } },
    });

    render(<SinkPage />);

    // Submit the form
    fireEvent.click(screen.getByText('Submit Request'));

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Failed to submit request')).toBeInTheDocument();
    });
  });
});
