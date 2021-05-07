const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const Todo = require("./Todos");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "todo",
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.findByEmailAndPassword = async (email, password) => {
  let userObj = null;
  return new Promise(async (resolve, reject) => {
    try {
      userObj = await User.findOne({ email });
      const isMatched = bcrypt.compare(password, userObj.password);
      isMatched ? resolve(userObj) : reject("Incorrect credentials");
    } catch (err) {
      reject(err.message);
    }
  });
};

userSchema.pre("save", async (next) => {
  let user = this;
  if (user.isModified("password")) {
    try {
      const password = await bcrypt.hash(user.password, 10);
      user.password = password;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.pre("delete", async (next) => {
  try {
    await Todo.deleteMany({ user: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;
