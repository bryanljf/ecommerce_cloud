import React, { useState } from 'react';
import axios from 'axios';

const CreateProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        price: '',
        stock: ''
    });
    
    const [responseMessage, setResponseMessage] = useState('');

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
            const Token = localStorage.getItem('Token');

            const headers = {
                'authorization': `Bearer ${Token}`
              }

            const response = await axios.post('http://localhost:8080/products/newproduct', formData, {
                headers: headers
            });
          
            if(response.status === 200){
                setResponseMessage('Produto criado com sucesso!');
            }
            else{
                setResponseMessage('Erro na criação de um novo produto.');
            }
            } catch(error){
            setResponseMessage(`Erro ao conectar ao servidor: ${error.message}`);
            }
    };
    
    
    return (  
        <div className="create-product-form">
            <h3>Criar Novo Produto</h3>
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
                <button type="submit">Criar Produto</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default CreateProductForm;
