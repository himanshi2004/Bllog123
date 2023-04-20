const express= require('express')
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/AdminController')
const BlogController = require('../controllers/BlogController')
const AboutController = require('../controllers/AboutController')
const ContactController = require('../controllers/ContactController')
const CategoryController = require('../controllers/CategoryController')
const UserController = require('../controllers/UserController')
const router= express.Router()
const auth = require('../middleware/auth')
//FrontController Files
router.get('/',auth,FrontController.home)
router.get('/about',auth,FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/blog',FrontController.blog)
router.get('/login',FrontController.login)
router.get('/detail/:id',FrontController.detail)
router.post('/verifylogin',FrontController.verifylogin)

//AdminController files
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.get('/logout',AdminController.logout)



//BlogController.js
router.get('/admin/blog/displayblog',BlogController.displayblog)
router.get('/admin/blog/createblog',BlogController.createblog)
router.post('/insertblog',BlogController.insertblog)
router.get('/admin/blog/viewblog/:id',BlogController.viewblog)
router.get('/admin/blog/editblog/:id',BlogController.editblog)
router.post('/admin/blog/updateblog/:id',BlogController.updateblog)
router.get('/admin/blog/deleteblog/:id',BlogController.deleteblog)

//About Controller files
router.get('/admin/about/createabout',AboutController.createabout)
router.post('/insertabout',AboutController.insertabout)
router.get('/admin/about/displayabout',AboutController.displayabout)
router.get('/admin/about/viewabout/:id',AboutController.viewabout)
router.get('/admin/about/editabout/:id',AboutController.editabout)
router.post('/admin/about/updateabout/:id',AboutController.updateabout)
router.get('/admin/about/deleteabout/:id',AboutController.deleteabout)


//COntact Controller Files
router.get('/admin/contact/createcontact',ContactController.createcontact)
router.post('/insertcontact',ContactController.insertcontact)
router.get('/admin/contact/displaycontact',ContactController.displaycontact)
router.get('/admin/contact/viewcontact/:id',ContactController.viewcontact)
router.get('/admin/contact/editcontact/:id',ContactController.editcontact)
router.post('/admin/contact/updatecontact/:id',ContactController.updatecontact)
router.get('/admin/contact/deletecontact/:id',ContactController.deletecontact)



//Category Controller Files
router.get('/admin/category/createcategory',CategoryController.createcategory)
router.post('/insertcategory',CategoryController.insertcategory)
router.get('/admin/category/displaycategory',CategoryController.displaycategory)
router.get('/admin/category/viewcategory/:id',CategoryController.viewcategory)
router.get('/admin/category/editcategory/:id',CategoryController.editcategory)
router.post('/admin/category/updatecategory/:id',CategoryController.updatecategory)
router.get('/admin/category/deletecategory/:id',CategoryController.deletecategory)


//UserController Files
router.get('/register',UserController.register)
router.post('/insertregister',UserController.insertregister)



module.exports = router