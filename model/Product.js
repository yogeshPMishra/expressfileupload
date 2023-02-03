const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"categories"
    },
    price:{
        type:String,
        required:true 
    },
    discounted_price:{
        type:String,
        required:true 
    },
    image:{
        id:{
            type:String,
        },
        secure_url:{
            type:String,
            required : [true, "Image field is required..."],
        }
    }
});
module.exports = mongoose.model('Product',productSchema)