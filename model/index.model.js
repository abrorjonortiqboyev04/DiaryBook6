const Sequelize=require('sequelize')

const sequelize = new Sequelize('lg', 'postgres', '1234',{
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

const db={Sequelize, sequelize}
db.user=require('./users.model')(Sequelize,sequelize)
db.diary=require('./diary.model')(Sequelize,sequelize)
db.comment=require('./comment.moel')(Sequelize,sequelize)

db.user.hasMany(db.diary, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    constraints: true
})
db.diary.belongsTo(db.user)


db.user.hasMany(db.comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    constraints: true
})
db.comment.belongsTo(db.user)


db.diary.hasMany(db.comment, {
    foreignKey: 'diaryId',
    onDelete: 'CASCADE',
    constraints: true
})
db.comment.belongsTo(db.diary)

module.exports=db