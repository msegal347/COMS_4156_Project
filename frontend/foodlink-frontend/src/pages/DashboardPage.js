import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './DashboardPage.module.css';
import { getAllocations, getUsers } from '../services/api';
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
      const fetchAllocations = async () => {
        try {
          const response = await getAllocations();
          const allocationsWithDetails = await Promise.all(response.data.map(async allocation => {
            const sourceUser = await getUserById(allocation.sourceId);
            const sinkUser = await getUserById(allocation.sinkId);
            const resourceCategory = await getResourceCategoryById(allocation.resourceCategoryId);

            return {
              ...allocation,
              sourceName: sourceUser.data.name,
              sinkName: sinkUser.data.name,
              resourceCategoryName: resourceCategory.data.category
            };
          }));

          setAllocations(allocationsWithDetails.filter(allocation => 
            allocation.sourceId === currentUser.id || allocation.sinkId === currentUser.id
          ));
        } catch (error) {
          console.error('Error fetching allocations:', error);
        }
      };

      fetchAllocations();
    }
  }, [currentUser?.id]);
  

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
      const sourceResponse = await getUsers(allocation.sourceId);
      const sinkResponse = await getUsers(allocation.sinkId);

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
