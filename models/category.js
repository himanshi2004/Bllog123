const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema ({
    category:{
        type:String,
        Required:true,
   },
   
},{timestamps:true})
const CategoryModel = mongoose.model('category',CategorySchema)
module.exports = CategoryModel