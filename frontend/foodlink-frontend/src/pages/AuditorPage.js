import React, { useState, useEffect } from 'react';
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
import { getResources, getTransfers, getTransactions } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AuditorPage = () => {
  const [analyticsData, setAnalyticsData] = useState({ materials: [], transfers: [] });
  const [locations, setLocations] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const AnyReactComponent = ({ text }) => <div style={{ color: 'blue' }}>{text}</div>;

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
  // Placeholder for available materials
  const availableMaterials = [
    { name: 'Apples', quantity: 200 },
    { name: 'Oranges', quantity: 150 },
    { name: 'Bananas', quantity: 180 },
    { name: 'Grapes', quantity: 210 },
    { name: 'Peaches', quantity: 170 },
  ];

  const materialsChartData = {
    labels: availableMaterials.map(material => material.name),
    datasets: [
      {
        label: 'Available Quantity',
        data: availableMaterials.map(material => material.quantity),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const transfersChartData = {
    labels: placeholderTransactions.map(transfer => transfer.materials[0].foodType),
    datasets: [
      {
        label: 'Transferred Quantity',
        data: placeholderTransactions.map(transfer => transfer.materials[0].quantity),
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
        const materialsResponse = await getMaterials();
        const transfersResponse = await getTransfers();
        setAnalyticsData({
          materials: materialsResponse.data,
          transfers: transfersResponse.data,
        });
      } catch (error) {
        console.error('Error fetching analytics data', error);
      }
    };

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

    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchAnalyticsData();
    fetchTransactions();
  }, []);

  // Function to handle selection of a transaction
  const handleTransactionSelect = transaction => {
    if (selectedTransaction && selectedTransaction.id === transaction.id) {
      setSelectedTransaction(null);
    } else {
      setSelectedTransaction(transaction);
    }
  };

  const MapWithMarkers = () => (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      defaultCenter={{ lat: 40.7128, lng: -74.006 }}
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
              { lat: selectedTransaction.end.lat, lng: selectedTransaction.end.lng },
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
          <th>ID</th>
          <th>Food Type</th>
          <th>Quantity</th>
          <th>Start</th>
          <th>End</th>
          <th>Order Date</th>
          <th>Expected Delivery</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {placeholderTransactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.materials[0].foodType}</td>
            <td>{transaction.materials[0].quantity}</td>
            <td>{`${transaction.start.lat.toFixed(4)}, ${transaction.start.lng.toFixed(4)}`}</td>
            <td>{`${transaction.end.lat.toFixed(4)}, ${transaction.end.lng.toFixed(4)}`}</td>
            <td>{transaction.orderDate.toLocaleString()}</td>
            <td>{transaction.expectedDelivery.toLocaleString()}</td>
            <td>
              <button onClick={() => handleTransactionSelect(transaction)}>Select</button>
            </td>
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
      <div className={styles.transactionTableContainer}>{renderTransactionsTable()}</div>
      <div style={{ height: '400px', width: '100%' }}>
        <MapWithMarkers />
      </div>
    </div>
  );
};

export default AuditorPage;
