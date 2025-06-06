import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProductForm = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    stock: '',
  });

  const [loading, setLoading] = useState(true); 
  const [responseMessage, setResponseMessage] = useState('');

  // Função para buscar os dados do produto
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${productId}`);
      setFormData(response.data); 
      setLoading(false); 
    } catch (error) {
      setResponseMessage('Erro ao buscar detalhes do produto:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(productId)
      const token = localStorage.getItem('Token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.put(`http://localhost:8080/products/${productId}`, formData, { headers });
      setResponseMessage('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      setResponseMessage('Erro ao atualizar produto.');
    }
  };

  return (
    <div className="create-product-form">
      <h3>Editar Produto</h3>
      {loading ? (
        <p>Carregando dados do produto...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Descrição:</label>
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Estoque:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      )}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default EditProductForm;
