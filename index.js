const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for all origins (if you want to allow all domains)
app.use(cors());

// Optionally, configure CORS to allow specific domains:
/*
app.use(cors({
  origin: 'https://your-frontend-domain.com', // Allow only this domain
  methods: 'GET,POST', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
}));
*/

// Connect to MongoDB
connectDB();

// Serve static files
app.use("/qr-codes", express.static("public/qr-codes"));

// API Routes
app.use("/api/users", userRoutes);

// Export the app as a serverless function
// module.exports = (req, res) => {
//   app(req, res); // Forward the request to the express app
// };

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
