const bcrypt=require('bcryptjs')
const db=require('../model/index.model')
const User=db.user

// Registration Page
// Route      GET    /auth/registration
const getRegistrationPage = async (req,res)=>{
    try {
        res.render('auth/regitrationPage',{
            title: 'Registration Page'
        })
    } catch (error) {
        console.log(error)
    }
}

// Registration User
// Route     POST   /auth/regisuser
const registrationUser = async (req, res)=>{
    try {
        const { email, username, password, password2 }=req.body
        const userOne = await User.findOne({ where: {email}})
        if(userOne){
            return res.redirect('/auth/registration')
        }
        if(password!==password2){
            return res.redirect('/auth/registration')
        }
        const salt = await  bcrypt.genSalt(10) 
        const hashPassword = await  bcrypt.hash(password, salt)
        await User.create({
            email,
            username,
            password: hashPassword
        })
        return res.redirect('/auth/login')
    } catch (error) {
        console.log(error)
    }
}

// Login Page
// Route      GET    /auth/login
const getLoginPage =  (req,res)=>{
    try {
        res.render('auth/loginPage',{
            title: "Login Page"
        })
    } catch (error) {
        console.log(error)
    }
}

// Login User
// Route    POST /auth/userlogin
const userLogin = async (req,res)=>{
    try {
        const { email,  password } =req.body
        const userOne = await User.findOne({ where: {email}})
        if(userOne){
            const passwordHash = await bcrypt.compare(password, userOne.password)
            if(passwordHash){
                req.session.isAuth=true
                req.session.ID=userOne.id
                req.session.user=userOne
                req.session.save(()=>{
                   return res.redirect('/diary/my') 
                })              
            } else {
                return res.redirect('/auth/login')
            }
        } else{
            return res.redirect('/auth/login')
        }
    } catch (error) {
       console.log(error) 
    }
} 

// Logout user 
// Route   GET   /auth/logout
const logout = async (req,res)=>{
    await req.session.destroy(()=>{
       return res.redirect('/auth/login')
     })
}

module.exports={
    getRegistrationPage,
    getLoginPage,
    registrationUser,
    userLogin,
    logout
}