const Category = require("../model/Category");

module.exports.readCategory = async (req, res) => {
  try {
    const data = await Category.find();
    if (!data) {
      res.send("Category not found");
      return;
    }
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      res.send("All field required");
      return;
    }
    const createCategory = await Category.create({
      categoryName,
    });
    if (!createCategory) {
      res.send("falied to add category");
    }
    res.send(createCategory);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    let id = req.params.id;
    if (id == undefined) {
      res.send("id not found");
      return;
    }
    const categories_details = await Category.findOne({ _id: id });
    if (!editcategry) {
      res.send("please enter a valid id");
      return;
    }
    const new_categories_details = {
      categoryName: req.body.categoryName,
    };
    const update = Category.updateOne(
      categories_details,
      new_categories_details
    );
    if (!update) {
      res.send("failed to update category");
    }
    res.send(update);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (id == undefined) {
      res.send("id not found");
      return;
    }
    const findproduct = await Category.findOne({ _id: id });
    if (!findproduct) {
      res.send("Invalid Id!");
      return;
    }
    const data = await Category.deleteOne(id);
    if (!data) {
      res.send("failed to delete category");
      return;
    }
    res.send("Category deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
