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

// example user: susangkomen3day
const getPhotosByUser = expressAsyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const { data } = await axios.get(
      `${BASE_URL}/users/${username}/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const user = data.map((photo) => {
      return {
        id: photo.id,
        username: photo.user.username,
        description: photo?.description || "No description provided.",
        url: photo.urls.raw,
      };
    });
    res.status(200).json(user);
  } catch (error) {
    if (error.response) {
      res
        .status(error.response.status)
        .json({ message: error.response.data.errors });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ message: error.request });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ message: error.message });
    }
  }
});
module.exports = { getPhotos, getPhotoById, getPhotosByUser };
