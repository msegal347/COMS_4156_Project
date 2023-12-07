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
import { getResources, getTransactions, getAllocations } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AuditorPage = () => {
  const [analyticsData, setAnalyticsData] = useState({ materials: [], transfers: [] });
  const [locations, setLocations] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const AnyReactComponent = ({ text }) => <div style={{ color: 'blue' }}>{text}</div>;

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
      start: { lat: 40.7420, lng: -74.0048 },
      end: { lat: 40.807536, lng: -73.962573 },
    },
  ];

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
      legend: { position: 'top' },
      title: { display: true, text: 'Material Availability' },
    },
  };

  const materialsChartData = {
    labels: analyticsData.materials.map(material => material.category),
    datasets: [{
      label: 'Available Quantity',
      data: analyticsData.materials.map(material => material.quantity),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }],
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getResources();
        setAnalyticsData({ materials: response.data });
      } catch (error) {
        console.error('Error fetching materials', error);
      }
    };

    fetchMaterials();
  }, []);


    useEffect(() => {
      const fetchAnalyticsData = async () => {
        try {
          const materialsResponse = await getResources();
          const transactionsResponse = await getTransactions(); 
          const allocationsResponse = await getAllocations(); 
          setAnalyticsData({
            materials: materialsResponse.data,
            transfers: transactionsResponse.data, 
            allocations: allocationsResponse.data,
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

    fetchAnalyticsData();
  }, []);

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
