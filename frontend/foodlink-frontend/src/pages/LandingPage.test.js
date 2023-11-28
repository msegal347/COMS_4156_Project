import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to use jest-dom matchers
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';

test('renders LandingPage component', () => {
  render(
    <Router>
      <LandingPage />
    </Router>
  );

  // Check if the title, description, and registration button are rendered
  const titleElements = screen.queryAllByText(/FoodLink/i);
  const descriptionElements = screen.queryAllByText(/Welcome to FoodLink/i);
  const registerButtonElements = screen.queryAllByRole('link', { name: /get started/i });

  // Assert that at least one element is in the document
  expect(titleElements.length).toBeGreaterThan(0);
  expect(descriptionElements.length).toBeGreaterThan(0);
  expect(registerButtonElements.length).toBeGreaterThan(0);

  // You can add more specific assertions or queries based on your component structure
  // For example, checking the existence of CSS classes, etc.
});
