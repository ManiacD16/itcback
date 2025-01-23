const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve static files
app.use("/qr-codes", express.static("public/qr-codes"));

// API Routes
app.use("/api/users", userRoutes);

// Export the app as a serverless function
module.exports = (req, res) => {
  app(req, res); // Forward the request to the express app
};
