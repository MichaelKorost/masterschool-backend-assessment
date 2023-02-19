const express = require("express");
const { getPhotos, getPhotoById } = require("../controllers/photoController");

const router = express.Router();

router.get("/", getPhotos);
router.get("/:id", getPhotoById);

module.exports = router;
