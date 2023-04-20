const mongoose = require('mongoose')
const AboutSchema = new mongoose.Schema ({
   
   text:{
      type:String,
      Required:true,
   },
   

},{timestamps:true})
const AboutModel = mongoose.model('about',AboutSchema)
module.exports = AboutModel