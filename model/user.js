const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Input your name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please Input your email"],
    unique: [true, "This email already exist!"],
  },
  password: {
    type: String,
    min: [6, "The password should not be less than 6 characters"],
    max: [10, "The password should not be more than 10 Characters"],
    required: [true, "Please Input your password!"],
  },
  passwordConfirm: {
    type: String,
    min: [6, "The password should not be less than 6 characters"],
    max: [10, "The password should not be more than 10 Characters"],
    required: [true, "Please Input your password!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  this.passwordConfirm = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const Users = mongoose.model("users", userSchema);
module.exports = Users;
