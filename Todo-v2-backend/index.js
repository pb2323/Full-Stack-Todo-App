const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
require("./db");
// app.use(express.static(path.resolve(__dirname, "../todo-v2-frontend/build")));
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(todoRoutes);

app.get("/", (req, res) => {
  res.json({});
});

app.listen(process.env.PORT || 1234, () => {
  console.log("Listening on port 1234");
});
