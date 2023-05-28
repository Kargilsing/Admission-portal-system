const CourseModel = require("../models/Course");

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
      });
      await result.save();
      res.redirect("/userdashboard");
    } catch (error) {
      console.log("error");
    }
  };


static course_display = async(req,res)=>{
    try{

        const data = await CourseModel.find()
      res.render('courses/display',{d:data})


    }catch(error){
        console.log("error")
    }
}


}
module.exports = CourseController;
