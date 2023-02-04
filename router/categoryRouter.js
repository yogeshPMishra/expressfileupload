const express = require('express')
const categoryRouter = express.Router();
const {readCategory,readCategoryOne,createCategory,updateCategory,deleteCategory} = require('../controller/categtoryController')

categoryRouter.route('/categories').get(readCategory);
// categoryRouter.route('/category/:id').get(readCategoryOne);
categoryRouter.route('/addcategory').post(createCategory);
categoryRouter.route('/updatecategory/:id').put(updateCategory);
categoryRouter.route('/deletecategory/:id').delete(deleteCategory);

module.exports = categoryRouter;