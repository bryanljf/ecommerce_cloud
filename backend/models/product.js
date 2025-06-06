const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
    const Product = sequelize.define('Product',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        desc:{
            type: Sequelize.STRING,
            allowNull: true
        },
        price:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        stock:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
        
    });
    
    return Product;
};