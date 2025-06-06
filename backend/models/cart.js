const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users', 
                key: 'id' 
            },
            allowNull: false
        },
        itemID:{
            type: Sequelize.INTEGER,
            references: {
                model: 'Products', 
                key: 'id' 
            },
            allowNull: false
        },
        quantity:{
            type: Sequelize.INTEGER,
            default: 1
        },
        totalPrice:{
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            foreignKey: 'userID',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'  
        });
    };

    Cart.associate = (models) => {
        Cart.belongsTo(models.Product, {
            foreignKey: 'itemID',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'  
        });
    };

    return Cart;
};
