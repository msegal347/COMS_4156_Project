import React, { useState, useEffect } from 'react';
import { getResources, submitRequest } from '../services/api';
import styles from './SinkPage.module.css';

const SinkPage = () => {
  const [materials, setMaterials] = useState([]);
  const [requests, setRequests] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getResources();
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
    setFeedbackMessage('');
    setIsError(false);

    try {
      await submitRequest(requests);
      setFeedbackMessage('Request submitted successfully');
      setRequests({});
    } catch (error) {
      console.error('Error submitting requests', error);
      setFeedbackMessage('Error submitting requests');
      setIsError(true);
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
                <tr key={material._id}>
                  <td>{material.category}</td>
                  <td>{material.quantity}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={material.quantity}
                      value={requests[material._id] || ''}
                      onChange={e => handleQuantityChange(material._id, e.target.value)}
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
        {feedbackMessage && (
          <div className={isError ? styles.errorMessage : styles.successMessage}>
            {feedbackMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default SinkPage;
