const express = require("express");
const router = express.Router();

const {
  checkUsername,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
} = require("../controllers/userController");

// Username availability
router.get("/check-username/:username", checkUsername);

// Register
router.post("/register", registerUser);

// Get all users
router.get("/", getUsers);

// Get one user
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

// Reset password
router.put("/reset-password/:id", resetPassword);

module.exports = router;