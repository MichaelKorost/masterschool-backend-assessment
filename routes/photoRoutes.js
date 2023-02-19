const express = require("express");
const {
  getPhotos,
  getPhotoById,
  getPhotosByUser,
} = require("../controllers/photoController");

const router = express.Router();

router.get("/", getPhotos);
router.get("/:id", getPhotoById);
router.get("/user/:username", getPhotosByUser);

module.exports = router;
