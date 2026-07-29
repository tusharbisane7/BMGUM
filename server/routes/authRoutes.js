const express = require("express");

const router = express.Router();

const {
  login,
  userLogin,
  changePassword,
} = require("../controllers/authController");

router.post("/login", login);

router.post("/user-login", userLogin);

router.put("/change-password", changePassword);

module.exports = router;