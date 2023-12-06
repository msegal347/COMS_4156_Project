import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import RegistrationPage from './pages/RegistrationPage';
import LandingPage from './pages/LandingPage';
import SourcePage from './pages/SourcePage';
import SinkPage from './pages/SinkPage';
import AuditorPage from './pages/AuditorPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import Navigation from './pages/Navigation';
import LoginPage from './pages/LoginPage';


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/source" element={<SourcePage />} />
          <Route path="/sink" element={<SinkPage />} />
          <Route path="/auditor" element={<AuditorPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
