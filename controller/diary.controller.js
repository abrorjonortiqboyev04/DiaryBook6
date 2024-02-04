const db=require('../model/index.model')
const Diary=db.diary
const Comment=db.comment


// My diary page
// Route    GET   /diary/my
const getAllMyDiary = async (req,res)=>{
    try {
        const data = await Diary.findAll({
            raw: true,
            where: {userId: req.session.user.id}
        })
        res.render('diary/myDiary',{
            title: 'My Diary',
            data: data.reverse(),
            isAuth:  req.session.isAuth
        })
    } catch (error) {
        console.log(error)
    }
}

// Diary add
// Route     POST   /diary/add
const diaryAdd = async (req,res)=>{
    try {
        const { imgUrl, text }=req.body
      await Diary.create({
           username: req.session.user.username,
           text,
           imgUrl,
           userId: req.session.user.id
      })

      res.redirect('/diary/my')
    } catch (error) {
        console.log(error)
    }
}

// One Diary Open By Id
// Route    GET   /diary/open/:id
const openDiaryById = async (req,res)=>{
    try {

     const diaryComment = await Comment.findAll({
        raw: true,
        where: {diaryId: req.params.id}
     })
   
     const  data = await Diary.findAll({
        raw: true,
        where: { id: req.params.id}
     })
     res.render('diary/oneDiary',{
        title: "One Diary",
        username: req.session.user.username,
        data: data[0],
        diaryComment: diaryComment.reverse(),
        isAuth:  req.session.isAuth
     })
    } catch (error) {
        console.log(error)
    }
}

// Diary for Commentary
// Route     POST   /diary/comment/:id
const diaryComment = async (req,res)=>{
    try {
        await Comment.create({
           username: req.session.user.username,
           userId: req.session.user.id,
           text: req.body.text,
           diaryId: req.params.id
        })
        res.redirect('/diary/open/'+req.params.id)
    } catch (error) {
        console.log(error)
    }
}

// Update Diary Page
// Route   GET  /diary/update/:id
const diaryUpdatePage = async (req, res)=>{
    try {
      const data = await Diary.findAll({
        raw: true,
        where: {id: req.params.id}
       })
       res.render('diary/updateDiary',{
        title: 'Update Diary',
        data: data[0],
        isAuth:  req.session.isAuth
       })
    } catch (error) {
        console.log(error)
    }
}

// Update Diary
// Route    POST  /diary/edit/:id
const updateDiary = async (req,res)=>{
    try {
        await Diary.update({text: req.body.text}, {where: {id: req.params.id}})
        res.redirect('/diary/my')
    } catch (error) {
        console.log(error)
    }
}

// Delete  Diary
// Route   GET   /diary/delete/:id
const deleteDiary = async (req,res)=>{
    try {
        await Diary.destroy({
            where: {id: req.params.id}
        })
        res.redirect('/diary/my')
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    getAllMyDiary,
    diaryAdd,
    openDiaryById,
    diaryComment,
    diaryUpdatePage,
    updateDiary,
    deleteDiary
}