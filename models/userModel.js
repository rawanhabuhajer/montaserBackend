const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "superAdmin", "user"],
    default: "user",
    required: false,
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

// static signup method
userSchema.statics.signup = async function (username, email, password , role) {
  //validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not Strong enough");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email Already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash , role });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password , role) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password ,role);
  if (!match) {
    throw Error("Incorrect email or password");
  }

  return user;
};

userSchema.pre(/^find/, function (next) {
  this.populate("categories");
  next();
});

module.exports = mongoose.model("User", userSchema);
