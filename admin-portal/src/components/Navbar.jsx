import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  // If on the home or register page, return null
  if (location.pathname === '/' || location.pathname === '/register') return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const renderMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return <li><button onClick={() => navigate('/manage-users')} style={linkStyle}>Manage Users</button></li>;

      case 'sales':
        return (
          <>
            <li><button onClick={() => navigate('/sales')} style={linkStyle}>View Sales</button></li>
            <li><button onClick={() => navigate('/queries')} style={linkStyle}>Manage Queries</button></li>
            <li><button onClick={() => navigate('/manage-service')} style={linkStyle}>Add Service</button></li>
          </>
        );

      case 'finance':
        return <li><button onClick={() => navigate('/income')} style={linkStyle}>Income Statement</button></li>;

      case 'developer':
        return(
            <>
                <li><button onClick={() => navigate('/sales')} style={linkStyle}>View Sales</button></li>
                <li><button onClick={() => navigate('/income')} style={linkStyle}>Income Reports</button></li>
                <li><button onClick={() => navigate('/queries')} style={linkStyle}>Manage Queries</button></li>
                <li><button onClick={() => navigate('/manage-service')} style={linkStyle}>Add Service</button></li>
            </>
        );

      case 'investor':
        return <li><button onClick={() => navigate('/view-income')} style={linkStyle}>View Reports</button></li>;

      case 'partner':
        return (
          <>
            <li><button onClick={() => navigate('/sales')} style={linkStyle}>View Sales</button></li>
            <li><button onClick={() => navigate('/income')} style={linkStyle}>Income Reports</button></li>
            <li><button onClick={() => navigate('/queries')} style={linkStyle}>Manage Queries</button></li>
            <li><button onClick={() => navigate('/manage-service')} style={linkStyle}>Add Service</button></li>
          </>
        );

      default:
        return <p className="text-red-500 font-semibold">Unauthorized</p>;
    }
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#000080', color: 'white' }}>
      <h2 style={{ margin: 0, fontSize: '24px' }}>IWB Admin Portal</h2>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0 }}>
        {renderMenuItems()}
        <li>
          <button onClick={handleLogout} style={linkStyle}>🔒 Logout</button>
        </li>
      </ul>
    </nav>
  );
}
