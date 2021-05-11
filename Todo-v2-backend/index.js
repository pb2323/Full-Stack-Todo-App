const express = require("express");
const app = express();
const cors = require("cors");
require("./db");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(todoRoutes);

app.get("/", (req, res) => {
  res.json({});
});

app.listen(1234, () => {
  console.log("Listening on port 1234");
});
