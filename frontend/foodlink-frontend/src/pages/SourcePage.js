import React, { useState } from 'react';
import styles from './SourcePage.module.css';
import { createResource } from '../services/api';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const SourcePage = () => {
  const [materialData, setMaterialData] = useState({
    category: '',
    quantity: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { currentUser } = useUser();

  const foodCategories = [
    'Fruits',
    'Vegetables',
    'Dairy',
    'Meat & Poultry',
    'Seafood',
    'Baked Goods',
    'Frozen Foods',
    'Deli Items',
    'Canned Goods',
    'Dry Goods & Pasta',
    'Snacks',
    'Beverages',
    'Condiments & Sauces',
    'Spices & Herbs',
    'Breakfast Foods',
    'Sweets & Chocolates',
    'Health Foods',
    'International Cuisine',
    'Baby Food',
    'Pet Food',
  ];

  const handleChange = e => {
    setMaterialData({ ...materialData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission initiated:', materialData);
    setFeedbackMessage('');
    setIsError(false);
  
    if (!currentUser || !currentUser.id) {
      console.log('No user is logged in or user ID is undefined');
      setFeedbackMessage('No user is logged in or user ID is undefined');
      setIsError(true);
      return;
    }
  
    const submissionData = {
      category: materialData.category,
      userResources: [
        {
          userId: currentUser.id,
          quantity: parseInt(materialData.quantity, 10),
        },
      ],
    };
    
  
    console.log('Submitting material data to API:', submissionData);
  
    try {
      const response = await createResource(submissionData);
      console.log('Submission response:', response);
      setFeedbackMessage('Material data submitted successfully');
      setMaterialData({ category: '', quantity: '' });
    } catch (error) {
      console.error('Error submitting material data', error);
      setFeedbackMessage('Error submitting material data');
      setIsError(true);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Material Submission</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label htmlFor="category">Food Category</label>
          <select
            id="category"
            name="category"
            value={materialData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {foodCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            value={materialData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>

        {feedbackMessage && (
          <div className={isError ? styles.errorMessage : styles.successMessage}>
            {feedbackMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default SourcePage;