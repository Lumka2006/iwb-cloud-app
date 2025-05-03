import { Link } from 'react-router-dom';

export default function Navbar() {
  // Common styles for links
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  // Hover handlers
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#444';
    e.target.style.color = '#fff';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = '#fff';
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#224', // darker background for a sleek look
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.16)', // subtle shadow
      }}
    >
      {/* Logo / Title */}
      <h2
        style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#fff', // white text
          letterSpacing: '1px',
        }}
      >
        IWB Recycling
      </h2>

      {/* Navigation Links */}
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '25px',
          margin: 0,
        }}
      >
        <li>
          <Link
            to="/"
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/stakeholders"
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Stakeholders
          </Link>
        </li>
      </ul>
    </nav>
  );
}