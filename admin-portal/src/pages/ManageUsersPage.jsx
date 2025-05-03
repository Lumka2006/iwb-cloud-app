import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://iwb-cloud-app.onrender.com/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching users.');
    }
  };

  const changeRole = async (userId, newRole) => {
    try {
      const response = await fetch(`https://iwb-cloud-app.onrender.com/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await response.json();
      if (response.ok) {
        fetchUsers(); // refresh user list
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error updating role');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`https://iwb-cloud-app.onrender.com/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        fetchUsers();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error deleting user');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Manage Users 👥</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'grey' }}>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>Username</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>Email</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>Role</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ textAlign: 'center', backgroundColor: 'grey' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{user.username}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{user.role}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                  <select
                    style={{
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '1rem',
                    }}
                    value={user.role}
                    onChange={(e) => changeRole(user._id, e.target.value)}
                  >
                    <option value="sales">sales</option>
                    <option value="finance">finance</option>
                    <option value="developer">developer</option>
                    <option value="investor">investor</option>
                    <option value="partner">partner</option>
                    <option value="admin">admin</option>
                  </select>
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{
                      backgroundColor: '#e53e3e',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      marginLeft: '1rem',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
