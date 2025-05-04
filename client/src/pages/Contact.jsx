import React, { useState } from 'react';
import QueryForm from '../components/QueryForm';

const ContactsPage = () => {
  const [showQueryForm, setShowQueryForm] = useState(false);

  const handleOpenQueryForm = () => setShowQueryForm(true);
  const handleCloseQueryForm = () => setShowQueryForm(false);

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      {/* Accessibility Skip Link */}
      <a style={{
        position: 'absolute', top: -40, left: 0, background: '#333', color: '#fff',
        padding: '8px', zIndex: 1000, fontSize: '14px'
      }} href="#content">
        Skip to content
      </a>

      {/* Main Content */}
      <main id="content" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#007bff', fontSize: '2.5rem' }}>
          Contact Us
        </h1>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center'
        }}>
          <div style={{
            flex: '1 1 400px',
            background: '#ffffff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', color: '#333' }}>
              <strong>Our Contact Details</strong>
            </h2>
            <ul style={{ paddingLeft: '20px', listStyleType: 'circle' }}>
              <li>Email: <a href="mailto:lumkamdandalaza@gmail.com" style={{ color: '#007bff', textDecoration: 'none' }}>lumkamdandalaza@gmail.com</a></li>
              <li>Phone: <a href="tel:+26659874567" style={{ color: '#007bff', textDecoration: 'none' }}>+266 5987 4567</a></li>
              <li><strong>Address:</strong></li>
              <li>Khubetsoana</li>
              <li>Maseru, Lesotho</li>
              <li>Postal Code: 100</li>
            </ul>
            <div style={{ marginTop: '25px' }}>
              <button
                onClick={handleOpenQueryForm}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s'
                }}
              >
                Send a Query
              </button>
            </div>
          </div>
        </div>
      </main>

      {showQueryForm && <QueryForm onClose={handleCloseQueryForm} />}
    </div>
  );
};

export default ContactsPage;
