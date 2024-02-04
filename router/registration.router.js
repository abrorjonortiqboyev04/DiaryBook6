const { Router }=require('express')
const { getRegistrationPage, getLoginPage, registrationUser, userLogin, logout } = require('../controller/registration.controller')
const { online }=require('../middlewears/online')

const router=Router()

router.get('/registration', online, getRegistrationPage)
router.get('/login', online, getLoginPage)
router.get('/logout',  logout)
router.post('/regisuser', online, registrationUser)
router.post('/userlogin', online, userLogin)

module.exports=router