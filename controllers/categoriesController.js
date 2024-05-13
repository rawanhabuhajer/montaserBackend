const Category = require("../models/categoriesModal");
const User = require("../models/userModel");
const Sub = require("../models/subCategoryModel");
exports.getAllCategories = async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
};

exports.getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  const sub = await Sub.findById(_id);

  if (!sub) {
    console.log("first");
  }
  if (!category) {
    throw Error("No category found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, subcategories } = req.body;
    const userId = req.user._id;

    const newCategory = await Category.create({
      name,
      description,
      userId: userId,
      subcategories,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { categories: newCategory._id } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        category: newCategory,
        user: user,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error creating category",
      error: err.message,
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw Error("No category found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
};

exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  console.log(category);
  if (!category) {
    throw Error("No category found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
