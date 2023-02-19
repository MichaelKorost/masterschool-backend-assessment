const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/photos", require("./routes/photoRoutes"));

app.listen(process.env.PORT, async () => {
  console.log(`listening on port ${process.env.PORT}`);
});
