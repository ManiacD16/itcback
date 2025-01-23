const express = require("express");
const { registerUser, updateUser, getUserByAddress } = require("../controller/userController");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Update nickname or avatar
router.put("/update", updateUser);

// Get user by wallet address
router.get("/:address", getUserByAddress);

module.exports = router;
