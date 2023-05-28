const jwt = require('jsonwebtoken')
const RegisterModel = require('../models/Register')



const checkUserAuth = async (req, res, next) =>{


    const {token} = req.cookies
   if(!token){

    req.flash("error", "Unautheroize Admin Please Login");
    res.redirect("/");
    
   }else{
    const data = jwt.verify(token,'Admissionportal123')
    const user = await RegisterModel.findOne({_id:data.id})
    req.user = user
    next()
 
   }
}

module.exports = checkUserAuth