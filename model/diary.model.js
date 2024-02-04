module.exports=(Sequelize, sequelize)=>{
    return sequelize.define('user_diary', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        text: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        imgUrl: {
            type: Sequelize.STRING(250),
            allowNull: true
        }
    },
    {
        timestamps: true
    })
}