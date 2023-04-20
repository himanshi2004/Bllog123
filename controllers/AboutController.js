const AboutModel = require('../models/About')
class AboutController {
     static createabout = async(req,res)=>{
        res.render('admin/about/createabout')
     }
     static insertabout = async(req,res)=>{
       // console.log(req.body)
       try{
           const {text} = req.body
           const result = await AboutModel ({
            text:text,
           })      
           await result.save();
           res.redirect('/admin/about/createabout')
       }
       catch(err){
        console.log(err)
       }
     }
     static displayabout =async(req,res)=>{
            try{
                  const result = await AboutModel.find()
                  res.render('admin/about/displayabout',{data:result})
            }
            catch(err){
                console.log(err)
            }
     }
     static viewabout = async(req,res)=>{
        try{
             const result = await AboutModel.findById(req.params.id)
             res.render('admin/about/viewabout',{data:result})
        }
        catch(err){
            console.log(err)
        }
     }
     static editabout = async(req,res)=>{
        try{
           const result = await AboutModel.findById(req.params.id)
           res.render('admin/about/editabout',{data:result})
        }
        catch(err){
            console.log(err)
        }
     }
     static updateabout = async(req,res)=>{
        try{
              
              const result = await AboutModel.findByIdAndUpdate(req.params.id,req.body)
              res.redirect('/admin/about/displayabout')
                      
           
        }
        catch(err){
            console.log(err)
        }
     }
     static deleteabout = async(req,res)=>{
        try{
                  const result = await AboutModel.findByIdAndDelete(req.params.id,req.body)
                  res.redirect('/admin/about/displayabout')
        }
        catch(err){
            console.log(err)
        }
     }
}
module.exports = AboutController