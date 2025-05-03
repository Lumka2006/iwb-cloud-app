import React, { useState } from 'react';

const ContactsPage = () => {
  const [showQueryForm, setShowQueryForm] = useState(false);

  const handleOpenQueryForm = () => setShowQueryForm(true);
  const handleCloseQueryForm = () => setShowQueryForm(false);

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', lineHeight: 1.6, color: '#333', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Accessibility Skip Link */}
      <a style={{
        position: 'absolute', top: -40, left: 0, background: '#333', color: '#fff',
        padding: '8px', zIndex: 1000, fontSize: '14px'
      }} href="#content">
        Skip to content
      </a>

      {/* Main Content */}
      <main id="content" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#007bff', fontSize: '2.5rem' }}>Contact Us</h1>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center'
        }}>
          {/* Contact Info Card */}
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

      {/* Query Form Modal */}
      {showQueryForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#ffffff', padding: '30px 40px', borderRadius: '10px',
            maxWidth: '500px', width: '90%', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ marginBottom: '25px', fontSize: '1.75rem', color: '#333' }}>Submit Your Query</h2>
            <form>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Name</label>
                <input type="text" placeholder="Your full name" style={{
                  width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc',
                  fontSize: '1rem'
                }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Email</label>
                <input type="email" placeholder="your@email.com" style={{
                  width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc',
                  fontSize: '1rem'
                }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Message</label>
                <textarea rows={4} placeholder="Your message..." style={{
                  width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc',
                  fontSize: '1rem', resize: 'vertical'
                }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}>
                  Submit
                </button>
                <button type="button" onClick={handleCloseQueryForm} style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
