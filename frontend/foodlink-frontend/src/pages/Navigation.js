import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const getActiveLinkStyle = ({ isActive }) => (isActive ? styles.active : '');

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
            Home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/login" className={getActiveLinkStyle}>
            Login
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/register" className={getActiveLinkStyle}>
            Register
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/dashboard" className={getActiveLinkStyle}>
            Dashboard
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/profile" className={getActiveLinkStyle}>
            Profile
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/source" className={getActiveLinkStyle}>
            Source
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/sink" className={getActiveLinkStyle}>
            Sink
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/auditor" className={getActiveLinkStyle}>
            Audit
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/admin" className={getActiveLinkStyle}>
            Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
