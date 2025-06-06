const auth = require('../auth');
const db = require('../models');

class PaymentService{
    constructor(PaymentModel){
        this.Payment = PaymentModel;
    }

    //Cria um novo registro de transação, com o método sendo especificado no corpo da requisição (pix ou cartão), e seu status como Pendente
    async new(userID, method, totalPrice){
        try{
            const newPayment = await this.Payment.create({
                userID:userID,
                method:method,
                totalPrice:totalPrice,
                status:"Pendente"
            });
            return newPayment ? newPayment : null;
            
        }
        catch (error){
            throw error;
        }
    }

    //Altera o status da transação registrada para Concluído (Requer autenticação com token)
    async confirmed(id){
        try{
            const confirmedPayment = await this.Payment.update(
                {status:"Concluído"},
                {where: {id}}
            );
            return confirmedPayment ? confirmedPayment : null;
        }
        catch (error){
            throw error;
        }
    }

    //Altera o status da transação registrada para Falhado (Requer autenticação com token)
    async failed(id){
        try{
            const failedPayment = await this.Payment.update(
                {status:"Falhado"},
                {where: {id}}
            );
            return failedPayment ? failedPayment : null;
        }
        catch (error){
            throw error;
        }
    }

    //Consulta os detalhes de uma transação pelo seu ID (Requer autenticação com token)
    async consult(id){
        try{
            const payment = await this.Payment.findByPk(id);

            return payment ? payment : null;
        }
        catch (error){
            throw error;
        }
    }
}

module.exports = PaymentService;

