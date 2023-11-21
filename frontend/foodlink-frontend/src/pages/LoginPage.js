import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', loginData);
      const { role, token } = response.data;

      localStorage.setItem('token', token);

      if (role === 'source') {
        Navigate('/source');
      } else if (role === 'sink') {
        Navigate('/sink');
      } else if (role === 'auditor') {
        Navigate('/auditor');
      } else if (role === 'admin') {
        Navigate('/admin');
      } else {
        Navigate('/');
      }
    } catch (error) {
      setError('Invalid login credentials');
      console.error('Login error', error.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttonContainer}>
          <button className={styles.submitButton} type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
