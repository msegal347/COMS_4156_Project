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
        console.log('Raw materials data:', response.data); // Log raw data

        const aggregatedMaterials = response.data.map(material => {
          const totalQuantity = material.userResources.reduce((sum, userRes) => sum + userRes.quantity, 0);
          return { ...material, quantity: totalQuantity };
        });
        console.log('Aggregated materials:', aggregatedMaterials); // Log aggregated data
        setMaterials(aggregatedMaterials);
      } catch (error) {
        console.error('Error fetching materials', error);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    console.log('Current requests state:', requests); // Log requests state
  }, [requests]);

  const handleQuantityChange = (materialId, quantity) => {
    const material = materials.find(m => m._id === materialId);
    if (material) {
      // Ensure the quantity is within bounds
      const validQuantity = Math.max(0, Math.min(material.quantity, quantity));
      setRequests({ ...requests, [materialId]: validQuantity });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFeedbackMessage('');
    setIsError(false);
  
    const materialsArray = Object.entries(requests)
      .filter(([_, quantity]) => quantity > 0)
      .map(([materialId, quantity]) => ({
        materialId,
        quantity,
      }));
  
    try {
      await submitRequest(materialsArray);
  
      // Update the materials state to reflect the new quantities
      const updatedMaterials = materials.map(material => {
        const requestForThisMaterial = materialsArray.find(req => req.materialId === material._id);
        return requestForThisMaterial
          ? { ...material, quantity: material.quantity - requestForThisMaterial.quantity }
          : material;
      });
  
      setMaterials(updatedMaterials);
      setRequests({});
      setFeedbackMessage('Request submitted successfully');
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
            {materials.map(material => (
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
            ))}
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
