import React from 'react';

export default function Home() {
  const containerStyle = {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f4f4f4',
  };

  const headingStyle = {
    fontSize: '2.25rem',
    fontWeight: 400,
    lineHeight: 1.2,
    color: '#111',
    marginBottom: '20px',
    padding: '1.25em 2.375em',
    backgroundColor: '#fff',
    display: 'inline-block',
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.6',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to IWB Recycling</h1>
      <p style={paragraphStyle}>
        We recycle RAM, Hard Drives, and Motherboard components for a sustainable future.
      </p>
    </div>
  );
}
