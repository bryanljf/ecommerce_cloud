const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
    const Supplier = sequelize.define('Supplier',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        itemID:{
            type: Sequelize.INTEGER,
            references: {
                model: 'Products', 
                key: 'id' 
            },
            allowNull: false
        }
    });

    Supplier.associate = (models) => {
        Supplier.belongsTo(models.Product, {
            foreignKey: 'itemID',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'  
        });
    };
    
    return Supplier;
};