const auth = require('../auth');
const db = require('../models');

class ProductService{
    constructor(ProductModel){
        this.Product = ProductModel;
    }

    //Cria um novo registro de produto, contendo nome, descrição, preço e estoque do produto
    async create(name, desc, price, stock){
        try{
            const newProduct = await this.Product.create({
                name:name,
                desc:desc,
                price:price,
                stock:stock
            });
            return newProduct ? newProduct : null;
            
        }
        catch (error){
            throw error;
        }
    }

    //Altera os atributos de um produto cadastrado através do seu ID
    async update(id, name, desc, price, stock) {
        try {
            const [updatedRowCount] = await this.Product.update(
                { name, desc, price, stock }, 
                {where: { id }}
            );
    
            if (updatedRowCount === 0) {
                return null; 
            }
    
            const updatedProduct = await this.Product.findByPk(id);
            return updatedProduct;
        } 
        catch (error) {
            throw error;
        }
    }

    //Deleta o resgistro de um produto no banco de dados através do seu ID
    async delete(id) {
        try {
            const product = await this.Product.findByPk(id);
            
            if (!product) {
                return null; 
            }

            await this.Product.destroy({ where: { id } });
            return product; 

        } 
        catch (error){
            throw error; 
        }
    }

    //Lista todos os produtos cadastrados
    async findAll()
    {
        try{
            const AllProducts = await this.Product.findAll();
            return AllProducts ? AllProducts : null;
        }
        catch(error){
            throw error;
        }

    }

    //Procura um produto no banco de dados através do seu ID
    async findById(id){
        try{
            const Product = await this.Product.findByPk(id, { raw: true });
            return Product ? Product : null;
        }
        catch(error){
                throw error;
        }
    
    }
}

module.exports = ProductService;