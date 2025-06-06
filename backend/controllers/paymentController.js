class PaymentController{
    constructor(PaymentService){
        this.paymentService = PaymentService;
    }

    //Pagamentos em pix
    async pixPayment(req,res){
        const {userID, totalPrice} = req.body;
        const method = "pix";
        try{
                const newPayment = await this.paymentService.new(userID, method, totalPrice);
                res.status(200).json(newPayment);
                res.send();

        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao processar o pagamento.'});
        }
    }

    //Pagamentos em cartão de crédito
    async creditcardPayment(req,res){
        const {userID, totalPrice} = req.body;
        const method = "creditcard";
        try{
                const newPayment = await this.paymentService.new(userID, method, totalPrice);
                res.status(200).json(newPayment);
                res.send();

        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao processar o pagamento.'});
        }
    }

    //Alteração de status da transação
    async changeStatus(req,res){
        const {id} = req.params;
        const {status} = req.body;

        try{
            if (status == "Concluído"){
                const updatedStatus = await this.paymentService.confirmed(id);
                return res.status(200).json({message: "Status da transação alterado para Concluído"})
            }
            else if (status == "Falhado"){
                const updatedStatus = await this.paymentService.failed(id);
                return res.status(200).json({message: "Status da transação alterado para Falhado"})
            }
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao atualizar o pagamento.'});
        }
    }

    //Consulta de transações
    async consultPayment(req,res){
        const {id} = req.params;

        try{
            const consultPayment = await this.paymentService.consult(id);
            return res.status(200).json(consultPayment)
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao consultar o pagamento.'});
        }
    }
}

module.exports = PaymentController;