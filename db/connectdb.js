const mongoose = require('mongoose')


const url = "mongodb://127.0.0.1:27017/AdmissionPortalSystem"
const live_URL ="mongodb+srv://kargilsingh5:kargil123@cluster0.epzsgm7.mongodb.net/Admission_portal?retryWrites=true&w=majority"


const connectDB =()=>{
    return mongoose.connect(live_URL)
    
    
    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports =connectDB