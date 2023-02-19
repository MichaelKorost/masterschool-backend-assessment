const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

module.exports = router;
