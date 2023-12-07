import React, { useState } from 'react';
import styles from './SourcePage.module.css';
import { createResource } from '../services/api';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

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