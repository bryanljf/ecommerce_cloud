class ProductController{
    constructor(ProductService){
        this.productService = ProductService;
    }

    //Criar um novo produto, recebendo seus atributos do body da requisição
    async createProduct(req,res){
        const {name, desc, price, stock} = req.body;
        try{
            const newProduct = await this.productService.create(name, desc, price, stock);
            res.status(200).json(newProduct);
            res.send();
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao gravar o novo produto.'});
        }
    }

    //Listar todos os produtos cadastrados
    async findAllProducts(req,res){
        try{
            const AllProducts = await this.productService.findAll();
            res.status(200).json(AllProducts);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os produtos.'});
        }
    }

    async findProductById(req,res){
        const {id} = req.params;
        try{
            const Product = await this.productService.findById(id);
            res.status(200).json(Product);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar o produto pelo ID.'});
        }

    }

    //Editar os atributos de um produto recebendo seu ID, e os atributos a serem editados no body da requisição
    async updateProduct(req, res){
        const {id} = req.params;
        const {name, desc, price, stock} = req.body;
        try{
            const updatedProduct = await this.productService.update(id, name, desc, price, stock);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }
    
            res.status(200).json(updatedProduct);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao atualizar o produto.'});
        }
     }

    //Deletar um produto do banco de dados através do seu ID
    async deleteProduct(req,res){
        const {id} = req.params;
        try {
            const deletedProduct = await this.productService.delete(id);

            if (!deletedProduct) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }

            return res.status(200).json({message: 'Produto deletado com sucesso.' }); 
            
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao deletar o produto pelo ID.'})
        }
    }
}

module.exports = ProductController;