import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx'; 
import Signup from './pages/Signup.jsx';
import CartPage from './pages/CartPage.jsx'; // Import CartPage
import Services from './pages/Services.jsx';
import Stakeholders from './pages/Stakeholders.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stakeholders" element={<Stakeholders/>}/>
        <Route path="/cart" element={<CartPage />} /> {/* Add route for CartPage */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
