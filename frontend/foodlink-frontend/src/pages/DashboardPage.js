import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import styles from './DashboardPage.module.css';
import { getRecentTransactions, getPendingRequests } from '../services/api';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    recentTransactions: [],
    pendingRequests: [],
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const recentTransactionsData = await getRecentTransactions();
        const pendingRequestsData = await getPendingRequests();
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

  const toggleDetails = id => {
    setShowDetails(showDetails === id ? null : id);
  };

  const handleTransactionSelect = transaction => {
    setSelectedTransaction(transaction);
  };

  const handleDetailsToggle = transactionId => {
    if (showDetails && selectedTransaction && transactionId === selectedTransaction.id) {
      setShowDetails(false);
    } else {
      setShowDetails(true);
      handleTransactionSelect(dashboardData.recentTransactions.find(t => t.id === transactionId));
    }
  };

  const renderMarkers = transaction => {
    if (mapRef.current && mapsRef.current && transaction) {
      if (window.markers) {
        window.markers.forEach(marker => marker.setMap(null));
      }
      window.markers = [];

      const startMarker = new mapsRef.current.Marker({
        position: transaction.start,
        map: mapRef.current,
        title: transaction.origin,
      });
      const endMarker = new mapsRef.current.Marker({
        position: transaction.end,
        map: mapRef.current,
        title: transaction.destination,
      });
      window.markers.push(startMarker, endMarker);
    }
  };

  const renderRoute = transaction => {
    if (mapRef.current && mapsRef.current && transaction) {
      if (window.currentRoute) {
        window.currentRoute.setMap(null);
      }

      const routePath = new mapsRef.current.Polyline({
        path: [
          { lat: transaction.start.lat, lng: transaction.start.lng },
          { lat: transaction.end.lat, lng: transaction.end.lng },
        ],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      routePath.setMap(mapRef.current);
      window.currentRoute = routePath;
    }
  };

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

  const Map = ({ transaction }) => {
    useEffect(() => {
      if (transaction) {
        renderMarkers(transaction);
        renderRoute(transaction);
      }
    }, [transaction]);

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 40.7128, lng: -74.006 }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          mapsRef.current = maps;
          if (transaction) {
            renderMarkers(transaction);
            renderRoute(transaction);
          }
        }}
      >
        {transaction && (
          <>
            <AnyReactComponent
              lat={transaction.start.lat}
              lng={transaction.start.lng}
              text={transaction.origin}
            />
            <AnyReactComponent
              lat={transaction.end.lat}
              lng={transaction.end.lng}
              text={transaction.destination}
            />
          </>
        )}
      </GoogleMapReact>
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.transactionTableContainer}>{renderTransactionsTable()}</div>

      <section className={styles.mapSection}>
        <div style={{ height: '400px', width: '100%' }}>
          {selectedTransaction ? (
            <Map key={selectedTransaction.id} transaction={selectedTransaction} />
          ) : (
            <Map key="default" />
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
