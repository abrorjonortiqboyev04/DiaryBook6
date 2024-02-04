const db=require('../model/index.model')
const User=db.user
const Diary=db.diary

// User profile Page
// Route   GET  /user/profile/my
const userProfileMy= async (req,res)=>{
    try {
        const diary = await  Diary.findAll({
            raw: true,
            where: {userId: req.session.ID}
        })
        const user = await User.findAll({
            raw: true,
            where: {id: req.session.ID}
        })
        res.render('user/profile',{
            title: user[0].username,
            user: user[0],
            diarySize: diary.length,
            isAuth: req.session.isAuth
        })
    } catch (error) {
        console.log(error)
    }
}

// Update User Profile Page
// Route   GET   /user/pageupdate
const updateProfilePage = async (req,res)=>{
    try {
        const user = await User.findAll({
            raw: true,
            where: {id: req.session.ID}
        })
        res.render('user/updateProfile',{
            title: "Update Profile",
            data: user[0],
            isAuth: req.session.isAuth
        })
    } catch (error) {
        console.log(error)
    }
}

// Update profile
// Route   POST    /user/update
const  updateProfile = async (req,res)=>{
    try {
        const userEmail = await User.findAll({
            raw: true,
            where: {email: req.body.email}
        })
        console.log(userEmail)
        if (!userEmail[0]) {
            await User.update(  {email: req.body.email, username: req.body.name}, {where: {id: req.session.ID}, })
            
            const user = await User.findAll({  raw: true,   where: {id: req.session.ID}  })

            req.session.user=user[0]

            req.session.save((err)=>{  if(err) throw err;  return  res.redirect('/user/profile/my')    }) 
        } 
        else {
           return res.redirect('/user/pageupdate')
        }  
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    userProfileMy,
    updateProfilePage,
    updateProfile
}
