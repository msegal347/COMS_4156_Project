// src/pages/AuditorPage.js
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const AuditorPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    materials: [],
    transfers: [],
    // Add more analytics data as needed
  });

  const [locations, setLocations] = useState([]);

  // Chart data and options
  const materialsChartData = {
    labels: analyticsData.materials.map((data) => data.name),
    datasets: [
      {
        label: 'Quantity',
        data: analyticsData.materials.map((data) => data.quantity),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const transfersChartData = {
    labels: analyticsData.transfers.map((data) => data.material),
    datasets: [
      {
        label: 'Quantity',
        data: analyticsData.transfers.map((data) => data.quantity),
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
        // Replace with the actual API endpoint to fetch analytics data
        const materialsResponse = await axios.get('http://localhost:3001/api/analytics/materials');
        const transfersResponse = await axios.get('http://localhost:3001/api/analytics/transfers');
        // Fetch more analytics data as needed
        setAnalyticsData({
          materials: materialsResponse.data,
          transfers: transfersResponse.data,
          // Set more analytics data here
        });
      } catch (error) {
        console.error('Error fetching analytics data', error);
      }
    };

    const fetchLocations = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/locations'); // Update with the actual API endpoint
          setLocations(response.data); // Expecting data in the form [{ lat: Number, lng: Number, name: String }]
        } catch (error) {
          console.error('Error fetching location data', error);
        }
      };

    fetchAnalyticsData();
    fetchLocations();
  }, []);

  const renderMarkers = (map, maps) => {
    locations.forEach(location => {
      new maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name
      });
    });
  };

    // Define the map component with markers
    const MapWithMarkers = () => (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }} // Replace with your API key
          defaultCenter={{ lat: 59.95, lng: 30.33 }} // Update this with a central position
          defaultZoom={8}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
          {/* If using custom markers */}
          {locations.map((location, index) => (
            <AnyReactComponent
              key={index}
              lat={location.lat}
              lng={location.lng}
              text={location.name}
            />
          ))}
        </GoogleMapReact>
      );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Auditor Analytics</h1>
      
      {/* Materials Chart */}
      <h2 className={styles.subtitle}>Material Quantities</h2>
      <div className={styles.chartContainer}>
        <Bar data={materialsChartData} options={chartOptions} />
      </div>

      {/* Transfers Chart */}
      <h2 className={styles.subtitle}>Transferred Material Quantities</h2>
      <div className={styles.chartContainer}>
        <Bar data={transfersChartData} options={chartOptions} />
      </div>

      <div style={{ height: '400px', width: '100%' }}>
        <MapWithMarkers />
      </div>
    
    </div>
  );
};

export default AuditorPage;
