import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>FoodLink</h1>
      <p className={styles.description}>
        Welcome to FoodLink, the platform that connects food sources with those in need. Whether you
        are looking to donate surplus food or seeking resources for your community, FoodLink makes
        it easy to link up and reduce food waste.
      </p>
      <Link to="/register" className={styles.registerButton}>
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
