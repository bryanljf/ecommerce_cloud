// ./services/userService.js
const auth = require('../auth');
const db = require('../models');

class SupplierService{
    constructor(SupplierModel){
        this.Supplier = SupplierModel;
    }

    //Cria um novo registro de fornecedor, contendo nome, email e tipo de produto
    async create(name, email, itemID){
        try{
            const newSupplier = await this.Supplier.create({
                name: name,
                email: email,
                itemID: itemID
            });
    
            return newSupplier ? newSupplier : null;
        }
        catch (error){
            throw error;
        }
    }

    //Lista todos os fornecedores cadastrados (Requer autenticação com token)
    async findAll()
    {
        try{
            const AllSuppliers = await this.Supplier.findAll();
            return AllSuppliers ? AllSuppliers : null;
        }
        catch(error){
            throw error;
        }

    }

    //Procura um supplier no banco de dados através do seu ID
    async findById(id){
        try{
            const Supplier = await this.Supplier.findByPk(id);
            return Supplier ? Supplier : null;
        }
        catch(error){
            throw error;
        }

    }

}

module.exports = SupplierService;