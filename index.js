const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const cors = require("cors");

// Connect to the database
connectDb();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json());

// User routes
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.use('/api/user', require('./routes/userRoutes'));
//admin routes
app.use("/api/admin", require("./routes/adminRoutes")); 

// Start the server
app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
