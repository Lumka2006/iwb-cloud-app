import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import stringSimilarity from 'string-similarity';
import dotenv from 'dotenv';   

dotenv.config();  // Loads environment variables from .env file


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI and JWT Secret
const MONGO_URI = 'mongodb+srv://Lumka:LumkaMdandy%402006@cluster0.jna9oja.mongodb.net/IBW';
const JWT_SECRET = 'your_secret_key';
const EMAIL_USER='mdandalazalumka@gmail.com';
const EMAIL_PASS='hblx iozy eyps xyht';
VITE_API_URL = 'https://iwb-cloud-app.onrender.com';


// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Unified JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}


// Middleware: Authorize
function authorize(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}



// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: String,
  role: String
}, { timestamps: true });
const User = mongoose.model('User', userSchema);



app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password:hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});




// Login Route
app.post('/api/login', async (req, res) => {
const { username, password } = req.body;
const user = await User.findOne({ username });

if (!user || !await bcrypt.compare(password, user.password)) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
res.json({ token, role: user.role, username: user.username });
});



// GET /api/users
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    console.log('Fetched users:', users); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// PUT change user role (admin only)
app.put('/api/users/:userId/role', authenticateToken, authorize('admin'), async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.role = role; // Update user role
    await user.save();

    res.json({ message: 'User role updated successfully.', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating role.' });
  }
});

// DELETE user (admin only)
app.delete('/api/users/:userId', authenticateToken, authorize('admin'), async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user.' });
  }
});







//CLIENT

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});
const Service = mongoose.model('Service', serviceSchema);

// Cart Schema (fixed)
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  img: String,
});
const Cart = mongoose.model('Cart', cartSchema);

// CartItem Schema for embedding inside Purchase (optional, for stricter design)
const cartItemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  name: String,
  price: Number,
  img: String,
  quantity: { type: Number, default: 1 },
});
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Purchase Schema
const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
  cart: [cartItemSchema],
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});


const Purchase = mongoose.model('Purchase', purchaseSchema);


// Query Schema
const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'auto-resolved', 'resolved'], default: 'pending' },
  response: { type: String, default: '' },
});

const Query = mongoose.model('Query', querySchema);

const EmailLogSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  queryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Query', required: true },
  response: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});
const EmailLog= mongoose.model('EmailLog', EmailLogSchema);



const expenseSchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now }
});
const Expense = mongoose.model('Expense', expenseSchema);




// Register Route (Client Role)
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user with 'client' role
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: 'client'  // Set the role to 'client'
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login Route (Client Role)
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

  res.json({
    token,
    role: user.role,
    username: user.username,
  });
});


// API: Add Service
app.post('/api/services', async (req, res) => {
  const { name, price, img } = req.body;

  if (!name || !price || !img) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newService = new Service({ name, price, img });
    await newService.save();
    res.status(201).json({ message: 'Service added successfully!' });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// API: Get All Services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Update an existing service
app.put('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, img } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id, 
      { name, price, img }, 
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Error updating service' });
  }
});

//  Delete a service
app.delete('/api/services/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service' });
  }
});

// API: Add to Cart
app.post('/api/cart', async (req, res) => {
  const { id, name, price, img } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided, unauthorized' });
  }

  try {
    // Verify token and extract userId
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    if (!id || !name || !price || !img) {
      return res.status(400).json({ message: 'Missing item details.' });
    }
    
    // Check if item already in cart
    const existingItem = await Cart.findOne({ userId, id });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
    } else {
      const cartItem = new Cart({ userId, id, name, price, img });
      await cartItem.save();
    }

    const fullCart = await Cart.find({ userId });
    console.log(`Cart for user ${userId}:`, fullCart);

    res.status(201).json({ message: 'Item added to cart!' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// API: Get Cart Items (For Logged-in Users)
app.get('/api/cart', authenticateToken, async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided, unauthorized' });
  }

  try {
    // Verify token and extract userId
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Fetch the user's cart using their userId
    const cartItems = await Cart.find({ userId });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});
// Remove item from cart
app.delete('/api/cart/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    const item = await Cart.findOneAndDelete({ _id: itemId, userId });

    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// Purchase items in cart
app.post('/api/purchase', authenticateToken, async (req, res) => {
  const { paymentMethod } = req.body;
  const userId = req.user.id;

  if (!paymentMethod) {
    return res.status(400).json({ message: 'Payment method is required' });
  }

  try {
    // Get items from cart
    const cartItems = await Cart.find({ userId });
    console.log('Cart Items:', cartItems);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Map cart items to the cartItemSchema
    const items = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: item.quantity,
    }));

    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create purchase record
    const purchase = new Purchase({
      userId,
      cart: items,
      paymentMethod,
      totalAmount
    });

    await purchase.save();

    // Clear user's cart
    await Cart.deleteMany({ userId });

    res.status(201).json({ message: 'Purchase completed successfully!' });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ message: 'Failed to complete purchase' });
  }
});

// GET purchase history for the logged-in user
app.get('/api/purchase/history', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const purchases = await Purchase.find({ userId }).sort({ purchasedAt: -1 });
    res.json(purchases);
  } catch (error) {
    console.error('Fetch history error:', error);
    res.status(500).json({ message: 'Failed to fetch purchase history' });
  }
});
// GET /api/purchase/all - Get all purchases (admin or sales only)
app.get('/api/purchase', authenticateToken, async (req, res) => {
  try {
    // Optional: Only allow access to users with 'admin' or 'sales' roles
    if (!['sales', 'partner', 'developer'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const allPurchases = await Purchase.find().sort({ purchasedAt: -1 });

    console.log(`✅ Retrieved ${allPurchases.length} total purchases`);
    res.json(allPurchases);
  } catch (err) {
    console.error('❌ Error fetching all purchases:', err);
    res.status(500).json({ error: 'Failed to fetch all purchases' });
  }
});

// Route to get total income from purchases
app.get('/api/income', async (req, res) => {
  try {
    // Group income by year and month using purchaseDate
    const monthlyIncome = await Purchase.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$purchasedAt" } }, // e.g., "2024-05"
          totalIncome: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } } // Sort months ascending
    ]);

    res.json(monthlyIncome); // Return income grouped by month
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Save or update monthly expenses

// POST /api/expenses
app.post('/api/expenses', async (req, res) => {
  try {
    const { expenses } = req.body;

    if (!expenses || typeof expenses !== 'object') {
      return res.status(400).json({ error: 'Invalid expenses format.' });
    }

    // Convert { "Jan-2024": 500, ... } into an array of Expense documents
    const expenseEntries = Object.entries(expenses).map(([month, amount]) => {
      const parsedDate = new Date(`${month}-01`); // e.g. "Jan-2024-01"
      return { amount, date: parsedDate };
    });

    const saved = await Expense.insertMany(expenseEntries);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving expenses:', error);
    res.status(500).json({ error: 'Failed to save expenses.' });
  }
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const allExpenses = await Expense.find({});
    res.json(allExpenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/api/queries/send-response/:id', async (req, res) => {
  const { email, name, response } = req.body;
  const queryId = req.params.id;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: `Response to your query, ${name}`,
      text: `Dear ${name},\n\n${response}\n\nBest regards,\nSupport Team`,
    };

    await transporter.sendMail(mailOptions);

    // Optional: Save response and mark query as resolved in DB
    await Query.findByIdAndUpdate(queryId, {
      status: 'resolved',
      adminResponse: response,
      resolvedAt: new Date(),
    });

    res.status(200).json({ message: 'Email sent and query updated successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email and update query' });
  }
});
// POST /api/queries/auto-resolve/:id
app.post('/api/queries/auto-resolve/:id', async (req, res) => {
  const queryId = req.params.id;
  const { email, name, message } = req.body;

  try {
    // Log inputs to confirm they are correct
    console.log('Message:', message);
    
    // 1. Fetch resolved queries for similarity matching
    const resolvedQueries = await Query.find({ status: 'resolved' });
    const pastMessages = resolvedQueries.map(q => q.message).filter(msg => typeof msg === 'string'); // Ensure all messages are strings
    const pastResponses = resolvedQueries.map(q => q.adminResponse || q.response);

    console.log('Past Messages:', pastMessages); // Log past messages to ensure they are strings

    let autoResponse = `Thank you for reaching out, ${name}. Your query has been received and marked as resolved. If you need further assistance, feel free to reply to this email.`;

    // 2. Attempt similarity match
    if (pastMessages.length > 0) {
      const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(message, pastMessages);

      console.log('Best Match:', bestMatch); // Log the best match details

      if (bestMatch.rating >= 0.8) {
        autoResponse = pastResponses[bestMatchIndex];
      }
    }

    // 3. Send the auto-response via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"IWB Auto-Responder" <${EMAIL_USER}>`,
      to: email,
      subject: `Query Resolution - IWB Support`,
      text: `Dear ${name},\n\n${autoResponse}\n\nBest regards,\nIWB Support Team`,
    };

    await transporter.sendMail(mailOptions);

    // 4. Mark query as resolved with the auto response
    await Query.findByIdAndUpdate(queryId, {
      status: 'auto-resolved',
      adminResponse: autoResponse,
      resolvedAt: new Date(),
    });

    res.status(200).json({ message: 'Query auto-resolved with suggested response' });
  } catch (error) {
    console.error('Error in auto-resolve:', error);
    res.status(500).json({ error: 'Failed to auto-resolve query' });
  }
});



// Submit Query API Route
app.post('/api/queries', async (req, res) => {
  const { name, email, message } = req.body;

  // Check if required fields are provided
  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  if (!message) {
    return res.status(400).json({ message: 'Message is required.' });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    // Create a new query with status 'pending'
    const newQuery = new Query({ name, email, message, status: 'pending' });
    await newQuery.save();

    // Respond with success message without sending an auto-reply
    res.status(201).json({
      message: 'Query received and saved successfully. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ message: 'Error saving query' });
  }
});


// API Route: Update Query Status
app.patch('/api/queries/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;  // status can be 'read', 'resolved', or any other status

  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      { status },
      { new: true }  // This returns the updated document
    );
    if (!updatedQuery) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.status(200).json(updatedQuery);
  } catch (error) {
    console.error('Error updating query status:', error);
    res.status(500).json({ message: 'Error updating query status' });
  }
});
// API Route: Delete a Query
app.delete('/api/queries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuery = await Query.findByIdAndDelete(id);
    if (!deletedQuery) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.status(200).json({ message: 'Query deleted successfully' });
  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({ message: 'Error deleting query' });
  }
});
app.put('/api/queries/:id', (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  // Update the query with the response
  Query.findByIdAndUpdate(id, { response: response, status: 'resolved' }, { new: true })
    .then(updatedQuery => res.json(updatedQuery))
    .catch(err => res.status(500).json({ error: err.message }));
});


// API Route: Get All Queries
app.get('/api/queries', async (req, res) => {
  try {
    const queries = await Query.find(); // Fetch all queries
    res.status(200).json(queries);
  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).json({ message: 'Error fetching queries' });
  }
});
app.put('/api/queries/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'reviewed', 'resolved'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ message: 'Query not found.' });
    }

    res.status(200).json({ message: 'Query status updated.', query: updatedQuery });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status.' });
  }
});

// PUT endpoint to update response
app.put('/api/queries/:id', async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    // Find the query by ID and update its response and status
    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      { response, status: 'resolved' },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.json(updatedQuery);
  } catch (error) {
    console.error('Error updating query:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start Server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
