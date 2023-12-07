import React, { useState } from 'react';
import styles from './SourcePage.module.css';
import { createResource } from '../services/api';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const resourceCategories = {
  "6571e743f1b2729b8ad21a49": "Fruits",
  "6571e743f1b2729b8ad21a4a": "Vegetables",
  "6571e743f1b2729b8ad21a4b": "Dairy",
  "6571e743f1b2729b8ad21a4c": "Meat & Poultry",
  "6571e743f1b2729b8ad21a4d": "Seafood",
  "6571e743f1b2729b8ad21a4e": "Baked Goods",
  "6571e743f1b2729b8ad21a4f": "Frozen Foods",
  "6571e743f1b2729b8ad21a50": "Deli Items",
  "6571e743f1b2729b8ad21a51": "Canned Goods",
  "6571e743f1b2729b8ad21a52": "Dry Goods & Pasta",
  "6571e743f1b2729b8ad21a53": "Snacks",
  "6571e743f1b2729b8ad21a54": "Beverages",
  "6571e743f1b2729b8ad21a55": "Condiments & Sauces",
  "6571e743f1b2729b8ad21a56": "Spices & Herbs",
  "6571e743f1b2729b8ad21a57": "Breakfast Foods",
  "6571e743f1b2729b8ad21a58": "Sweets & Chocolates",
  "6571e743f1b2729b8ad21a59": "Health Foods",
  "6571e743f1b2729b8ad21a5a": "International Cuisine",
  "6571e743f1b2729b8ad21a5b": "Baby Food",
  "6571e743f1b2729b8ad21a5c": "Pet Food"
};


const SourcePage = () => {
  const [materialData, setMaterialData] = useState({
    category: '',
    quantity: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { currentUser } = useUser();

  const foodCategories = Object.values(resourceCategories);

  const handleChange = e => {
    setMaterialData({ ...materialData, [e.target.name]: e.target.value });
  };

  const mapCategoryNameToId = (categoryName) => {
    return Object.keys(resourceCategories).find(key => resourceCategories[key] === categoryName);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFeedbackMessage('');
    setIsError(false);

    const quantity = parseInt(materialData.quantity, 10);
    if (quantity < 0) {
      setFeedbackMessage('Quantity cannot be less than zero');
      setIsError(true);
      return;
    }
  
    if (!currentUser || !currentUser.id) {
      setFeedbackMessage('No user is logged in or user ID is undefined');
      setIsError(true);
      return;
    }
  
    const categoryId = mapCategoryNameToId(materialData.category);
  
    if (!categoryId) {
      setFeedbackMessage('Invalid category selected');
      setIsError(true);
      return;
    }
  
    // Adjust the structure of submission data to match backend expectations
    const submissionData = {
      categoryId, // The ID of the category
      quantity: parseInt(materialData.quantity, 10),
      userId: currentUser.id,
    };
  
    try {
      const response = await createResource(submissionData);
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
            min="0"
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