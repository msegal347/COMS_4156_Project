// src/pages/__tests__/SourcePage.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

import SourcePage from './SourcePage';

describe('SourcePage', () => {
  test('renders without errors', () => {
    render(<SourcePage />);
    // Check if the component renders without errors
    expect(screen.getByText('Material Submission')).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<SourcePage />);
    const categoryInput = screen.getByLabelText('Food Category');

    fireEvent.change(categoryInput, { target: { value: 'Fruits' } });

    // Check if the state is updated
    expect(categoryInput.value).toBe('Fruits');
  });

  test('submits form with valid data', async () => {
    render(<SourcePage />);
    const categoryInput = screen.getByLabelText('Food Category');
    const quantityInput = screen.getByLabelText('Quantity');
    const expirationDateInput = screen.getByLabelText('Expiration Date');
    const submitButton = screen.getByText('Submit');

    // Fill out the form
    fireEvent.change(categoryInput, { target: { value: 'Fruits' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });
    fireEvent.change(expirationDateInput, { target: { value: '2023-12-31' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if the form is submitted
    expect(screen.getByText('Material Submission')).toBeInTheDocument();

    // You might want to add more assertions depending on your use case
  });
});
