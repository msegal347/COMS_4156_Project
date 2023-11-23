// src/pages/SinkPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SinkPage.module.css';

const SinkPage = () => {
  const [materials, setMaterials] = useState([]);
  const [requests, setRequests] = useState({});

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/materials');
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleQuantityChange = (materialId, quantity) => {
    setRequests({ ...requests, [materialId]: quantity });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/requests', { requests });
    } catch (error) {
      console.error('Error submitting requests', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Material Requests</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <table className={styles.materialsTable}>
          <thead>
            <tr>
              <th>Material</th>
              <th>Available Quantity</th>
              <th>Request Quantity</th>
            </tr>
          </thead>
          <tbody>
            {materials.length > 0 ? (
              materials.map(material => (
                <tr key={material.id}>
                  <td>{material.name}</td>
                  <td>{material.availableQuantity}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={material.availableQuantity}
                      value={requests[material.id] || ''}
                      onChange={e => handleQuantityChange(material.id, e.target.value)}
                      className={styles.quantityInput}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.noAvailable}>
                  No materials available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button type="submit" className={styles.submitButton}>
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default SinkPage;
