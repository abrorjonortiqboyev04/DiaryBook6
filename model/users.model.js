module.exports=(Sequelize, sequelize)=>{
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(500),
            allowNull: false,
            unique: true
        },
        username: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: true
    })
}