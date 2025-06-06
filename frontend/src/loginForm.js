import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await axios.post('http://localhost:8080/users/login', formData);
            
            if (response.status === 200) {
                localStorage.setItem('Token', response.data.Token);
                setResponseMessage('Login feito com sucesso!');
                onLogin(response.data);
            } else {
                setResponseMessage('Erro no login do usuário.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;

            if (error.response.status === 401) {
                setResponseMessage('Credenciais inválidas: ' + errorMessage);
            } else {
                setResponseMessage(`Erro ao conectar ao servidor: ${error.message}`);
            }
        }
    };
    
    
    return (  
        <div className="login-form">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
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
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Fazer Login</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default LoginForm;
