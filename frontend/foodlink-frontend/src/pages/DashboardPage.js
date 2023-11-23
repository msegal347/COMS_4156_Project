import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    recentTransactions: [],
    pendingRequests: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const recentTransactionsData = await axios.get('/api/transactions/recent');
        const pendingRequestsData = await axios.get('/api/requests/pending');
        setDashboardData({
          recentTransactions: recentTransactionsData.data,
          pendingRequests: pendingRequestsData.data,
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>

      <section className={styles.dashboardSection}>
        <h2>Recent Transactions</h2>
        {dashboardData.recentTransactions.map(transaction => (
          <div key={transaction.id}>{transaction.summary}</div>
        ))}
      </section>

      <section className={styles.dashboardSection}>
        <h2>Pending Requests</h2>
        {dashboardData.pendingRequests.map(request => (
          <div key={request.id}>{request.summary}</div>
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
