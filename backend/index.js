const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3010; // You can change the port if needed
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

connectDB();

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.use('/notes', noteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
