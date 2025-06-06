var express = require('express');
var router = express.Router();
const auth = require('../auth');
const db =require('../models') // carregando o banco de dados

//Carregando as classes service e controller do Supplier
const SupplierService = require('../services/supplierService');
const SupplierController = require('../controllers/supplierController');

//Construir os objetos a partir das classes
const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

//Rota para registrar novo fornecedor
router.post('/newsupplier', auth.verifyToken, async(req,res)=>{
  supplierController.createSupplier(req,res);
});

//Rota para retornar todos os usuários
router.get('/all', auth.verifyToken, async(req,res)=>{
  supplierController.findAllSuppliers(req,res);
});

//Rota para retonar um usuário pelo id
router.get('/:id', auth.verifyToken, async(req,res)=>{
  supplierController.findSupplierById(req,res);
});

module.exports = router;
