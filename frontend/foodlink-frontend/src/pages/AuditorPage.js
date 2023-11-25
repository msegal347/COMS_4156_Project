import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GoogleMapReact from 'google-map-react';
import styles from './AuditorPage.module.css';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the AuditorPage component
const AuditorPage = () => {
  const [analyticsData, setAnalyticsData] = useState({ materials: [], transfers: [] });
  const [locations, setLocations] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const AnyReactComponent = ({ text }) => <div style={{ color: 'blue' }}>{text}</div>;

  // Define placeholder transaction data
  const placeholderTransactions = [
    { id: 't1', foodType: 'Apples', quantity: 100, start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 40.7580, lng: -73.9855 } },
    { id: 't2', foodType: 'Oranges', quantity: 150, start: { lat: 40.730610, lng: -73.935242 }, end: { lat: 40.7128, lng: -74.0060 } },
    { id: 't3', foodType: 'Bananas', quantity: 120, start: { lat: 40.7580, lng: -73.9855 }, end: { lat: 40.730610, lng: -73.935242 } },
    { id: 't4', foodType: 'Grapes', quantity: 90, start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 40.7580, lng: -73.9855 } },
    { id: 't5', foodType: 'Peaches', quantity: 80, start: { lat: 40.730610, lng: -73.935242 }, end: { lat: 40.7128, lng: -74.0060 } },
  ];

  const materialsChartData = {
    labels: analyticsData.materials.map(material => material.name),
    datasets: [
      {
        label: 'Quantity',
        data: analyticsData.materials.map(material => material.quantity),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const transfersChartData = {
    labels: analyticsData.transfers.map(transfer => transfer.material),
    datasets: [
      {
        label: 'Quantity',
        data: analyticsData.transfers.map(transfer => transfer.quantity),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart',
      },
    },
  };

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const materialsResponse = await axios.get('http://localhost:3001/api/analytics/materials');
        const transfersResponse = await axios.get('http://localhost:3001/api/analytics/transfers');
        setAnalyticsData({
          materials: materialsResponse.data,
          transfers: transfersResponse.data,
        });
      } catch (error) {
        console.error('Error fetching analytics data', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  const renderMarkers = (map, maps) => {
    placeholderTransactions.forEach(transaction => {
      new maps.Marker({
        position: transaction.start,
        map,
        title: transaction.source,
      });
      new maps.Marker({
        position: transaction.end,
        map,
        title: transaction.destination,
      });
    });
  };

  const renderRoute = (map, maps, transaction) => {
    if (window.currentRoute) {
      window.currentRoute.setMap(null);
    }

    const routePath = new maps.Polyline({
      path: [transaction.start, transaction.end],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    routePath.setMap(map);
    window.currentRoute = routePath;
  };

  const handleTransactionClick = transaction => {
    setSelectedTransaction(transaction);
  };

  useEffect(() => {
    // Fetch transactions with start and end points
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/transactions');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  // Function to handle selection of a transaction
  const handleTransactionSelect = (transaction) => {
    if (selectedTransaction && selectedTransaction.id === transaction.id) {
      setSelectedTransaction(null);
    } else {
      setSelectedTransaction(transaction); 
    }
  };

  const MapWithMarkers = () => (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
      defaultZoom={11}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        locations.forEach(location => {
          new maps.Marker({
            position: { lat: location.start.lat, lng: location.start.lng },
            map,
            title: location.source,
          });
        });
        if (selectedTransaction) {
          const routePath = new maps.Polyline({
            path: [
              { lat: selectedTransaction.start.lat, lng: selectedTransaction.start.lng },
              { lat: selectedTransaction.end.lat, lng: selectedTransaction.end.lng }
            ],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          routePath.setMap(map);
        }
      }}
    />
  );


  // Render a table of transactions with checkboxes for selection
  const renderTransactionsTable = () => (
    <table className={styles.transactionTable}>
      <thead>
        <tr>
          <th>Select</th>
          <th>ID</th>
          <th>Food Type</th>
          <th>Quantity</th>
          <th>Source</th>
          <th>Destination</th>
        </tr>
      </thead>
      <tbody>
        {placeholderTransactions.map(transaction => (
          <tr key={transaction.id} className={selectedTransaction?.id === transaction.id ? styles.selectedRow : ''}>
            <td>
              <input
                type="checkbox"
                checked={selectedTransaction?.id === transaction.id}
                onChange={() => handleTransactionSelect(transaction)}
              />
            </td>
            <td>{transaction.id}</td>
            <td>{transaction.foodType}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.start.lat.toFixed(4)}, {transaction.start.lng.toFixed(4)}</td>
            <td>{transaction.end.lat.toFixed(4)}, {transaction.end.lng.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Auditor Analytics</h1>
      <div className={styles.chartContainer}>
        <Bar data={materialsChartData} options={chartOptions} />
        <Bar data={transfersChartData} options={chartOptions} />
      </div>
      <div className={styles.transactionTableContainer}>
        {renderTransactionsTable()}
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <MapWithMarkers />
      </div>
    </div>
  );
};

export default AuditorPage;
