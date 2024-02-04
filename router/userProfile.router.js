const {Router} = require('express')
const { userProfileMy, updateProfilePage, updateProfile } = require('../controller/userProfile.controller')

const router=Router()


router.get('/profile/my', userProfileMy)
router.get('/pageupdate', updateProfilePage)
router.post('/update', updateProfile)


module.exports=router