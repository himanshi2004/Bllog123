const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')



const checkAdminAuth = async(req,res,next)=>{
   // console.log('Hello Middleware')
   const  {token} = req.cookies
   //console.log(token)

   if(!token){
    req.flash('error','Unauthorised Admin Please Login')
    res.redirect('/login')

   }
   else{
     const data  =  jwt.verify(token,'himanshisharma20iamfullstackdeveloper')
     //console.log(data)

     // For printing the name in dashboard
     
     const admin  = await UserModel.findOne({_id:data.id})
    // console.log(admin)
    req.admin = admin
     next()
   }
}


module.exports = checkAdminAuth