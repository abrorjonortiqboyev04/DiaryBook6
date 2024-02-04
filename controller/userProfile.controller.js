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
        res.render('user/profile',{
            title: req.session.user.username,
            user: req.session.user[0],
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
        console.log(req.session.user)
        res.render('user/updateProfile',{
            title: "Update Profile",
            data: req.session.user[0],
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
    await User.update(
        {email: req.body.email, name: req.body.username}, 
        {where: {id: req.session.ID}, 
    })
    const user = await User.findAll({
        raw: true,
        where: {id: req.session.ID}
    })
      req.session.user=user
      req.session.save((err)=>{
        if(err) throw err
        res.redirect('/user/profile/my')
      })
      
    } catch (error) {
        console.log(error)
    }
}

 
module.exports={
    userProfileMy,
    updateProfilePage,
    updateProfile
}