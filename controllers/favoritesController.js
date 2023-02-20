//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const FavoritePhoto = require("../models/favoritePhotoModel");
const mongoose = require("mongoose");

/* example
url: https://images.unsplash.com/photo-1674574124649-778f9afc0e9c?ixid=Mnw0MTE5ODl8MHwxfGFsbHwxfHx8fHx8Mnx8MTY3Njg0NjkyNg&ixlib=rb-4.0.3
description: a group of women standing next to each other
username: kai
explanation: this is my exaplanation
*/
const addToFavorites = asyncHandler(async (req, res) => {
  const { url, description, username, explanation } = req.body;

  if (!url || !description || !username || !explanation) {
    res.status(400).json({ message: "please fill all fields" });
  }

  const favorite = await FavoritePhoto.create({
    user: req.user._id,
    url,
    description,
    username,
    explanation,
  });
  res.status(201).json(favorite);
});

const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await FavoritePhoto.find({ user: req.user._id });
  if (favorites.length === 0) {
    res.status(404).json({ message: "no favorites were found for this user" });
  }
  res.status(200).json(favorites);
});

const removeFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "no id provided" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id provided" });
  }

  const favorite = await FavoritePhoto.findById(id);

  if (!favorite) {
    res.status(404).json({ message: "no favorite was found" });
  }

  if (!req.user) {
    res.status(401).json({ message: "User not logged in" });
  }

  // validating the logged user favoritePhoto ids match
  if (favorite.user.toString() !== req.user.id) {
    res.status(401).json({ message: "User not authorized" });
  }

  try {
    await favorite.remove();
    res.status(200).json({ id: id + " removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite" });
  }
});

const editFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid id provided");
  }

  if (!description) {
    res.status(400);
    throw new Error("Please fill description field");
  }

  const favorite = await FavoritePhoto.findById(id);

  if (!favorite) {
    res.status(404);
    throw new Error("No favorite found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not logged in");
  }

  // validating the logged user favoritePhoto ids match
  if (favorite.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedFavorite = await FavoritePhoto.findByIdAndUpdate(
    id,
    { description },
    { new: true }
  );
  res.status(200).json({ updatedFavorite });
});

module.exports = { addToFavorites, getFavorites, removeFavorite, editFavorite };
