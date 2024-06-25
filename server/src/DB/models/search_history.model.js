const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('search_history', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences:{
                model: 'users',
                key: 'id'
            }
        },
        searchdate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        searchCount:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    })
}