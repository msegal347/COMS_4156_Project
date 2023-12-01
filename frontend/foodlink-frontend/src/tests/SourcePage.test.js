import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SourcePage from './SourcePage';
import { createResource } from '../services/api';

jest.mock('../services/api');

const mockCreateResource = jest.fn();

beforeEach(() => {
  createResource.mockResolvedValue();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SourcePage', () => {
  it('renders SourcePage component', async () => {
    await act(async () => {
      render(<SourcePage />);
    });

    expect(screen.getByText('Material Submission')).toBeInTheDocument();
    expect(screen.getByText('Food Category')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });

  it('updates input values on change', async () => {
    await act(async () => {
      render(<SourcePage />);
    });

    const inputCategory = screen.getByLabelText('Food Category');
    const inputQuantity = screen.getByLabelText('Quantity');

    userEvent.selectOptions(inputCategory, 'Fruits');
    userEvent.type(inputQuantity, '50');

    expect(inputCategory).toHaveValue('Fruits');
    expect(inputQuantity).toHaveValue('50');
  });

  it('submits material data on form submission', async () => {
    await act(async () => {
      render(<SourcePage />);
    });

    const inputCategory = screen.getByLabelText('Food Category');
    const inputQuantity = screen.getByLabelText('Quantity');

    userEvent.selectOptions(inputCategory, 'Fruits');
    userEvent.type(inputQuantity, '50');

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockCreateResource).toHaveBeenCalledWith({
        category: 'Fruits',
        quantity: '50',
      });
    });
  });

  it('handles error during material data submission', async () => {
    createResource.mockRejectedValueOnce(new Error('Submission failed'));

    await act(async () => {
      render(<SourcePage />);
    });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Error submitting material data')).toBeInTheDocument();
    });
  });
});
