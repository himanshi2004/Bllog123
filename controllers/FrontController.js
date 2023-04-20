const AboutModel = require('../models/About')
const BlogModel = require('../models/Blog')
const ContactModel = require('../models/Contact')
const UserModel = require('../models/User')
const CategoryModel = require('../models/category')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
class FrontController{
 
          static home = async (req,res)=>{
                try{
                        const result = await BlogModel.find().sort({_id:-1}).limit(6)
                      //  console.log(result)
                        res.render('home', {data:result}) 
                }catch(err){
                  console.log(err)
                }
          }
          static about = async  (req,res)=>{
            try{
               const result = await AboutModel.find()
               res.render('about',{data:result})
            }
            catch(err){
              console.log(err)
            }
          }
          static contact = async (req,res)=>{
           try{
                  const {name,email,phone,message} = req.body
                  const result = await ContactModel({
                     name:name,
                     email:email,
                     phone:phone,
                     message:message,
                  })
                  await result.save();
                  res.redirect('/admin/contact/createcontact')
           }
           catch(err){
            console.log(err)
           }
          }
          static blog =  (req,res)=>{
            res.render('blog')
          }
          
          static detail = async (req,res)=>{
                  try{
                        const result = await BlogModel.findById(req.params.id)
                        const recentblog = await BlogModel.find().limit(6)
                        const category = await CategoryModel.find()
                        res.render('detail',{data:result,r:recentblog,c:category})
                  }
                  
                  catch(err){
                    console.log(err)
                  }
          }
          
          static login =  async(req,res)=>{
            
            try{
                res.render('login',{message:req.flash('error')})
            }
            catch(err){
              console.log(err)
            }
          }


          static verifylogin = async(req,res)=>{
            try{
                     //console.log(req.body)
                     const {email,password} = req.body
                     if(email && password){
                                       const admin = await UserModel.findOne({email:email})
                                       if(admin != null){
                                            const isMatched = await bcrypt.compare(password,admin.password)
                                            if(isMatched){

                                              //generate jsonwebtoken
                                                               const token = jwt.sign({id:admin._id},'himanshisharma20iamfullstackdeveloper')
                                                              // console.log(token)
                                                              res.cookie('token',token)
                                                  res.redirect('/admin/dashboard')
                                            }
                                            else{
                                              req.flash("error", "Email  and password doesnot matched ");
                                              res.redirect("/login");
                                            }
                                       }
                                       else{
                                        req.flash("error", "You are not a registered User ");
                                        res.redirect("/login");
                                       }
                     }
                     else{
                      req.flash("error", "All fields are required ");
                      res.redirect("/login");
                     }
            }
            catch(err){
              console.log(err)
            }
          }
                     

}
module.exports = FrontController