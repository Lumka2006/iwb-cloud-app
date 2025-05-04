import { useState } from 'react';

export default function QueryForm({ onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [autoReply, setAutoReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://iwb-cloud-app.onrender.com/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit query');
      }

      const data = await res.json();
      setAutoReply(data.autoReply || 'Thanks for reaching out! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setAutoReply('Submission failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Your full name"
              style={{
                width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="your@email.com"
              style={{
                width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Your message..."
              rows={4}
              style={{
                width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc',
                fontSize: '1rem', resize: 'vertical'
              }}
            ></textarea>
          </div>

          {autoReply && (
            <p style={{ marginBottom: '10px', fontStyle: 'italic', color: '#007bff' }}>{autoReply}</p>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
