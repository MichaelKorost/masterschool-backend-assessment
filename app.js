const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/photos", require("./routes/photoRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/favorites", require("./routes/favoritesRoutes"));

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  console.log(`listening on port ${process.env.PORT}`);
});
