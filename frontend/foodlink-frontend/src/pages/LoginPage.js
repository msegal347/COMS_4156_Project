import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { loginUser } from '../services/api';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(loginData);
      const { role, token } = response.data;

      localStorage.setItem('token', token);

      switch (role) {
        case 'source':
          navigate('/source');
          break;
        case 'sink':
          navigate('/sink');
          break;
        case 'auditor':
          navigate('/auditor');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError('Invalid login credentials');
      console.error('Login error', err.response?.data || err.message);
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
          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;