const UserModel = require('../models/User')
class AdminController{
     static dashboard =async(req,res)=>{
      try{
                 const {name,email } = req.admin
                 res.render('admin/dashboard',{n:name,e:email})
      }
      catch(err){
         console.log(err)
      }
       
     }
     static logout = async(req,res)=>{
      try{
              //for logout we have to expire the token
              res.clearCookie('token')
            res.redirect('/login')

      }catch(err){
         console.log(err)
      }
     }
}
module.exports = AdminController