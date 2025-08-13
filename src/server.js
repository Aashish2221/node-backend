const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from root .env
dotenv.config({ path: '.env' }); // Path from src/ to root .env

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/carts', require('./routes/carts'));
app.use('/api/orders', require('./routes/orders'));

// Basic route for testing
app.get('/', (req, res) => res.send('E-commerce API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));