const BlogModel = require("../models/Blog");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwy8hd761",
  api_key: "822826584515219",
  api_secret: "tOwVhCBcpcPxothANYLY3kaYcX4",
  // secure: true
});
class BlogController {
  static createblog = (req, res) => {
    res.render("admin/blog/createblog");
  };
  static insertblog = async (req, res) => {
    // console.log(req.body)
    try {
      // console.log(req.files.image)
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      //console.log(myimage)

      const { title, description, image } = req.body;
      const result = await BlogModel({
        title: title,
        description: description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/blog/createblog");
    } catch (err) {
      console.log(err);
    }
  };

  static displayblog = async (req, res) => {
    try {
      const result = await BlogModel.find();
      //console.log(result)
      res.render("admin/blog/displayblog", { data: result });
    } catch (err) {
      console.log(err);
    }
  };

  static viewblog = async (req, res) => {
    try {
      const result = await BlogModel.findById(req.params.id);
      res.render("admin/blog/viewblog", { data: result });
    } catch (err) {
      console.log(err);
    }
  };
  static editblog = async (req, res) => {
    try {
      const result = await BlogModel.findById(req.params.id);
      res.render("admin/blog/editblog", { data: result });
    } catch (err) {
      console.log(err);
    }
  };
  static updateblog = async (req, res) => {
    try {
      const blog = await BlogModel.findById(req.params.id)
      const imageId = blog.image.public_id;
      // console.log(imageId)
      // delete image code end
      await cloudinary.uploader.destroy(imageId)

      //update
      // console.log(req.files.image)
      const file = req.files.image
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      })

      
      const result = await BlogModel.findByIdAndUpdate(req.params.id, {
              title:req.body.title,
              description:req.body.description,
              image: {
                public_id: myimage.public_id,
                url: myimage.secure_url,
              },
      })
      await result.save();
      res.redirect("/admin/blog/displayblog");
    } catch (err) {
      console.log(err);
    }
  };

  static deleteblog = async (req, res) => {
    try {
      // delete image code start
      const blog = await BlogModel.findById(req.params.id);
      const imageId = blog.image.public_id;
      // console.log(imageId)
      // delete image code end
      await cloudinary.uploader.destroy(imageId);

      await BlogModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/blog/displayblog");
    } catch (err) {
      console.log(err);
    }
  };
}
module.exports = BlogController;
