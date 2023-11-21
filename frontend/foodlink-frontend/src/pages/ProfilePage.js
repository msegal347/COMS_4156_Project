import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css'; // You'll create a corresponding CSS module for styling

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    // Initial state with placeholder properties
    name: '',
    email: '',
    address: '',
    // ...other profile fields
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with actual API call
        const profileData = await axios.get('/api/user/profile');
        setProfile(profileData.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with actual API call
      await axios.put('/api/user/profile', profile);
      // Add success notification
    } catch (error) {
      console.error('Error updating profile', error);
      // Add error notification
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>My Profile</h1>
      <form className={styles.profileForm} onSubmit={handleFormSubmit}>
        {/* Name field */}
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={profile.name}
          onChange={handleInputChange}
        />

        {/* Email field */}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleInputChange}
        />

        {/* Address field */}
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          name="address"
          type="text"
          value={profile.address}
          onChange={handleInputChange}
        />

        {/* ...other input fields */}

        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
