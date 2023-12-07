import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './DashboardPage.module.css';
import { getAllocations, getUserById, getResourceCategoryById } from '../services/api';
import { useUser } from '../contexts/UserContext';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const DashboardPage = () => {
  const [allocations, setAllocations] = useState([]);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const { currentUser } = useUser();

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
      const userMap = new Map(userResponses
        .filter(u => u && u.data)  // Filter out null and undefined responses
        .map(u => [u.data._id, u.data]));

      const allocationsWithDetails = (await Promise.all(response.data.map(async allocation => {
        const sourceUser = userMap.get(allocation.sourceId._id);
        const sinkUser = userMap.get(allocation.sinkId._id);
        if (!sourceUser || !sinkUser) {
          console.warn(`User data missing in allocation ${allocation._id}`);
          return null;  // Skip this allocation if user data is missing
        }
        const resourceCategoryResponse = await getResourceCategoryById(allocation.resourceCategoryId);

        return {
          ...allocation,
          sourceName: sourceUser.name || 'Unknown',
          sinkName: sinkUser.name || 'Unknown',
          resourceCategoryName: resourceCategoryResponse.data.category || 'Unknown'
        };
      }))).filter(a => a);  // Filter out null allocations

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

  const renderAllocationsTable = () => (
    <table className={styles.allocationTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Source</th>
          <th>Sink</th>
          <th>Resource Category</th>
          <th>Allocated Quantity</th>
        </tr>
      </thead>
      <tbody>
        {allocations.length > 0 ? allocations.map(allocation => (
          <tr key={allocation._id} onClick={() => handleAllocationSelect(allocation)}>
            <td>{allocation._id}</td>
            <td>{allocation.sourceName}</td>
            <td>{allocation.sinkName}</td>
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

  const Map = ({ allocation }) => {
    useEffect(() => {
      console.log('Map useEffect triggered for allocation:', allocation);
      if (allocation) {
        renderMarkersAndRoute(allocation);
      }
    }, [allocation]);

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 40.7128, lng: -74.006 }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          mapsRef.current = maps;
          console.log('Google Maps API loaded');
          if (allocation) {
            renderMarkersAndRoute(allocation);
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
      <div className={styles.allocationTableContainer}>{renderAllocationsTable()}</div>
      <section className={styles.mapSection}>
        <div style={{ height: '400px', width: '100%' }}>
          {selectedAllocation ? (
            <Map key={selectedAllocation._id} allocation={selectedAllocation} />
          ) : (
            <Map key="default" />
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
