const mongoose = require("mongoose");
const connect = async () => {
  try {
    process.env.environment === "development"
      ? await mongoose.connect("mongodb://127.0.0.1:27017/practice", {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
        })
      : await mongoose.connect(
          process.env.myUrl.replace("<password>", process.env.myPassword),
          {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
          }
        );
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};
connect();
