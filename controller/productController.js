const Product = require("../model/Product");
const cloudinary = require("cloudinary").v2;

module.exports.readProduct = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "joinedvalue",
        },
      },
    ]);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const { productName, category_id, price, discounted_price } = req.body;
    let file = req.files.image;
    // console.log(file);
    let result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "products",
    });
    if (!(productName && category_id && price && discounted_price)) {
      res.status(400).send("all field are most be filled !!");
      return;
    }
    const findName = await Product.findOne({ productName });
    if (findName) {
      res.status(400).send("This product already exist !!");
      return;
    }
    const newProduct = await Product.create({
      productName: productName,
      category_id: category_id,
      price: price,
      discounted_price: discounted_price,
      image: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    });
    res.send(newProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const uid = req.params.id;
    const { productName, category_id, price, discounted_price } = req.body;
    let file = req.files.image;
    let result;
    let updatedProduct = {};
    if (!uid) {
      res.send("Id not found");
      return;
    }
    const productDetails = await Product.findOne({ _id: uid });
    if (file) {
      await cloudinary.uploader.destroy(productDetails.image.id);
      result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products",
      });
      updatedProduct = {
        productName: productName,
        category_id: category_id,
        price: price,
        discounted_price: discounted_price,
        image: {
          id: result.public_id,
          secure_url: result.secure_url,
        },
      };
    } else {
      updatedProduct = {
        productName: productName,
        category_id: category_id,
        price: price,
        discounted_price: discounted_price,
        image: {
          id: Product.image.id,
          secure_url: Product.image.secure_url,
        },
      };
    }

    if (productDetails) {
      const data = await Product.updateOne(productDetails, updatedProduct);
      if (!data) {
        res.send("failed to update data");
        return;
      }
      res.send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const uid = req.params.id;
    if (!uid) {
      res.send("Id Not Found");
      return;
    }
    const data = await Product.deleteOne({ _id: uid });
    if (!data) {
      res.send("failed to delete product");
      return;
    }
    cloudinary.uploader.destroy(Product.image.id);
    res.send("product deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
