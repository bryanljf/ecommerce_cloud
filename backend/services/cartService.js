const auth = require('../auth');
const db = require('../models');

class CartService{
    constructor(CartModel){
        this.Cart = CartModel;
    }

    //Criação de um novo registro na tabela de carts, contendo o id do usuario, item a ser adicionado no carrinho, a quantidade e o preço total
    async add(userID, itemID, itemPrice, quantity){
        try{
            const newCart = await this.Cart.create({
                userID:userID,
                itemID:itemID,
                quantity:quantity,
                totalPrice:itemPrice*quantity
            });
            return newCart ? newCart : null;
            
        }
        catch (error){
            throw error;
        }
    }

    //Remove do banco de dados a linha que representa o item no carrinho do usuário, recebendo o id do item e do usuário
    async remove(cartID) {
        try {
            const cartItem = await this.Cart.destroy({
                where: {
                    id: cartID
                }
            });
    
            return cartItem > 0;
        } catch (error) {
            throw error;
        }
    }

    //Lista todos os itens adicionados no carrinho pelo usuário, mostrando todos os registros da tabela com seu ID
    async listAll(id) {
        try {
            const items = await this.Cart.findAll({
                where: {
                    userID: id
                },
                raw: true 
            });
            return items ? items : null;

        } catch (error) {
            throw error;
        }
    }
    
    
}

module.exports = CartService;