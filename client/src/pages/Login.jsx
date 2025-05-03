import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { username, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token); // Save the token in localStorage
        navigate('/services'); // Redirect to the services page
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error during login. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white', // Set background to white
        color: 'black', // Set font color to black
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '24px', color: 'black' }}>Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: 'black',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: 'black',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}