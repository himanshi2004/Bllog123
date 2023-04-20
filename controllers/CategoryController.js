const CategoryModel = require('../models/category')
class CategoryController{
   static createcategory = async(req,res)=>{
         res.render('admin/category/createcategory')
   }
   static insertcategory  = async(req,res)=>{
     // console.log((req.body))

    const {category} = req.body
    const result = await CategoryModel({
      category:category,
    })
    await result.save();
    res.redirect ('/admin/category/createcategory')
   }
     static displaycategory = async(req,res)=>{
     try{
       const result = await CategoryModel.find()
       res.render('admin/category/displaycategory',{data:result})
     }
     catch(err){
      console.log(err)
     }
     }
     static viewcategory = async(req,res)=>{
      try{
             const result = await CategoryModel.findById(req.params.id)
             res.render('admin/category/viewcategory',{data:result})
      }
      catch(err){
         console.log(err)
      }
     }
     static editcategory = async (req,res)=>{
      try{
          const result = await CategoryModel.findById(req.params.id)
          res.render('admin/category/editcategory',{data:result})
      }
      catch(err){
         console.log(err)
      }
     }
     static updatecategory = async(req,res)=>{
      try{
           const result = await CategoryModel.findByIdAndUpdate(req.params.id,req.body)
           res.redirect('/admin/category/displaycategory')
      }
      catch(err){
         console.log(err)
      }
     }
     static deletecategory = async(req,res)=>{
      try{
         const result = await CategoryModel.findByIdAndDelete(req.params.id,req.body)
         res.redirect('/admin/category/displaycategory')
      }
      catch(err){
         console.log(err)
      }
     }
}
module.exports = CategoryController