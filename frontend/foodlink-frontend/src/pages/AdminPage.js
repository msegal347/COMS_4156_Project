import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import {
  getResources,
  getRecentTransactions,
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
  {
    userId: 'u656fe3661a0dcc3c4bcecf02',
    userName: 'source1@example.com',
    role: 'source',
    address: '123 Source St',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf03',
    userName: 'sink1@example.com',
    role: 'sink',
    address: '456 Sink Rd',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf04',
    userName: 'auditor1@example.com',
    role: 'auditor',
    address: '789 Auditor Ave',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf06',
    userName: 'source2@example.com',
    role: 'source',
    address: '102 Source St',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf07',
    userName: 'sink2@example.com',
    role: 'sink',
    address: '103 Sink Street',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf08',
    userName: 'auditor2@example.com',
    role: 'auditor',
    address: '104 Auditor Rd',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf0a',
    userName: 'source3@example.com',
    role: 'source',
    address: '106 Source St',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf0b',
    userName: 'sink3@example.com',
    role: 'sink',
    address: '107 Sink Blvd',
  },
  {
    userId: 'u656fe3661a0dcc3c4bcecf0c',
    userName: 'auditor3@example.com',
    role: 'auditor',
    address: '108 Auditor St',
  },
  {
    userId: 'u6570a44b66b2b54d698fb4a2',
    userName: 'sink_test@test.com',
    role: 'sink',
    address: '535 West 116th St',
  },
  {
    userId: 'u6570a44b66b2b54d698fb4a2b',
    userName: 'source_test@test.com',
    role: 'source',
    address: '537 West 116th St',
  },
];

const auditLogsData = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    event: 'User sink_test logged in',
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
    event: 'Failed login attempt for user sink_test',
    category: 'Security Events',
  },
  {
    id: 4,
    timestamp: new Date().toISOString(),
    event: 'Updated system settings by admin',
    category: 'Administrative Actions',
  },
];

const placeholderTransactions = [
  {
    id: 't1',
    materials: [{ foodType: 'Vegetables', quantity: 100 }],
    origin: 'Washington Square Park, NY',
    destination: 'Columbia University, NY',
    orderDate: new Date('2023-12-06T09:00:00Z'),
    expectedDelivery: new Date('2023-12-07T09:00:00Z'),
    start: { lat: 40.730823, lng: -73.997332 },
    end: { lat: 40.807536, lng: -73.962573 },
  },
  {
    id: 't2',
    materials: [{ foodType: 'Dairy', quantity: 150 }],
    origin: 'Union Square, NY',
    destination: 'Columbia University, NY',
    orderDate: new Date('2023-12-06T10:00:00Z'),
    expectedDelivery: new Date('2023-12-07T10:00:00Z'),
    start: { lat: 40.7359, lng: -73.9911 },
    end: { lat: 40.807536, lng: -73.962573 },
  },
  {
    id: 't3',
    materials: [{ foodType: 'Frozen Foods', quantity: 120 }],
    origin: 'Chelsea Market, NY',
    destination: 'Columbia University, NY',
    orderDate: new Date('2023-12-06T11:00:00Z'),
    expectedDelivery: new Date('2023-12-07T11:00:00Z'),
    start: { lat: 40.742, lng: -74.0048 },
    end: { lat: 40.807536, lng: -73.962573 },
  },
  {
    id: 't4',
    materials: [{ foodType: 'Meat & Poultry', quantity: 90 }],
    origin: 'Washington Square Park, NY',
    destination: 'Harlem, NY',
    orderDate: new Date('2023-12-06T12:00:00Z'),
    expectedDelivery: new Date('2023-12-07T12:00:00Z'),
    start: { lat: 40.730823, lng: -73.997332 },
    end: { lat: 40.81155, lng: -73.946477 },
  },
  {
    id: 't5',
    materials: [{ foodType: 'Baked Goods', quantity: 75 }],
    origin: 'Union Square, NY',
    destination: 'East Village, NY',
    orderDate: new Date('2023-12-06T13:00:00Z'),
    expectedDelivery: new Date('2023-12-07T13:00:00Z'),
    start: { lat: 40.7359, lng: -73.9911 },
    end: { lat: 40.726477, lng: -73.981534 },
  },
  {
    id: 't6',
    materials: [{ foodType: 'Seafood', quantity: 110 }],
    origin: 'Chelsea Market, NY',
    destination: 'Financial District, NY',
    orderDate: new Date('2023-12-06T14:00:00Z'),
    expectedDelivery: new Date('2023-12-07T14:00:00Z'),
    start: { lat: 40.742, lng: -74.0048 },
    end: { lat: 40.707491, lng: -74.011276 },
  },
  {
    id: 't7',
    materials: [{ foodType: 'Snacks', quantity: 65 }],
    origin: 'Washington Square Park, NY',
    destination: 'Upper East Side, NY',
    orderDate: new Date('2023-12-06T15:00:00Z'),
    expectedDelivery: new Date('2023-12-07T15:00:00Z'),
    start: { lat: 40.730823, lng: -73.997332 },
    end: { lat: 40.773565, lng: -73.956555 },
  },
  {
    id: 't8',
    materials: [{ foodType: 'Breakfast Foods', quantity: 80 }],
    origin: 'Union Square, NY',
    destination: 'Chinatown, NY',
    orderDate: new Date('2023-12-06T16:00:00Z'),
    expectedDelivery: new Date('2023-12-07T16:00:00Z'),
    start: { lat: 40.7359, lng: -73.9911 },
    end: { lat: 40.715751, lng: -73.997031 },
  },
  {
    id: 't9',
    materials: [{ foodType: 'Beverages', quantity: 130 }],
    origin: 'Chelsea Market, NY',
    destination: 'Lower East Side, NY',
    orderDate: new Date('2023-12-06T17:00:00Z'),
    expectedDelivery: new Date('2023-12-07T17:00:00Z'),
    start: { lat: 40.742, lng: -74.0048 },
    end: { lat: 40.718267, lng: -73.988065 },
  },
  {
    id: 't10',
    materials: [{ foodType: 'Pet Food', quantity: 50 }],
    origin: 'Washington Square Park, NY',
    destination: 'Soho, NY',
    orderDate: new Date('2023-12-06T18:00:00Z'),
    expectedDelivery: new Date('2023-12-07T18:00:00Z'),
    start: { lat: 40.730823, lng: -73.997332 },
    end: { lat: 40.723301, lng: -74.002988 },
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
  // const [users, setUsers] = useState(placeholderUsers);
  const [resources, setResources] = useState([]);
  // const [transactions, setTransactions] = useState(placeholderTransactions);
  const [transactions, setTransactions] = useState();
  const [auditLogs, setAuditLogs] = useState();
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetching all necessary data
        const resourcesResponse = await getResources();

        // Setting state with fetched data
        setResources(resourcesResponse.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching resource data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const usersResponse = await getUsers();

        setUser(usersResponse.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const transactionsResponse = await getRecentTransactions();

        setTransactions(transactionsResponse.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching transaction data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAuditLogs = async () => {
      try {
        setLoading(true);

        const auditLogsResponse = await getAuditLogs();

        setAuditLogs(auditLogsResponse.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching audit log data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const analyticsResponse = await getAnalytics();

        setAnalytics(analyticsResponse.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchAuditLogs();
    fetchTransactions();
    fetchUsers();
    fetchAnalytics();
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
            {user?.map((userItem, index) => (
              <tr key={index}>
                <td>{userItem.userId}</td>
                <td>{userItem.userName}</td>
                <td>{userItem.role}</td>
                <td>{userItem.address}</td>
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
              <th>Category</th>
              <th>Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(resource => (
              <tr key={resource._id}>
                <td>{resource._id}</td>
                <td>{resource.category}</td>
                <td>{resource.userResources.reduce((sum, ur) => sum + ur.quantity, 0)}</td>
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
            {transactions?.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.materials.map(m => m.foodType).join(', ')}</td>
                <td>{transaction.materials.map(m => m.quantity).join(', ')}</td>
                <td>{transaction.origin}</td>
                <td>{transaction.destination}</td>
                <td>{new Date(transaction.orderDate).toLocaleString()}</td>
                <td>{new Date(transaction.expectedDelivery).toLocaleString()}</td>
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
            {auditLogs?.map(log => (
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
