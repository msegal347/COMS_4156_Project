import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './DashboardPage.module.css';
import { getAllocations, getUserById, getResourceCategoryById } from '../services/api';
import { useUser } from '../contexts/UserContext';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const resourceCategories = {
  "6570a7b08a63f3553041e2f3": "Fruits",
  "6570a7b08a63f3553041e2f4": "Vegetables",
  "6570a7b08a63f3553041e2f5": "Dairy",
  "6570a7b08a63f3553041e2f6": "Meat & Poultry",
  "6570a7b08a63f3553041e2f7": "Seafood",
  "6570a7b08a63f3553041e2f8": "Baked Goods",
  "6570a7b08a63f3553041e2f9": "Frozen Foods",
  "6570a7b08a63f3553041e2fa": "Deli Items",
  "6570a7b08a63f3553041e2fb": "Canned Goods",
  "6570a7b08a63f3553041e2fc": "Dry Goods & Pasta",
  "6570a7b08a63f3553041e2fd": "Snacks",
  "6570a7b08a63f3553041e2fe": "Beverages",
  "6570a7b08a63f3553041e2ff": "Condiments & Sauces",
  "6570a7b08a63f3553041e300": "Spices & Herbs",
  "6570a7b08a63f3553041e301": "Breakfast Foods",
  "6570a7b08a63f3553041e302": "Sweets & Chocolates",
  "6570a7b08a63f3553041e303": "Health Foods",
  "6570a7b08a63f3553041e304": "International Cuisine",
  "6570a7b08a63f3553041e305": "Baby Food",
  "6570a7b08a63f3553041e306": "Pet Food"
};

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


const DashboardPage = () => {
  const [allocations, setAllocations] = useState([]);
  const [transactions, setTransactions] = useState(placeholderTransactions);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const { currentUser } = useUser();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (currentUser?.id) {
      fetchAllocations();
    }
  }, [currentUser?.id]);

  const fetchAllocations = async () => {
    try {
      const response = await getAllocations();
      const userIds = new Set(response.data.flatMap(a => [a.sourceId._id, a.sinkId._id]));
      const userResponses = await Promise.all([...userIds].map(id => getUserById(id)));
  
      const userMap = {};
      userResponses.forEach(u => {
        if (u && u.data) {
          userMap[u.data._id] = u.data;
        }
      });
  
      const allocationsWithDetails = (await Promise.all(response.data.map(async allocation => {
        const sourceUser = userMap[allocation.sourceId._id];
        const sinkUser = userMap[allocation.sinkId._id];
        if (!sourceUser || !sinkUser) {
          console.warn(`User data missing in allocation ${allocation._id}`);
          return null;
        }
  
        // Use the resourceCategories dictionary to get the category name
        const resourceCategoryName = resourceCategories[allocation.resourceCategoryId] || 'Unknown';
  
        return {
          ...allocation,
          sourceName: sourceUser.name || 'Unknown',
          sinkName: sinkUser.name || 'Unknown',
          resourceCategoryName
        };
      }))).filter(a => a);
  
      setAllocations(allocationsWithDetails);
    } catch (error) {
      console.error('Error fetching allocations:', error);
    }
  };
  
  
  

  const handleAllocationSelect = allocation => {
    console.log('Selected allocation:', allocation);
    setSelectedAllocation(allocation);
    renderMarkersAndRoute(allocation);
  };

  const renderMarkersAndRoute = async (allocation) => {
    console.log('Rendering markers and route for allocation:', allocation);
    if (!mapRef.current || !mapsRef.current || !allocation) return;

    if (window.markers) {
      window.markers.forEach(marker => marker.setMap(null));
    }
    if (window.currentRoute) {
      window.currentRoute.setMap(null);
    }
    window.markers = [];

    try {
      const sourceResponse = await getUserById(allocation.sourceId);
      const sinkResponse = await getUserById(allocation.sinkId);

      console.log('Source user data:', sourceResponse.data);
      console.log('Sink user data:', sinkResponse.data);

      const sourceUser = sourceResponse.data;
      const sinkUser = sinkResponse.data;

      const sourceMarker = new mapsRef.current.Marker({
        position: sourceUser.coordinates,
        map: mapRef.current,
        title: sourceUser.address,
      });

      const sinkMarker = new mapsRef.current.Marker({
        position: sinkUser.coordinates,
        map: mapRef.current,
        title: sinkUser.address,
      });

      window.markers.push(sourceMarker, sinkMarker);

      const routePath = new mapsRef.current.Polyline({
        path: [sourceUser.coordinates, sinkUser.coordinates],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      routePath.setMap(mapRef.current);
      window.currentRoute = routePath;

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleTransactionSelect = transaction => {
    setSelectedTransaction(transaction);
    setShowDetails(true); 
  };

  const toggleDetails = transactionId => {
    if (showDetails && selectedTransaction && transactionId === selectedTransaction.id) {
      setShowDetails(false);
    } else {
      setSelectedTransaction(transactions.find(t => t.id === transactionId));
      setShowDetails(true);
    }
  };

  const handleDetailsToggle = transactionId => {
    if (showDetails && selectedTransaction && transactionId === selectedTransaction.id) {
      setShowDetails(false);
    } else {
      setShowDetails(true);
      handleTransactionSelect(transactions.find(t => t.id === transactionId));
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

  const renderAllocationsTable = () => (
    <table className={styles.allocationTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Resource Category</th>
          <th>Allocated Quantity</th>
        </tr>
      </thead>
      <tbody>
        {allocations.length > 0 ? allocations.map(allocation => (
          <tr key={allocation._id} onClick={() => handleAllocationSelect(allocation)}>
            <td>{allocation._id}</td>
            <td>{allocation.resourceCategoryName}</td>
            <td>{allocation.allocatedQuantity}</td>
          </tr>
        )) : (
          <tr>
            <td colSpan="5">No allocations found</td>
          </tr>
        )}
      </tbody>
    </table>
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
            <td>
              <button onClick={() => handleTransactionSelect(transaction)}>Select</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const Map = ({ allocation, transaction }) => {
    useEffect(() => {
      if (allocation) {
        renderMarkersAndRoute(allocation);
      }
      if (transaction) {
        renderMarkers(transaction);
        renderRoute(transaction);
      }
    }, [allocation, transaction]);

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 40.7128, lng: -74.006 }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          mapsRef.current = maps;
          if (allocation) {
            renderMarkersAndRoute(allocation);
          }
          if (transaction) {
            renderMarkers(transaction);
            renderRoute(transaction);
          }
        }}
      />
    );
};

  if (!currentUser) {
    console.log('Current user is null, showing loading...');
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.allocationTableContainer}>
        {renderAllocationsTable()}
        {renderTransactionsTable()}
      </div>
      <section className={styles.mapSection}>
        <div style={{ height: '400px', width: '100%' }}>
          {selectedAllocation ? (
            <Map key={selectedAllocation._id} allocation={selectedAllocation} />
          ) : selectedTransaction ? (
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
