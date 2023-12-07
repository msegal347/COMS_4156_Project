import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import {
  getRecentTransactions,
  getPendingRequests,
  getUsers,
  getAuditLogs,
  getAnalytics,
} from '../services/api';

const CollapsibleComponent = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.collapsibleComponent}>
      <button
        className={`${styles.collapsibleTitle} ${isOpen ? styles.active : ''}`}
        onClick={toggleCollapse}
      >
        {title}
      </button>
      <div className={`${styles.collapsibleContent} ${isOpen ? styles.active : ''}`}>
        {children}
      </div>
    </div>
  );
};

const placeholderUsers = [
  { id: "656fe3661a0dcc3c4bcecf02", name: "source1@example.com", role: "source", address: "123 Source St" },
  { id: "656fe3661a0dcc3c4bcecf03", name: "sink1@example.com", role: "sink", address: "456 Sink Rd" },
  { id: "656fe3661a0dcc3c4bcecf04", name: "auditor1@example.com", role: "auditor", address: "789 Auditor Ave" },
  { id: "656fe3661a0dcc3c4bcecf06", name: "source2@example.com", role: "source", address: "102 Source St" },
  { id: "656fe3661a0dcc3c4bcecf07", name: "sink2@example.com", role: "sink", address: "103 Sink Street" },
  { id: "656fe3661a0dcc3c4bcecf08", name: "auditor2@example.com", role: "auditor", address: "104 Auditor Rd" },
  { id: "656fe3661a0dcc3c4bcecf0a", name: "source3@example.com", role: "source", address: "106 Source St" },
  { id: "656fe3661a0dcc3c4bcecf0b", name: "sink3@example.com", role: "sink", address: "107 Sink Blvd" },
  { id: "656fe3661a0dcc3c4bcecf0c", name: "auditor3@example.com", role: "auditor", address: "108 Auditor St" },
  { id: "6570a44b66b2b54d698fb4a2", name: "sink_test@test.com", role: "sink", address: "535 West 116th St" },
  { id: "6570a44b66b2b54d698fb4a2", name: "source_test@test.com", role: "source", address: "537 West 116th St" },
];


const auditLogsData = [
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
  {
    id: 3,
    timestamp: new Date().toISOString(),
    event: 'Failed login attempt for user JaneD',
    category: 'Security Events',
  },
  {
    id: 4,
    timestamp: new Date().toISOString(),
    event: 'Updated system settings by admin',
    category: 'Administrative Actions',
  },
  // ... More log entries
];

const placeholderResources = [
  { id: 'r1', name: 'Apples', availableQuantity: 200 },
  { id: 'r2', name: 'Oranges', availableQuantity: 150 },
  { id: 'r3', name: 'Bananas', availableQuantity: 180 },
  { id: 'r4', name: 'Grapes', availableQuantity: 210 },
  { id: 'r5', name: 'Peaches', availableQuantity: 170 },
];

const placeholderTransactions = [
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
  {
    id: 't2',
    materials: [{ foodType: 'Oranges', quantity: 150 }],
    origin: 'Empire State Building, NY',
    destination: 'Statue of Liberty, NY',
    orderDate: new Date('2023-11-25T10:00:00Z'),
    expectedDelivery: new Date('2023-11-26T10:00:00Z'),
    start: { lat: 40.748817, lng: -73.985428 },
    end: { lat: 40.689247, lng: -74.044502 },
  },
  {
    id: 't3',
    materials: [{ foodType: 'Bananas', quantity: 120 }],
    origin: 'Brooklyn Bridge, NY',
    destination: 'Wall Street, NY',
    orderDate: new Date('2023-11-25T11:00:00Z'),
    expectedDelivery: new Date('2023-11-26T11:00:00Z'),
    start: { lat: 40.7061, lng: -73.9969 },
    end: { lat: 40.7074, lng: -74.0113 },
  },
  {
    id: 't4',
    materials: [{ foodType: 'Grapes', quantity: 90 }],
    origin: 'Madison Square Garden, NY',
    destination: 'Yankee Stadium, NY',
    orderDate: new Date('2023-11-25T12:00:00Z'),
    expectedDelivery: new Date('2023-11-26T12:00:00Z'),
    start: { lat: 40.7505, lng: -73.9934 },
    end: { lat: 40.8296, lng: -73.9262 },
  },
  {
    id: 't5',
    materials: [{ foodType: 'Peaches', quantity: 80 }],
    origin: 'Central Park Zoo, NY',
    destination: 'Coney Island, NY',
    orderDate: new Date('2023-11-25T13:00:00Z'),
    expectedDelivery: new Date('2023-11-26T13:00:00Z'),
    start: { lat: 40.7678, lng: -73.9718 },
    end: { lat: 40.5749, lng: -73.9857 },
  },
];

const analyticsData = {
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
};

const AdminPage = () => {
  const [users, setUsers] = useState(placeholderUsers);
  const [transactions, setTransactions] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, transactionsData, auditLogsData, analyticsData] = await Promise.all([
          getUsers(),
          getRecentTransactions(),
          getAuditLogs(),
          getAnalytics(),
        ]);
        setUsers(usersData.data);
        setTransactions(transactionsData.data);
        setAuditLogs(auditLogsData.data);
        setAnalytics(analyticsData.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      {/* User Management Section */}
      <CollapsibleComponent title="User Management">
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => alert('Edit user')}>Edit</button>
                  <button onClick={() => alert('Remove user')}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => alert('Create new user')}>Create New User</button>
      </CollapsibleComponent>

      {/* Resource Oversight Section */}
      <CollapsibleComponent title="Resource Oversight">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {placeholderResources.map(resource => (
              <tr key={resource.id}>
                <td>{resource.id}</td>
                <td>{resource.name}</td>
                <td>{resource.availableQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleComponent>

      {/* Transaction Oversight Section */}
      <CollapsibleComponent title="Transaction Oversight">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Type</th>
              <th>Quantity</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Order Date</th>
              <th>Expected Delivery</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.materials[0].foodType}</td>
                <td>{transaction.materials[0].quantity}</td>
                <td>{`${transaction.start.lat.toFixed(4)}, ${transaction.start.lng.toFixed(
                  4
                )}`}</td>
                <td>{`${transaction.end.lat.toFixed(4)}, ${transaction.end.lng.toFixed(4)}`}</td>
                <td>{transaction.orderDate.toLocaleString()}</td>
                <td>{transaction.expectedDelivery.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleComponent>

      {/* Analytics and Reporting Section */}
      <CollapsibleComponent title="Analytics and Reporting">
        <div className={styles.analyticsSection}>
          <h3>User Activity</h3>
          <p>Logins Today: {analyticsData.userActivity.loginsToday}</p>
          <p>Signups Today: {analyticsData.userActivity.signupsToday}</p>
          <p>Active Users: {analyticsData.userActivity.activeUsers}</p>

          <h3>Transaction Volumes</h3>
          <p>Today: {analyticsData.transactionVolumes.today}</p>
          <p>This Week: {analyticsData.transactionVolumes.thisWeek}</p>
          <p>This Month: {analyticsData.transactionVolumes.thisMonth}</p>

          <h3>Resource Utilization</h3>
          <p>Total Listed: {analyticsData.resourceUtilization.totalListed}</p>
          <p>Total Requested: {analyticsData.resourceUtilization.totalRequested}</p>
          <p>Total Fulfilled: {analyticsData.resourceUtilization.totalFulfilled}</p>

          <h3>System Performance</h3>
          <p>Uptime: {analyticsData.systemPerformance.uptime}</p>
          <p>Average Response Time: {analyticsData.systemPerformance.averageResponseTime}</p>

          <h3>Issue Tracking</h3>
          <p>Open Issues: {analyticsData.issueTracking.openIssues}</p>
          <p>Resolved Issues: {analyticsData.issueTracking.resolvedIssues}</p>
          <p>Average Resolution Time: {analyticsData.issueTracking.averageResolutionTime}</p>

          <h3>User Engagement</h3>
          <p>
            Average Transactions Per User: {analyticsData.userEngagement.averageTransactionsPerUser}
          </p>
          <p>Average Session Time: {analyticsData.userEngagement.averageSessionTime}</p>
        </div>
      </CollapsibleComponent>

      {/* Audit Logs Section */}
      <CollapsibleComponent title="Audit Logs">
        <table className={styles.auditLogsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Event</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {auditLogsData.map(log => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.timestamp}</td>
                <td>{log.event}</td>
                <td>{log.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleComponent>
    </div>
  );
};

export default AdminPage;
