import { useState } from 'react';

export default function QueryForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [autoReply, setAutoReply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send query to backend
    const res = await fetch('http://localhost:5000/api/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error('Failed to submit query');
    }

    const data = await res.json();
    setAutoReply(data.autoReply); // Show auto-reply message after submitting
    setFormData({ name: '', email: '', message: '' }); // Clear form fields
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white', // Background white
        color: 'black', // Text color black
        padding: '20px', // optional padding for better appearance
        borderRadius: '8px', // optional border radius
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // optional shadow
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          color: 'black',
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          color: 'black',
        }}
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          height: '150px',
          backgroundColor: 'white',
          color: 'black',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>

      {autoReply && (
        <p style={{ marginTop: '10px', fontStyle: 'italic', color: '#555' }}>
          Auto-reply: {autoReply}
        </p>
      )}
    </form>
  );
}