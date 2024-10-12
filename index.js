const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');

// Connect to the database
connectDb();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use('/api/user', require('./routes/userRoutes'));
//admin routes
app.use("/api/admin", require("./routes/adminRoutes")); 

// Start the server
app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
