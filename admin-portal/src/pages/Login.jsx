import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('https://iwb-cloud-app.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);
      navigate('/dashboard');
    } else {
      alert('Login failed: ' + data.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #f8f9fa, #e0eafc)',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        width: '100%',
        maxWidth: '420px',
        borderRadius: '16px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#333',
          fontSize: '1.75rem'
        }}>Welcome Back 👋</h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label htmlFor="username" style={{ fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                padding: '0.8rem',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '0.8rem',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '0.9rem',
              background: 'linear-gradient(to right, #4CAF50, #2e7d32)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #43a047, #1b5e20)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #4CAF50, #2e7d32)'}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.95rem' }}>
            Don’t have an account?{' '}
            <Link to="/register" style={{
              color: '#2e7d32',
              textDecoration: 'none',
              fontWeight: '600',
            }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
