import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful!');
      navigate('/login');
    } else {
      alert('Registration failed: ' + data.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        width: '100%',
        maxWidth: '480px',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.75rem',
          color: '#444',
        }}>Create Account ✨</h2>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="sales">Sales</option>
              <option value="finance">Finance</option>
              <option value="developer">Developer</option>
              <option value="investor">Investor</option>
              <option value="partner">Partner</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              padding: '0.9rem',
              background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem',
              transition: 'opacity 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
