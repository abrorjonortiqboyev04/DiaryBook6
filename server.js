const express=require('express')
const hbs=require('express-handlebars')
const dotenv=require('dotenv')
const session=require('express-session')
const connectPgSimple=require('connect-pg-simple')(session)
const pool = require('./config/db')
const db=require('./model/index.model')

dotenv.config()
const app=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    store: new connectPgSimple({
        pool: pool,
        tableName: 'user_session'
    }),
    secret: 'Abrorjon',
    resave: false,
    saveUninitialized: false
}))

app.engine('.hbs', hbs.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')

// Registration Pages
const registrationPage = require('./router/registration.router')
app.use('/auth', registrationPage)

// Diary Pages
const diaryPages = require('./router/diary.router')
app.use('/diary', diaryPages)

// Profile Pages
const profilePage = require('./router/userProfile.router')
app.use('/user', profilePage)

const start= async ()=>{
    try {
        await db.sequelize.sync()
        app.listen(PORT, ()=>{
            console.log(`Server running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()