const mongoose = require('mongoose')


const RegisterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile_no:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }

},{timestamps:true})

//create collection
const RegisterModel = mongoose.model('register',RegisterSchema)

module.exports = RegisterModel