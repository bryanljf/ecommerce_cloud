class SupplierController{
    constructor(SupplierService){
        this.supplierService = SupplierService;
    }

    //Criar um novo fornecedor (Requer autenticação)
    async createSupplier(req,res){
        const {name, email, itemID} = req.body;
        try{
            const newSupplier = await this.supplierService.create(name, email, itemID);
            res.status(200).json(newSupplier);
            res.send();
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao gravar o novo fornecedor.'});
        }
    }

    //Listar todos os fornecedores (Requer autenticação)
    async findAllSuppliers(req,res){
        try{
            const AllSuppliers = await this.supplierService.findAll();
            res.status(200).json(AllSuppliers);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os fornecedores.'});
        }
    }
 
    //Encontrar um fornecedor pelo seu ID (Requer autenticação)
    async findSupplierById(req,res){
        const {id} = req.query;
        try{
            const Supplier = await this.supplierService.findById(id);
            res.status(200).json(Supplier);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar o fornecedor pelo ID.'});
        }
    }
}

module.exports = SupplierController;