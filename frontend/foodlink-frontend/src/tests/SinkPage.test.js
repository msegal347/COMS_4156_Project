import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SinkPage from './SinkPage';
import { getResources, submitRequest } from '../services/api';

jest.mock('../services/api');

const mockResources = [
  { _id: '1', category: 'Material1', quantity: 100 },
  { _id: '2', category: 'Material2', quantity: 150 },
];

const mockSubmitRequest = jest.fn();

beforeEach(() => {
  getResources.mockResolvedValue({ data: mockResources });
  submitRequest.mockResolvedValue();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SinkPage', () => {
  it('renders SinkPage component', async () => {
    await act(async () => {
      render(<SinkPage />);
    });

    expect(screen.getByText('Material Requests')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Submit Request');
  });

  it('displays materials table with available quantities', async () => {
    await act(async () => {
      render(<SinkPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Material1')).toBeInTheDocument();
      expect(screen.getByText('Material2')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
    });
  });

  it('updates request quantities on input change', async () => {
    await act(async () => {
      render(<SinkPage />);
    });

    const inputMaterial1 = screen.getByDisplayValue('');
    const inputMaterial2 = screen.getByDisplayValue('');

    userEvent.type(inputMaterial1, '50');
    userEvent.type(inputMaterial2, '75');

    expect(inputMaterial1).toHaveValue('50');
    expect(inputMaterial2).toHaveValue('75');
  });

  it('submits requests on form submission', async () => {
    await act(async () => {
      render(<SinkPage />);
    });

    const inputMaterial1 = screen.getByDisplayValue('');
    const inputMaterial2 = screen.getByDisplayValue('');

    userEvent.type(inputMaterial1, '50');
    userEvent.type(inputMaterial2, '75');

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockSubmitRequest).toHaveBeenCalledWith({ 1: '50', 2: '75' });
    });
  });

  it('handles error during request submission', async () => {
    submitRequest.mockRejectedValueOnce(new Error('Submission failed'));

    await act(async () => {
      render(<SinkPage />);
    });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Error submitting requests')).toBeInTheDocument();
    });
  });
});
