const online = (req,res,next)=>{
     if(req.session.isAuth){
        res.redirect('/diary/my')
     }
     next()
}

const yangi = (req,res,next)=>{
    if(!req.session.isAuth){
        res.redirect('/auth/login')
    }
    next()
}

module.exports={
    online,
    yangi
}