import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const SalesManagement = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPurchases = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/purchase', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch purchase history');
      }

      const data = await res.json();
      setPurchases(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', color: '#4A5568', marginTop: '2.5rem' }}>Loading purchase history...</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#F56565', marginTop: '2.5rem' }}>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2D3748', marginBottom: '1.5rem', borderBottom: '2px solid #EDF2F7', paddingBottom: '0.5rem' }}>Purchase History</h2>
        {purchases.length === 0 ? (
          <p style={{ color: '#A0AEC0', textAlign: 'center' }}>No purchases found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#EDF2F7' }}>
                <th style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#4A5568' }}>Date</th>
                <th style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#4A5568' }}>Payment Method</th>
                <th style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#4A5568' }}>Total</th>
                <th style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#4A5568' }}>Items Purchased</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr key={index} style={{ backgroundColor: '#FFFFFF' }}>
                  <td style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#2D3748' }}>
                    {new Date(purchase.purchasedAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#2D3748' }}>
                    {purchase.paymentMethod}
                  </td>
                  <td style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#2D3748' }}>
                    ${purchase.totalAmount.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#2D3748' }}>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                      {purchase.cart.map((item, idx) => (
                        <li key={idx} style={{ color: '#4A5568', fontSize: '0.875rem' }}>
                          {item.name} — ${item.price} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesManagement;
