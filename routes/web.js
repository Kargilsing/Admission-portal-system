const express = require('express')
const FrontController = require('../Controller/FrontController')
const AdminController = require('../Controller/admin/AdminController')
const auth = require('../middleware/auth')
const CourseController = require('../Controller/CourseController')
const router = express.Router()




// routeing
// Front Controller
router.get('/',FrontController.login)
router.get('/register',FrontController.register)
router.post('/registration',FrontController.registration)
router.post('/verifyuserlogin',FrontController.verifyuserlogin)
router.get('/userdashboard',auth,FrontController.dashboard)
router.get('/profileview',auth,FrontController.profileview)
router.get('/contact',auth,FrontController.contact)
router.get('/logout',auth,FrontController.logout)

// Course controller

router.post('/course_insert',auth,CourseController.course_insert)
router.get('/course_display',auth,CourseController.course_display)
router.get('/course_view/:id',auth,CourseController.course_view)
router.get('/course_edit/:id',auth,CourseController.course_edit)
router.post('/course_update/:id',auth,CourseController.course_update)
router.get('/course_delete/:id',auth,CourseController.course_delete)






// admin  controller
router.get('/admin/dashboard',AdminController.dashboard)

module.exports = router
