const UserModel = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class UserController {
  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (err) {
      console.log(err);
    }
  };
  static insertregister = async (req, res) => {
    // console.log(req.body)
    try {
      const { name, email, password, confirm_password } = req.body;
      const admin = await UserModel.findOne({ email: email });
      if (admin) {
        req.flash("error", "Email already exists");
        res.redirect("/register");
      } else {
        if (name && email && password && confirm_password) {
          if (password == confirm_password) {
            const hashpassword  = await bcrypt.hash(password,10)
            const result = await UserModel({
              name: name,
              email: email,
              password: hashpassword,
              confirm_password: confirm_password,
            });
            await result.save();
            res.redirect("/login");
          } else {
            req.flash("error", "Password and Confirm Password does not match ");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All Fields are required");
          res.redirect("/register");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }




 
}
module.exports = UserController;
