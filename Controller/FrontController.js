const RegisterModel = require("../models/Register");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
var cloudinary = require("cloudinary").v2;



cloudinary.config({
  cloud_name: "djdseaeua",
  api_key: "182689146329852",
  api_secret: "HiGC6iSCQoUBRjYvjS0PrjHWe40",
  secure: true,
});

class FrontController {
  static login = async (req, res) => {
    try{
        res.render("login", { message: req.flash("error") });
    }catch(error){
        console.log(error)
    }
    
  };


  static dashboard = async (req, res) => {
    try{
      const { name , email , image }= req.user
      res.render("userdashboard",{n:name , e:email , i:image});
    }catch(error){
      console.log(error)
    }
  };

  static registration = async (req, res) => {
    try {
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "StudentRegister",
      });

      const { name, email, password, confirm_password, mobile_no } = req.body;
      const user = await RegisterModel.findOne({ email: email });
      if (user) {
        req.flash("error", "Email already exists");
        res.redirect("/register");
      } else {
        if (name && password && confirm_password && mobile_no) {

          if (password && confirm_password) {
            const hashpassword = await bcrypt.hash(password,10)
            const result = await new  RegisterModel({
              name: name,
              email: email,
              mobile_no:mobile_no,
              password: hashpassword,
              confirm_password:confirm_password,
              image: {
                public_id: myimage.public_id,
                url: myimage.secure_url,
              },
            });
            await result.save();
            req.flash("error", "Registered Successfully, Please Login here..");

            res.redirect("/");
          } else {
            req.flash("error", "Password and Confirm Password doesnot match");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All field are required");
          res.redirect("/register");
        }
      }
      // console.log(myimage)
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };




  static verifyuserlogin = async (req, res) => {
    try{
        const {email,password } = req.body
        if(email && password){
            const  user = await RegisterModel.findOne({email:email})
            if(user != null ){
                const ismatched = await bcrypt.compare(password,user.password)
                if(ismatched){
                  // generate web jwttoken
                  const token = jwt.sign({id:user._id},'Admissionportal123')
                  res.cookie('token',token)

                    res.redirect('/userdashboard')
                }else{
                    req.flash("error", "Email & password doesnot match");
                    res.redirect("/");
                }

            }else{
                req.flash("error", "You are not Register User");
                res.redirect("/");
            }

        }else{
            req.flash("error", "All Field Are required");
            res.redirect("/");

        }
        
        res.redirect('/')
    }catch(error){
        console.log(error)
    }
    
  };





  static logout = async (req, res) => {
    try{
      res.clearCookie('token')
        res.redirect('/')
    }catch(error){
        console.log(error)
    }
    
  }


static profileview = async(req,res)=>{
  try {
   
    res.render("userprofile");
  
   
  } catch (error) {
    console.log(error);
  }

}

static contact = async(req,res)=>{
  try {
   
    res.render("contact");
  
   
  } catch (error) {
    console.log(error);
  }

}







}

module.exports = FrontController;
