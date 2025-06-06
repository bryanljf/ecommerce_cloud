var express = require('express');
var router = express.Router();

const auth = require('../auth');
const db =require('../models')

const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');

const paymentService = new PaymentService(db.Payment);
const paymentController = new PaymentController(paymentService);

//Rota para pagamentos com pix
router.post('/pix', auth.verifyToken, async (req,res)=>{
    await paymentController.pixPayment(req,res);
});

//Rota pra pagamentos com cartão de crédito (Requer autenticação com token)
router.post('/creditcard', auth.verifyToken, async (req,res)=>{
    await paymentController.creditcardPayment(req,res);
});

//Rota para consultar as transações cadastradas (Requer autenticação com token)
router.get('/status/:id', auth.verifyToken, async (req, res)=>{
    await paymentController.consultPayment(req,res);
});

//Rota para alteração de status de uma transação (Requer autenticação com token)
router.put('/update/:id', auth.verifyToken, async (req, res)=>{
    await paymentController.changeStatus(req,res);
});

module.exports = router;