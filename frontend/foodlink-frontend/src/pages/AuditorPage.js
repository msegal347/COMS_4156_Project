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
    {
      id: 't4',
      materials: [{ foodType: 'Meat & Poultry', quantity: 90 }],
      origin: 'Washington Square Park, NY',
      destination: 'Harlem, NY',
      orderDate: new Date('2023-12-06T12:00:00Z'),
      expectedDelivery: new Date('2023-12-07T12:00:00Z'),
      start: { lat: 40.730823, lng: -73.997332 },
      end: { lat: 40.811550, lng: -73.946477 },
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
      start: { lat: 40.7420, lng: -74.0048 },
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
      start: { lat: 40.7420, lng: -74.0048 },
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
    }
  ];

  const placeholderTransfers = {
    'Fruits': 50,
    'Vegetables': 100,
    'Dairy': 150,
    'Meat & Poultry': 40,
    'Seafood': 110,
    'Frozen Foods': 120,
    'Meat & Poultry': 90,
    'Baked Goods': 75,
    'Snacks': 65,
    'Breakfast Foods': 80,
    'Beverages': 130,
    'Pet Food': 50,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Material Availability' },
    },
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getResources();
        const fetchedMaterials = response.data.map(material => ({
          category: material.category,
          quantity: material.userResources.reduce((sum, ur) => sum + ur.quantity, 0)
        }));

        setAnalyticsData({
          materials: fetchedMaterials,
          transfers: placeholderTransfers
        });
      } catch (error) {
        console.error('Error fetching materials', error);
      }
    };

    fetchMaterials();
  }, []);

  const materialsChartData = {
    labels: analyticsData.materials.map(material => material.category),
    datasets: [{
      label: 'Available Quantity',
      data: analyticsData.materials.map(material => material.quantity),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }],
  };

  const transfersChartData = {
    labels: Object.keys(placeholderTransfers),
    datasets: [
      {
        label: 'Transferred Quantity',
        data: Object.values(placeholderTransfers),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };


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

  const renderAllocationsTable = () => !analyticsData.allocations ? (<></>) : (
    <table className={styles.transactionTable}>
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Created Date</th>
          <th>Source Email</th>
          <th>Sink Email</th>
        </tr>
      </thead>
      <tbody>
        {analyticsData.allocations.map(allocation => (
          <tr key={allocation.id}>
            <td>{allocation.allocatedQuantity}</td>
            <td>{new Date(allocation.createdAt).toLocaleString()}</td>
            <td>{allocation.sourceId.email}</td>
            <td>{allocation.sinkId.email}</td>
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
      <div className={styles.transactionTableContainer}>{renderAllocationsTable()}</div>
      <div style={{ height: '400px', width: '100%' }}>
        <MapWithMarkers />
      </div>
    </div>
  );
};

export default AuditorPage;
