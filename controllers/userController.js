const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "365d" });
};

const populateCategories = async (userOrUserId) => {
  const userId =
    userOrUserId instanceof Object ? userOrUserId._id : userOrUserId;
  return await User.findById(userId).populate("categories").exec();
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

// login
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.login(email, password, role);
    const token = createToken(user._id);

    // Populate categories before sending the response
    const userWithCategories = await populateCategories(user);

    res.status(200).json({
      username: userWithCategories.username,
      email: userWithCategories.email,
      role: userWithCategories.role,
      token,
      categories: userWithCategories.categories,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup
const signupUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await User.signup(username, email, password, role);
    const token = createToken(user._id);

    // Populate categories before sending the response
    const userWithCategories = await populateCategories(user);

    res.status(200).json({
      username: userWithCategories.username,
      email: userWithCategories.email,
      role: userWithCategories.role,
      token,
      categories: userWithCategories.categories,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.error("User not authenticated or missing _id");
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userWithCategories = await populateCategories(req.user);

    if (!userWithCategories) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      username: userWithCategories.username,
      email: userWithCategories.email,
      role: userWithCategories.role,
      categories: userWithCategories.categories,
    });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).json({ error: "Error retrieving user information" });
  }
};

// };

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      new AppError("No user found with that ID", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Error update user information:", error);
    res.status(500).json({ error: "Error update user information" });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
    if (!user) {
      new AppError("No user found with that ID", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error("Error delete user information:", error);
    res.status(500).json({ error: "Error delete user information" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
