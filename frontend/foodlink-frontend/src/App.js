import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" element={<RegistrationPage />} />
        <ProtectedRoute path="/source" component={SourcePage} roles={['source', 'admin']} />
        <ProtectedRoute path="/sink" component={SinkPage} roles={['sink', 'admin']} />
        <ProtectedRoute path="/auditor" component={AuditorPage} roles={['auditor', 'admin']} />
        <ProtectedRoute path="/admin" component={AdminPage} roles={['admin']} />
        <ProtectedRoute path="/profile" component={ProfilePage} roles={['source', 'sink', 'auditor', 'admin']} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} roles={['source', 'sink', 'auditor', 'admin']} />
        {/* other routes */}
      </Routes>
    </Router>
  );
};

export default App;
