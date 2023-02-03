const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require('cors')
require("dotenv").config();
require("./config/database").connect();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const categoryRouter = require("./router/categoryRouter");
const productRouter = require("./router/productRouter");
const app = express();
app.use(express.json()); //Predefined  Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempfileDirL: "/tmp/",
  })
);
app.use(cors({
    origin : "*"
}))
app.use(categoryRouter);
app.use(productRouter);
module.exports = app;
