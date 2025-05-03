// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    console.log("User role:", role); 
    if (!role) {
      navigate('/');
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
       <Navbar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Welcome to IWB Admin Portal 🚀</h1>
        <p className="text-lg text-gray-600 text-center">Select an option from the navbar 📑</p>
      </div>
    </div>
  );
}
