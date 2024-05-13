const express = require("express");
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
