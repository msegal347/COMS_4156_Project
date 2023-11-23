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
//import ProtectedRoute from './pages/ProtectedRoute';

//const App = () => {
//return (
//<Router>
//<Navigation />
//<Routes>
//<Route path="/" element={<LandingPage />} />
//<Route path="/login" element={<LoginPage />} />
//<Route path="/register" element={<RegistrationPage />} />
//<Route
//path="/source"
//element={
//<ProtectedRoute roles={['source', 'admin']}>
//<SourcePage />
//</ProtectedRoute>
//}
///>
//<Route
//path="/sink"
//element={
//<ProtectedRoute roles={['sink', 'admin']}>
//<SinkPage />
//</ProtectedRoute>
//}
///>
//<Route
//path="/auditor"
//element={
//<ProtectedRoute roles={['auditor', 'admin']}>
//<AuditorPage />
//</ProtectedRoute>
//}
///>
//<Route
//path="/admin"
//element={
//<ProtectedRoute roles={['admin']}>
//<AdminPage />
//</ProtectedRoute>
//}
///>
//<Route
//path="/profile"
//element={
//<ProtectedRoute roles={['source', 'admin', 'sink', 'auditor']}>
//<ProfilePage />
//</ProtectedRoute>
//}
///>
//<Route
//path="/dashboard"
//element={
//<ProtectedRoute roles={['source', 'admin', 'sink', 'auditor']}>
//<DashboardPage />
//</ProtectedRoute>
//}
///>
//</Routes>
//</Router>
//);
//};

//export default App;

const App = () => {
  return (
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
        {/* other routes */}
      </Routes>
    </Router>
  );
};

export default App;
