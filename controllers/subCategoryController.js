const Subcategory = require("../models/subCategoryModel");
const Category = require("../models/categoriesModal");
// Create a new subcategory
exports.createSubcategory = async (req, res, next) => {
  try {
    const { name, description, data } = req.body;
    const categoryId = req.params.id;

    const newSubcategory = await Subcategory.create({
      name,
      description,
      data,
    });

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { subcategories: newSubcategory._id } },
      { new: true }
    ).populate("subcategories");

    res.status(201).json({
      status: "success",
      data: {
        subcategory: newSubcategory,
        category: updatedCategory,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error creating subcategory",
      error: err.message,
    });
  }
};

exports.getSubcategoriesByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "SubCategory not found",
      });
    }

    const subcategories = category.subcategories;

    res.status(200).json({
      status: "success",
      data: {
        subcategories: subcategories,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error getting subcategories",
      error: err.message,
    });
  }
};
exports.getSubCategoryById = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({
        status: "error",
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        subcategory,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error getting subcategory",
      error: err.message,
    });
  }
};
exports.updateSubcategory = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const updatedData = req.body.data; // Assuming the request body contains the updated 'data' field

    // Update the 'data' field of the subcategory by its ID
    const subcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { data: updatedData }, // Set the updated 'data' field
      { new: true }
    );

    // Check if the subcategory exists
    if (!subcategory) {
      return res.status(404).json({
        status: "error",
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        subcategory,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error updating subcategory",
      error: err.message,
    });
  }
};

exports.updateSubcategoryInfo = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const { name, description } = req.body; 
    if (!name && !description) {
      return res.status(400).json({
        status: "error",
        message: "Name or description is required for update",
      });
    }

    const updateFields = {};
    if (name) {
      updateFields.name = name;
    }
    if (description) {
      updateFields.description = description;
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({
        status: "error",
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedSubcategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error updating subcategory",
      error: err.message,
    });
  }
};
exports.deleteSubcategory = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    await Subcategory.findByIdAndDelete(subcategoryId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error deleting subcategory",
      error: err.message,
    });
  }
};
