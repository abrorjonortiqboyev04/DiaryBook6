const { Router }=require('express')
const { getAllMyDiary, diaryAdd, openDiaryById, 
        diaryComment, diaryUpdatePage, updateDiary,
        deleteDiary 
      } = require('../controller/diary.controller')
const { yangi }=require('../middlewears/online')

const router = Router()

router.get('/my', yangi, getAllMyDiary)
router.post('/add',yangi, diaryAdd)
router.get('/open/:id', yangi, openDiaryById)
router.post('/comment/:id', yangi, diaryComment)
router.get('/update/:id', yangi, diaryUpdatePage)
router.post('/edit/:id', yangi, updateDiary)
router.get('/delete/:id',yangi, deleteDiary)

module.exports=router