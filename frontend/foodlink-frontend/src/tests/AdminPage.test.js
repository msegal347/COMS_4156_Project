import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminPage from '../pages/AdminPage';

jest.mock('axios');

const mockData = {
  users: [
    { id: 'u1', name: 'Alice', role: 'source' },
    { id: 'u2', name: 'Bob', role: 'sink' },
    { id: 'u3', name: 'Charlie', role: 'auditor' },
  ],
  resources: [
    { id: 'r1', name: 'Apples', availableQuantity: 200 },
    { id: 'r2', name: 'Oranges', availableQuantity: 150 },
    // ... More resource entries
  ],
  transactions: [
    {
      id: 't1',
      materials: [{ foodType: 'Apples', quantity: 100 }],
      origin: 'Central Park, NY',
      destination: 'Times Square, NY',
      orderDate: new Date('2023-11-25T09:00:00Z'),
      expectedDelivery: new Date('2023-11-26T09:00:00Z'),
      start: { lat: 40.7812, lng: -73.9665 },
      end: { lat: 40.758, lng: -73.9855 },
    },
    // ... More transaction entries
  ],
  auditLogs: [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      event: 'User JohnD logged in',
      category: 'User Actions',
    },
    {
      id: 2,
      timestamp: new Date().toISOString(),
      event: 'Backup completed successfully',
      category: 'System Events',
    },
    // ... More log entries
  ],
  issues: [
    { id: 'i1', description: 'Server down', status: 'Open' },
    { id: 'i2', description: 'Login issue', status: 'Resolved' },
    // ... More issue entries
  ],
  analytics: {
    userActivity: {
      loginsToday: 150,
      signupsToday: 10,
      activeUsers: 75,
    },
    transactionVolumes: {
      today: 120,
      thisWeek: 840,
      thisMonth: 3600,
    },
    resourceUtilization: {
      totalListed: 300,
      totalRequested: 150,
      totalFulfilled: 100,
    },
    systemPerformance: {
      uptime: '99.99%',
      averageResponseTime: '200ms',
    },
    issueTracking: {
      openIssues: 5,
      resolvedIssues: 20,
      averageResolutionTime: '48 hours',
    },
    userEngagement: {
      averageTransactionsPerUser: 5,
      averageSessionTime: '5 minutes',
    },
  },
};

describe('AdminPage', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('renders AdminPage component', async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockData.resources })
      .mockResolvedValueOnce({ data: mockData.transactions })
      .mockResolvedValueOnce({ data: mockData.auditLogs })
      .mockResolvedValueOnce({ data: mockData.issues })
      .mockResolvedValueOnce({ data: mockData.analytics });
    render(<AdminPage />);

    await waitFor(() => {
      expect(document.querySelector('.title')).toHaveTextContent('Admin Dashboard');
    });
  });

  it('renders User Management section with users', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(document.querySelector('.collapsibleTitle')).toHaveTextContent('User Management');
      expect(document.querySelectorAll('.userTable tbody tr')).toHaveLength(mockData.users.length);
    });
  });

  it('toggles User Management section when clicked', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      const toggleButton = document.querySelector('.collapsibleTitle button');
      fireEvent.click(toggleButton);

      expect(document.querySelector('.collapsibleContent')).toHaveClass('active');

      fireEvent.click(toggleButton);

      expect(document.querySelector('.collapsibleContent')).not.toHaveClass('active');
    });
  });

  it('renders Resource Oversight section with resources', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(document.querySelector('.collapsibleTitle')).toHaveTextContent('Resource Oversight');
      expect(document.querySelectorAll('.table tbody tr')).toHaveLength(mockData.resources.length);
    });
  });

  it('renders Transaction Oversight section with transactions', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(document.querySelector('.collapsibleTitle')).toHaveTextContent(
        'Transaction Oversight'
      );
      expect(document.querySelectorAll('.table tbody tr')).toHaveLength(
        mockData.transactions.length
      );
    });
  });

  it('renders Analytics and Reporting section with analytics data', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(document.querySelector('.collapsibleTitle')).toHaveTextContent(
        'Analytics and Reporting'
      );
      expect(document.querySelectorAll('.analyticsSection h3')).toHaveLength(
        Object.keys(mockData.analytics).length
      );
    });
  });

  it('renders Audit Logs section with audit logs', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(document.querySelector('.collapsibleTitle')).toHaveTextContent('Audit Logs');
      expect(document.querySelectorAll('.auditLogsTable tbody tr')).toHaveLength(
        mockData.auditLogs.length
      );
    });
  });
});
