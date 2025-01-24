const User = require("../models/user");
const { generateAvatarUrl } = require("../services/avatarService");
const { generateQRCode } = require("../services/qrCodeService");
const { generateUniqueNickname } = require("../services/nicknameService");
const dotenv = require("dotenv");
const { ethers } = require("ethers");
const Web3 = require("web3");
dotenv.config();

const { INFURA_API_URL, CONTRACT_ADDRESS } = process.env;
const CONTRACT_ABI = require("../config/contractABI.json");

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_API_URL));
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Register user
const registerUser = async (req, res) => {
  const { address } = req.body;

  try {
    if (!ethers.utils.isAddress(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    const isRegistered = await contract.methods.users(address).call();
    if (!isRegistered.isActive) {
      return res
        .status(400)
        .json({ error: "User not registered in the smart contract" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ address });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }
    // Generate nickname, avatar, and QR code
    const nickname = generateUniqueNickname();
    const avatarUrl = generateAvatarUrl(address);
    const qrCodePath = await generateQRCode(address);

    // Save user to database
    const user = new User({
      address,
      nickname,
      avatar: avatarUrl,
      referralQR: qrCodePath,
    });
    await user.save();

    return res
      .status(200)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error registering user" });
  }
};

// Update user nickname
const updateUser = async (req, res) => {
  const { address, nickname } = req.body;

  try {
    const user = await User.findOne({ address });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update nickname and/or avatar
    if (nickname) user.nickname = nickname;

    await user.save();

    return res
      .status(200)
      .json({ message: "User updated successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating user" });
  }
};

const getUserByAddress = async (req, res) => {
  const { address } = req.params;

  try {
    // Validate Ethereum address
    if (!ethers.utils.isAddress(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    // Query the database (case-insensitive)
    const user = await User.findOne({
      address: { $regex: new RegExp(`^${address}$`, "i") }, // Case-insensitive query
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.error("🚀 ~ Error:", error);
    return res.status(500).json({ error: "Error fetching user data" });
  }
};

module.exports = { registerUser, updateUser, getUserByAddress };
