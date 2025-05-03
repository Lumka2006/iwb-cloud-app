import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const addToCart = async (service) => {
    if (!isLoggedIn) {
      alert('You need to sign up first!');
      navigate('/signup');
      return;
    }

    setCart((prevCart) => [...prevCart, service]);
    alert(`${service.name} added to cart!`);

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          id: service._id,
          name: service.name,
          price: service.price,
          img: service.img,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Something went wrong while adding the item to the cart. Please try again.');
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Custom styles with centered layout
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f5f8fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '30px',
      color: '#333',
    },
    topBar: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: '20px',
      maxWidth: '1200px',
    },
    controlsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    button: {
      backgroundColor: '#4a90e2',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      marginRight: '15px',
      transition: 'background-color 0.3s',
    },
    cartButton: {
      fontSize: '1.8rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
      width: '100%',
      maxWidth: '1200px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    cardHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    },
    image: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '15px',
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#222',
      textAlign: 'center',
    },
    price: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#555',
    },
    addButton: {
      backgroundColor: '#f39c12',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '1rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🛒 Shop Our Services</h1>

      {/* Top controls: login/logout */}
      <div style={styles.topBar}>
        <div style={styles.controlsContainer}>
          {isLoggedIn ? (
            <>
              <span style={{ marginRight: '10px', fontSize: '1rem', color: '#555' }}>You are logged in!</span>
              <button
                onClick={logout}
                style={{
                  ...styles.button,
                  backgroundColor: '#e74c3c',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '1rem',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                ...styles.button,
                backgroundColor: '#4a90e2',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '1rem',
              }}
            >
              Login
            </button>
          )}
          {/* Cart icon button */}
          <button
            onClick={() => navigate('/cart')}
            style={{
              ...styles.cartButton,
              marginLeft: '20px',
            }}
            aria-label="Cart"
          >
            🛒
          </button>
        </div>
      </div>

      {/* Services grid */}
      <div style={styles.grid}>
        {services.map((service) => (
          <div
            key={service._id}
            style={styles.card}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.cardHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, styles.card);
            }}
          >
            <img src={service.img} alt={service.name} style={styles.image} />
            <div style={styles.title}>{service.name}</div>
            <div style={styles.price}>M{service.price}</div>
            <button
              onClick={() => addToCart(service)}
              style={styles.addButton}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}