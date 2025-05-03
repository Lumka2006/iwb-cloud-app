import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const navigate = useNavigate();

  // Fetch cart items on mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('https://iwb-cloud-app.onrender.com/api/cart', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          const cartItems = await response.json();
          setCart(cartItems);
          calculateTotal(cartItems);
        } else {
          alert('Failed to load cart items');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Something went wrong while fetching the cart.');
      }
    };
    fetchCartItems();
  }, []);

  // Recalculate total when cart updates
  useEffect(() => {
    calculateTotal(cart);
  }, [cart]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch(`https://iwb-cloud-app.onrender.com/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setCart(prev => prev.filter(item => item._id !== itemId));
      } else {
        alert('Failed to remove item');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Error occurred while removing item');
    }
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method!');
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://iwb-cloud-app.onrender.com/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cart, paymentMethod: selectedPaymentMethod, totalAmount }),
      });
      if (response.ok) {
        alert('Purchase successful!');
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
        navigate('/');
      } else {
        const error = await response.json();
        alert(`Purchase failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Something went wrong. Please try again!');
    }
  };

  const fetchPurchaseHistory = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('https://iwb-cloud-app.onrender.com/api/purchase/history', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const history = await response.json();
        setPurchaseHistory(history);
        setShowHistory(true);
      } else {
        alert('Failed to fetch purchase history.');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      alert('Something went wrong fetching history.');
    }
  };

  // Styles object for centered layout and consistent design
  const styles = {
    container: {
      width: '1200px',
      margin: '0 auto',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'grey',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    header: {
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '30px',
    },
    cartGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      width: '100%',
      justifyContent: 'center',
    },
    cartItem: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    cartImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    cartTitle: {
      marginTop: '10px',
      textAlign: 'center',
    },
    removeButton: {
      marginTop: '10px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '10px',
      cursor: 'pointer',
    },
    totalSection: {
      marginTop: '50px',
      width: '100%',
      maxWidth: '500px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    totalAmount: {
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
    paymentOptions: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
      width: '100%',
    },
    paymentLabel: {
      margin: '8px 0',
      width: '100%',
      textAlign: 'center',
    },
    proceedButton: {
      backgroundColor: 'green',
      color: 'white',
      padding: '15px 30px',
      fontSize: '1.2rem',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      width: '200px',
      textAlign: 'center',
    },
    historyButtonContainer: {
      marginTop: '30px',
      textAlign: 'center',
    },
    historyButton: {
      backgroundColor: 'darkgrey',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
    },
    historyContainer: {
      marginTop: '40px',
      width: '100%',
      maxWidth: '1000px',
      padding: '0 20px',
    },
    historyTitle: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    purchaseCard: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      backgroundColor: '#e0e0e0',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🛒 Your Cart</h1>
      {/* Cart Items Grid */}
      <div style={styles.cartGrid}>
        {cart.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No items in cart.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <img src={item.img} alt={item.name} style={styles.cartImage} />
              <div style={styles.cartTitle}>{item.name}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>M{item.price}</div>
              <button
                style={styles.removeButton}
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Show Purchase History Button */}
      <div style={styles.historyButtonContainer}>
        <button style={styles.historyButton} onClick={fetchPurchaseHistory}>
          Show Purchase History
        </button>
      </div>

      {/* Purchase History */}
      {showHistory && (
        <div style={styles.historyContainer}>
          <h2 style={styles.historyTitle}>📦 Purchase History</h2>
          {purchaseHistory.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No purchase history found.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              {purchaseHistory.map((purchase, index) => (
                <div key={index} style={styles.purchaseCard}>
                  <p>
                    <strong>Date:</strong> {new Date(purchase.purchasedAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Method:</strong> {purchase.paymentMethod}
                  </p>
                  <p>
                    <strong>Total:</strong> M{purchase.totalAmount}
                  </p>
                  <p>
                    <strong>Items:</strong>
                  </p>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {purchase.cart.map((item, idx) => (
                      <li key={idx}>{item.name} - M{item.price} - Qty: {item.quantity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Total & Payment Section */}
      {cart.length > 0 && (
        <div style={styles.totalSection}>
          <div style={styles.totalAmount}>Total: M{totalAmount}</div>
          
          {/* Payment Methods */}
          <div style={styles.paymentOptions}>
            <h3 style={{ marginBottom: '10px' }}>Select Payment Method</h3>
            {['Credit Card', 'PayPal', 'Bank Transfer'].map((method) => (
              <label key={method} style={styles.paymentLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={selectedPaymentMethod === method}
                  onChange={handlePaymentMethodChange}
                /> {method}
              </label>
            ))}
          </div>
          
          {/* Proceed Button */}
          <button style={styles.proceedButton} onClick={handleCheckout}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}