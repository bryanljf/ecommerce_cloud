import React, { useState } from 'react';
import axios from 'axios';

const UserAccountForm = ({ onAccountCreated }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        data_nasc:'',
        password: ''
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
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/newuser`, formData);
          
          if(response.status === 200){
                setResponseMessage('Conta criada com sucesso! Redirecionando para a página de Login [...]');
                setTimeout(() => {
                    onAccountCreated()
                }, 1500);
                }
          else{
            setResponseMessage('Erro na criação da conta do usuário.');
          }
        } catch(error){
          setResponseMessage(`Erro ao conectar ao servidor: ${error.message}`);
        }
    };

    return (  
        <div className="user-account-form">
            <h3>Crie sua Conta de Usuário</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Data de nascimento:</label>
                    <input 
                        type="date" 
                        name="data_nasc" 
                        value={formData.data_nasc} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Criar Conta</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default UserAccountForm;
