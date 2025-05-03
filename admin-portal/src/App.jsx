import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard.jsx';
import AddService from './pages/AddService';
import QueriesPage from './pages/QueriesPage';
import ManageUsersPage from './pages/ManageUsersPage.jsx';
import SalesManagement from './pages/SalesManagement.jsx';
import Income from './pages/Income.jsx';
import ViewIncomeStatement from './pages/ViewIncomeStatement.jsx';




const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route path="/manage-service" element={<AddService />} />
        <Route path="/queries" element={<QueriesPage />} />
        <Route path="/sales" element={<SalesManagement />} />
        <Route path="/income" element={<Income />} />
        <Route path="/view-income" element={<ViewIncomeStatement />} />




      </Routes>
    </Router>
  );
};

export default App;
