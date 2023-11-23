import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  // States for various sections
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [settings, setSettings] = useState({ sampleSetting: '' });
  const [auditLogs, setAuditLogs] = useState([]);
  const [issues, setIssues] = useState([]);

  // Fetch functions
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simultaneous requests if possible
        const [usersRes, resourcesRes, transactionsRes, auditLogsRes, issuesRes, analyticsRes] =
          await Promise.all([
            axios.get('/api/users'),
            axios.get('/api/resources'),
            axios.get('/api/transactions'),
            axios.get('/api/audit-logs'),
            axios.get('/api/support-issues'),
            axios.get('/api/analytics'),
          ]);

        // Update state with fetched data
        setUsers(usersRes.data);
        setResources(resourcesRes.data);
        setTransactions(transactionsRes.data);
        setAuditLogs(auditLogsRes.data);
        setIssues(issuesRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        // Handle error appropriately
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Handle changes in settings
  const handleSettingsChange = event => {
    const { name, value } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value,
    }));
    // TODO: Implement logic to persist changes to backend
  };

  // JSX for the admin dashboard sections
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      {/* User Management Section */}
      <section className={styles.section}>
        <h2>User Management</h2>
        {users.map(user => (
          <div key={user.id}>{user.name}</div>
        ))}
      </section>

      {/* Resource Oversight Section */}
      <section className={styles.section}>
        <h2>Resource Oversight</h2>
        {resources.map(resource => (
          <div key={resource.id}>{resource.name}</div>
        ))}
      </section>

      {/* Transaction Oversight Section */}
      <section className={styles.section}>
        <h2>Transaction Oversight</h2>
        {transactions.map(transaction => (
          <div key={transaction.id}>{transaction.name}</div>
        ))}
      </section>

      {/* Analytics and Reporting Section */}
      <section className={styles.section}>
        <h2>Analytics and Reporting</h2>
        <div>{JSON.stringify(analytics)}</div>
      </section>

      {/* System Settings Section */}
      <section className={styles.section}>
        <h2>System Settings</h2>
        <label htmlFor="sampleSetting">Sample Setting:</label>
        <input
          type="text"
          id="sampleSetting"
          name="sampleSetting"
          value={settings.sampleSetting || ''}
          onChange={handleSettingsChange}
        />
        {/* Displaying the current settings */}
        <div>
          <h3>Current Settings:</h3>
          <pre>{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </section>

      {/* Audit Logs Section */}
      <section className={styles.section}>
        <h2>Audit Logs</h2>
        {auditLogs.map(log => (
          <div key={log.id}>{log.description}</div>
        ))}
      </section>

      {/* Support and Issue Management Section */}
      <section className={styles.section}>
        <h2>Support and Issue Management</h2>
        {issues.map(issue => (
          <div key={issue.id}>{issue.description}</div>
        ))}
      </section>
    </div>
  );
};

export default AdminPage;
