//Require axios to make API calls
const axios = require("axios");
const expressAsyncHandler = require("express-async-handler");

const BASE_URL = "https://api.unsplash.com";

const getPhotos = expressAsyncHandler(async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photos = response.data;
    const photosArray = photos.map((photo) => {
      return photo.urls.raw;
    });
    res.status(200).json(photosArray);
  } catch (error) {
    res.status(500).json("Server error. Please try again later.");
  }
});

// example id: qfWMUXDcN18
const getPhotoById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${BASE_URL}/photos/${id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photo = response.data;
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json("Server error. Please try again later.");
  }
});

module.exports = { getPhotos, getPhotoById };
