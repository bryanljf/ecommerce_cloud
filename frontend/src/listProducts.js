import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListProducts = ({ onEditProduct, isLoggedIn, userID }) => {
  const [products, setProducts] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  // Função para buscar todos os produtos do servidor
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/all`);
      setProducts(response.data);
    } catch (error) {
      alert('Erro ao buscar produtos no servidor: ', error);
    }
  };

    // Função para adicionar o produto ao carrinho
  const addToCart = async (productId, productPrice) => {
    console.log(userID)
    if (!userID) {
      setResponseMessage('Por favor, faça login para adicionar produtos ao carrinho.');
      return;
    }

    const quantity = 1; 

    try {
      const Token = localStorage.getItem('Token');
      const headers = {
        'authorization': `Bearer ${Token}`,
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/cart/add`, {
        userID: userID,
        itemID: productId,
        itemPrice: productPrice,
        quantity: quantity,
      }, { headers: headers });

      setResponseMessage('Produto adicionado ao carrinho!');
    } catch (error) {
      setResponseMessage('Erro ao adicionar produto ao carrinho: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      {responseMessage && <p>{responseMessage}</p>}
      <h1>Produtos Disponíveis</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <p><strong>Nome:</strong> {product.name}</p>
            <p><strong>Descrição:</strong> {product.desc}</p>
            <p><strong>ID:</strong> {product.id}</p>
            <p className="product-price"><strong>Preço:</strong> R$ {product.price}</p>
            <p className="product-stock"><strong>Estoque:</strong> {product.stock}</p>
            {isLoggedIn && (
              <button className="edit-button" onClick={() => onEditProduct(product.id)}>Editar</button>
            )}
            <button onClick={() => addToCart(product.id, product.price)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ListProducts;
