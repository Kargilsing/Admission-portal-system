const mongoose = require('mongoose')


const url = "mongodb://127.0.0.1:27017/AdmissionPortalSystem"
const live_url ="mongodb+srv://kargilsingh5:Kargil@123@cluster0.epzsgm7.mongodb.net/Admission_portal?retryWrites=true&w=majority"


const connectDB =()=>{
    return mongoose.connect(live_url)
    
    
    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports =connectDB