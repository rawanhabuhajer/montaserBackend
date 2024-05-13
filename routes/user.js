const express = require("express");
const {
  signupUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.get("/", getAllUsers);
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);
router.get("/categories", requireAuth, getUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
