import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function AddService() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [services, setServices] = useState([]);
  const [editServiceId, setEditServiceId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = { name, price: Number(price), img };

    try {
      const response = editServiceId
        ? await fetch(`https://iwb-cloud-app.onrender.com/api/services/${editServiceId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newService),
          })
        : await fetch('https://iwb-cloud-app.onrender.com/api/services', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newService),
          });

      if (response.ok) {
        alert(editServiceId ? 'Service updated successfully!' : 'Service added successfully!');
        setName('');
        setPrice('');
        setImg('');
        setEditServiceId(null); // Reset the edit state
        fetchServices();  // Refresh the service list after adding or updating a service
      } else {
        const error = await response.json();
        alert(`Failed to ${editServiceId ? 'update' : 'add'} service: ${error.message}`);
      }
    } catch (error) {
      console.error(`Error ${editServiceId ? 'updating' : 'adding'} service:`, error);
      alert('Something went wrong.');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('https://iwb-cloud-app.onrender.com/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEdit = (service) => {
    setName(service.name);
    setPrice(service.price);
    setImg(service.img);
    setEditServiceId(service._id); // Set the service ID to edit
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://iwb-cloud-app.onrender.com/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Service deleted successfully!');
        fetchServices(); // Refresh the service list after deletion
      } else {
        const error = await response.json();
        alert(`Failed to delete service: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    fetchServices();  // Fetch services when component mounts
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {editServiceId ? 'Edit Service' : 'Add New Service'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            {editServiceId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <h3 style={{ marginTop: '30px' }}>Available Products</h3>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>Product Name</th>
              <th style={tableCellStyle}>Price</th>
              <th style={tableCellStyle}>Image</th>
              <th style={tableCellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr key={service._id}>
                  <td style={tableCellStyle}>{service.name}</td>
                  <td style={tableCellStyle}>${service.price}</td>
                  <td style={tableCellStyle}>
                    <img
                      src={service.img}
                      alt={service.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </td>
                  <td style={tableCellStyle}>
                    <button onClick={() => handleEdit(service)} style={actionButtonStyle('yellow')}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(service._id)} style={actionButtonStyle('red')}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={tableCellStyle}>No services available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Inline styling
const inputStyle = {
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  width: '100%',
};

const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const tableHeaderStyle = {
  backgroundColor: 'grey',
};

const tableCellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const actionButtonStyle = (color) => ({
  backgroundColor: color,
  color: color === 'yellow' ? 'black' : 'white',
  border: 'none',
  padding: '8px 16px',
  marginRight: '8px',
  cursor: 'pointer',
  borderRadius: '5px',
});
