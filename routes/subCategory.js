const express = require("express");
const {
  createSubcategory,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory,
  getSubCategoryById,
  updateSubcategoryInfo,
} = require("../controllers/subCategoryController");

const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.route("/:id").get(getSubcategoriesByCategory).post(createSubcategory);

router
  .route("/subcategory/:subcategoryId")
  .get(getSubCategoryById)
  .patch(updateSubcategory)
  .delete(deleteSubcategory);

router.route("/subcategory/update/:subcategoryId").patch(updateSubcategoryInfo);

module.exports = router;
