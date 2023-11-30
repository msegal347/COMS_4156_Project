// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Import this for toBeInTheDocument
// import axios from 'axios';

// // Import your component
// import AuditorPage from './AuditorPage';

// // Mock axios and react-chartjs-2
// jest.mock('axios');
// jest.mock('react-chartjs-2', () => ({
//   Bar: jest.fn(() => null),
// }));

// describe('AuditorPage', () => {
//   // Mock data for axios responses
//   const mockMaterialsData = { materials: [{ name: 'Apples', quantity: 50 }] };
//   const mockTransfersData = {
//     transfers: [{ id: 't1', materials: [{ foodType: 'Apples', quantity: 20 }] }],
//   };
//   const mockTransactionsData = [
//     {
//       id: 't1',
//       materials: [{ foodType: 'Apples', quantity: 100 }],
//       origin: 'Central Park, NY',
//       destination: 'Times Square, NY',
//       orderDate: '2023-11-25T09:00:00Z',
//       expectedDelivery: '2023-11-26T09:00:00Z',
//       start: { lat: 40.7812, lng: -73.9665 },
//       end: { lat: 40.758, lng: -73.9855 },
//     },
//   ];

//   beforeEach(() => {
//     // Mock axios.get calls
//     axios.get.mockImplementation(url => {
//       switch (url) {
//         case 'http://localhost:3001/api/analytics/materials':
//           return Promise.resolve({ data: mockMaterialsData });
//         case 'http://localhost:3001/api/analytics/transfers':
//           return Promise.resolve({ data: mockTransfersData });
//         case 'http://localhost:3001/api/transactions':
//           return Promise.resolve({ data: mockTransactionsData });
//         default:
//           return Promise.reject(new Error('Not mocked URL'));
//       }
//     });
//   });

//   it('renders AuditorPage component', async () => {
//     render(<AuditorPage />);

//     // Wait for data to be loaded
//     await screen.findByText('Select', { selector: 'button' });

//     // Check that the expected elements are rendered
//     expect(screen.getByText('Auditor Analytics')).toBeInTheDocument();
//     expect(screen.getByText('Available Quantity')).toBeInTheDocument();
//     expect(screen.getByText('Transferred Quantity')).toBeInTheDocument();
//     expect(screen.getByText('ID')).toBeInTheDocument();
//     expect(screen.getByText('Food Type')).toBeInTheDocument();
//     expect(screen.getByText('Quantity')).toBeInTheDocument();
//     expect(screen.getByText('Start')).toBeInTheDocument();
//     expect(screen.getByText('End')).toBeInTheDocument();
//     expect(screen.getByText('Order Date')).toBeInTheDocument();
//     expect(screen.getByText('Expected Delivery')).toBeInTheDocument();

//     // Use findAllByText to get all elements with the text "Select"
//     const selectButtons = screen.findAllByText('Select');

//     // Ensure there is more than one element with the text "Select"
//     expect(selectButtons).toHaveLength(2);

//     // Check that one of them is a button and the other is a th
//     const buttonSelect = selectButtons.find(button => button.tagName.toLowerCase() === 'button');
//     const thSelect = selectButtons.find(th => th.tagName.toLowerCase() === 'th');

//     expect(buttonSelect).toBeInTheDocument();
//     expect(thSelect).toBeInTheDocument();
//   });

//   it('handles transaction selection', async () => {
//     render(<AuditorPage />);

//     // Wait for data to be loaded
//     await screen.findByText('Select', { selector: 'button' });

//     // Click the "Select" button for the first transaction
//     fireEvent.click(screen.getByText('Select', { selector: 'button' }));

//     // Check that the selected transaction is displayed on the map
//     expect(screen.getByTitle('Central Park, NY')).toBeInTheDocument();
//     expect(screen.getByTitle('Times Square, NY')).toBeInTheDocument();

//     // Click the "Select" button again to deselect the transaction
//     fireEvent.click(screen.getByText('Select', { selector: 'th' }));

//     // Check that the selected transaction is no longer displayed on the map
//     expect(screen.queryByTitle('Central Park, NY')).toBeNull();
//     expect(screen.queryByTitle('Times Square, NY')).toBeNull();
//   });
// });
