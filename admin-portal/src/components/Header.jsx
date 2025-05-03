// src/components/Header.js
import React from 'react';

const Header = () => {
  const headerStyle = {
    height: '60px',
    width: '100%',
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: '220px', // shift right because of Sidebar width
    right: 0,
    zIndex: 1000,
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>IWB Admin Portal</h1>
    </header>
  );
};

export default Header;
