const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to the Unsplash API!" });
});

app.listen(process.env.PORT, async () => {
  console.log(`listening on port ${process.env.PORT}`);
});
