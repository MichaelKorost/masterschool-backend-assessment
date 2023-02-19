const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Blacklist = require("../models/blacklistModel");

// protect route middleware
const protect = asyncHandler(async (req, res, next) => {
  // check for token in headers
  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : null;
  const blacklistedToken = await Blacklist.findOne({ token });

  if (!token) {
    // if no token was found
    res.status(401).json({ message: "Not authorized, no token found" });
  }

  if (blacklistedToken) {
    res.status(500).json({ message: "Token has been blacklisted" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    // Get user from the token
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
