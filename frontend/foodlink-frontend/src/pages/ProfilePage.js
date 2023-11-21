import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
      await axios.put('/api/user/profile', profile);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>My Profile</h1>
      <form className={styles.profileForm} onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={profile.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleInputChange}
        />

        <label htmlFor="address">Address:</label>
        <input
          id="address"
          name="address"
          type="text"
          value={profile.address}
          onChange={handleInputChange}
        />

        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
