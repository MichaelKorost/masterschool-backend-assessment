const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addToFavorites,
  getFavorites,
  removeFavorite,
  editFavorite,
} = require("../controllers/favoritesController");

const router = express.Router();

router.post("/add", protect, addToFavorites);
router.get("/", protect, getFavorites);
router.route("/:id").put(protect, editFavorite).delete(protect, removeFavorite);
module.exports = router;
