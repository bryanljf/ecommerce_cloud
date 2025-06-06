var express = require('express');
var router = express.Router();
const auth = require('../auth');
const db =require('../models')

const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

//Rota para a criação de um novo produto
router.post('/newproduct', auth.verifyToken, async (req,res)=>{
    await productController.createProduct(req,res);
});

//Rota para listar todos os produtos cadastrados
router.get('/all', async(req,res)=>{
    await productController.findAllProducts(req,res);
});

//Rota para listar todos os produtos cadastrados
router.get('/:id', async(req,res)=>{
    await productController.findProductById(req,res);
});

//Rota para alteração dos atributos de um produto
router.put('/:id', auth.verifyToken, async (req,res)=>{
    await productController.updateProduct(req,res);
});

//Rota para deletar um cadastro de produto
router.delete('/:id', auth.verifyToken, async(req,res)=>{
    await productController.deleteProduct(req,res);
});

module.exports = router;