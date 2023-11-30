import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios'; // Import axios
import DashboardPage from '../pages/DashboardPage';

jest.mock('axios'); // Mock the entire axios module

describe('DashboardPage', () => {
  it('renders without errors', async () => {
    // Mock the axios.get function to return a resolved promise with sample data
    axios.get.mockResolvedValue({ data: [] });

    // Render the component
    render(<DashboardPage />);

    // Check if the title is rendered
    const titleElement = screen.getByText('Dashboard');
    expect(titleElement).toBeInTheDocument();

    // Use act to handle asynchronous code in clicking the button
    await act(async () => {
      // Check if the map section is updated with the selected transaction
      const selectButton = screen.getByText('Select');
      fireEvent.click(selectButton);
    });

    const mapSection = screen.getByTestId('map-section');
    expect(mapSection).toBeInTheDocument();
  });
});
