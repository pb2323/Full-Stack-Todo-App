const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practice", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};
connect();
