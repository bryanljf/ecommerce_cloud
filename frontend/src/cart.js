import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ userID }) => {
  const [products, setProducts] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  // Função para buscar os detalhes do produto (como nome) com base no ID do produto
  const fetchProductDetails = async (productID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productID}`);
      return response.data; // Retorna os dados do produto
    } catch (error) {
      console.error('Erro ao buscar detalhes do produto:', error);
      return null;
    }
  };

  // Função para buscar todos os produtos no carrinho
  const fetchProducts = async () => {
    try {
      const Token = localStorage.getItem('Token');
      const headers = {
        'authorization': `Bearer ${Token}`,
      };

      // Buscar os itens do carrinho
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart/${userID}`, {
        headers: headers,
      });
      const cartItems = response.data;

      // Buscar os detalhes de cada produto (como nome)
      const productsWithDetails = await Promise.all(
        cartItems.map(async (item) => {
          const productDetails = await fetchProductDetails(item.itemID);
          return {
            ...item, // Mantém as informações do item do carrinho
            name: productDetails ? productDetails.name : 'Produto não encontrado',
          };
        })
      );

      setProducts(productsWithDetails);
    } catch (error) {
      alert('Erro ao buscar produtos no servidor: ', error);
    }
  };

    // Função para remover um produto do carrinho
    const removeProductFromCart = async (cartID) => {
      try {
        const Token = localStorage.getItem('Token');
        const headers = {
          'authorization': `Bearer ${Token}`,
        };
  
        // Envia a requisição para remover o item
        await axios.delete(`${process.env.REACT_APP_API_URL}/cart/remove/${cartID}`, {
          headers: headers,
        });
  
        // Após remover, refaz a requisição para atualizar os itens do carrinho
        fetchProducts();
      } catch (error) {
        setResponseMessage('Erro ao remover o produto do carrinho: ' + error);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      {responseMessage && <p>{responseMessage}</p>}
      <h1>Produtos no seu Carrinho</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <p><strong>Nome do Produto:</strong> {product.name}</p> {/* Nome do Produto */}
            <p><strong>ID:</strong> {product.itemID}</p>
            <p className="product-price"><strong>Preço:</strong> R$ {product.totalPrice}</p>
            <p className="product-stock"><strong>Quantidade:</strong> {product.quantity}</p>
            <button className="remove-button" onClick={() => removeProductFromCart(product.id)}>
              Remover do Carrinho
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Cart;
