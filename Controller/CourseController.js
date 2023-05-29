const CourseModel = require("../models/Course");
const RegisterModel = require("../models/Register")
const jwt = require('jsonwebtoken')

class CourseController {
  static course_insert = async (req, res) => {
    try {
      const result = new CourseModel({
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        gender: req.body.gender,
        qualification: req.body.qualification,
        course: req.body.course,
        user_id:req.user.id
      });
      await result.save();
      req.flash("success", " Course Registration Insert Successfully");
      res.redirect("/course_display");
    } catch (error) {
      console.log(error);
    }
  };

  static course_display = async (req, res) => {
    try {
      const { name , email , image, id  } = req.user
      const data = await CourseModel.find({user_id:id});
     
      
     
      res.render("courses/display", { d: data,message:req.flash("success"), n:name , e:email , i:image});
    } catch (error) {
      console.log(error);
    }
  };

  static course_view = async (req, res) => {
    try {
      const data = await CourseModel.findById(req.params.id);
      const { name , email , image, _id  } = req.user
      res.render("courses/view", { d: data , n:name , e:email , i:image });
    } catch (error) {
      console.log(error);
    }
  };


  static course_edit = async (req, res) => {
    try {

     
      const data = await CourseModel.findById(req.params.id);
      const { name , email , image, _id  } = req.user
     
      res.render("courses/edit", { d: data , n:name , e:email , i:image });
    } catch (error) {
      console.log(error);
    }
  };



  

  static course_update = async (req, res) => {
    try {
      const update =  await CourseModel.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        gender: req.body.gender,
        qualification: req.body.qualification,
        course: req.body.course,
      });
      req.flash("success", "Update Successfully");
      res.redirect("/course_display");
     

    } catch (error) {
      console.log(error);
    }
  };

  static course_delete = async (req, res) => {
    try {

     
      const data = await CourseModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Delete Successfully");
     
      res.redirect("/course_display");
    } catch (error) {
      console.log(error);
    }
  };




}
module.exports = CourseController;
