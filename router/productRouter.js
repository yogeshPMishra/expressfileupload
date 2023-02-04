const express = require('express')
const productRouter = express.Router();
const {readProduct,readProductOne,createProduct,updateProduct,deleteProduct} = require('../controller/productController');

productRouter.route('/products').get(readProduct);
productRouter.route('/addproduct').post(createProduct);
productRouter.route('/product/:id').get(readProductOne);
productRouter.route('/updateproduct/:id').put(updateProduct);
productRouter.route('/deleteproduct/:id').delete(deleteProduct);

module.exports = productRouter;