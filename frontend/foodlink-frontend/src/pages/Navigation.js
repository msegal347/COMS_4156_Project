import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'; 

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" exact activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/register" activeClassName={styles.active}>
            Register
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/dashboard" activeClassName={styles.active}>
            Dashboard
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/profile" activeClassName={styles.active}>
            Profile
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/source" activeClassName={styles.active}>
            Source
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/sink" activeClassName={styles.active}>
            Sink
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/auditor" activeClassName={styles.active}>
            Audit
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/admin" activeClassName={styles.active}>
            Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
