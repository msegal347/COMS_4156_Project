import React, { useState, useEffect } from 'react';
import { getRoles } from '../services/roleService';
import axios from 'axios';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    address: '',
  });

  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRoles();
      setRoles(roles);
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/registration', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Registration error', error.response.data);
    }
  };

    return (
    <div className={styles.container}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className={styles.inputField}>
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
        </div>
        <div className={styles.inputField}>
            <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            {roles.map((role, index) => (
                <option key={index} value={role}>
                {role}
                </option>
            ))}
            </select>
        </div>
        {(formData.role === 'source' || formData.role === 'sink') && (
            <div className={styles.inputField}>
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            </div>
        )}
        <div className={styles.buttonContainer}>
            <button className={styles.submitButton} type="submit">Register</button>
        </div>
        </form>
    </div>
    );
}

export default RegistrationPage;
