const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
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
        method:{    
            type: Sequelize.STRING,
            allowNull: false
        },  
        totalPrice:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Payment;
}