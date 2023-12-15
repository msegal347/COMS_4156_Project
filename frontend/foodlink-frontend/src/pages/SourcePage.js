import React, { useState } from 'react';
import styles from './SourcePage.module.css';
import { createResource, triggerAllocationProcess } from '../services/api';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const resourceCategories = {
  '657229cd1dd539c82dbd5755': 'Fruits',
  '657229cd1dd539c82dbd5756': 'Vegetables',
  '657229cd1dd539c82dbd5757': 'Dairy',
  '657229cd1dd539c82dbd5758': 'Meat & Poultry',
  '657229cd1dd539c82dbd5759': 'Seafood',
  '657229cd1dd539c82dbd575a': 'Baked Goods',
  '657229cd1dd539c82dbd575b': 'Frozen Foods',
  '657229cd1dd539c82dbd575c': 'Deli Items',
  '657229cd1dd539c82dbd575d': 'Canned Goods',
  '657229cd1dd539c82dbd575e': 'Dry Goods & Pasta',
  '657229cd1dd539c82dbd575f': 'Snacks',
  '657229cd1dd539c82dbd5760': 'Beverages',
  '657229cd1dd539c82dbd5761': 'Condiments & Sauces',
  '657229cd1dd539c82dbd5762': 'Spices & Herbs',
  '657229cd1dd539c82dbd5763': 'Breakfast Foods',
  '657229cd1dd539c82dbd5764': 'Sweets & Chocolates',
  '657229cd1dd539c82dbd5765': 'Health Foods',
  '657229cd1dd539c82dbd5766': 'International Cuisine',
  '657229cd1dd539c82dbd5767': 'Baby Food',
  '657229cd1dd539c82dbd5768': 'Pet Food',
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

  const mapCategoryNameToId = categoryName => {
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

    try {
      const res = await triggerAllocationProcess();
      setFeedbackMessage('The resources have been reallocated');
    } catch (error) {
      console.error('Error reallocating data', error);
      setFeedbackMessage('Error reallocating data');
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
              <option key={index} value={category}>
                {category}
              </option>
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
