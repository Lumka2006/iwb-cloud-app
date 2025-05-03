import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = { username, email, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! Please log in.');
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error during signup. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        color: 'black',
        minHeight: '100vh', // make sure background covers full viewport height
        padding: '20px',
        fontFamily: 'Arial, sans-serif', // optional: set a nice font
      }}
    >
      <h1 style={{ color: 'black' }}>Sign Up</h1>
      {isLoggedIn ? (
        <div>
          <h2 style={{ color: 'black' }}>You are already logged in!</h2>
          <p style={{ color: 'black' }}>
            Already signed up? <button onClick={handleLoginRedirect}>Login</button>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Sign Up
          </button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}