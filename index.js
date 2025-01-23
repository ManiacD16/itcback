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
app.use("/qr-codes", express.static("qr-codes"));

// API Routes
app.use("/api/users", userRoutes);

// Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
