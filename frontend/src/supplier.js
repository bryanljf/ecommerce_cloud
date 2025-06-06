import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Supplier = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        itemID: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [products, setProducts] = useState([]); // Lista de produtos
    const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores

    
        // Carregar produtos
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products/all');
            setProducts(response.data); // Assume que a resposta é uma lista de produtos
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    // Carregar fornecedores
    const fetchSuppliers = async () => {
        const Token = localStorage.getItem('Token');
        const headers = {
            'authorization': `Bearer ${Token}`
            }
        try {
            const response = await axios.get('http://localhost:8080/suppliers/all', { headers: headers }); 
               setSuppliers(response.data); 
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
        }
    };
        
    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

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
                'Authorization': `Bearer ${Token}`
            };

            const response = await axios.post('http://localhost:8080/suppliers/newsupplier', formData, { headers });

            if (response.status === 200) {
                setResponseMessage('Fornecedor criado com sucesso!');
            } else {
                setResponseMessage('Erro na criação de um novo fornecedor.');
            }
            fetchSuppliers();
        } catch (error) {
            setResponseMessage(`Erro ao conectar ao servidor: ${error.message}`);
        }
    };

    return (
        <div className="supplier-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            {/* Formulário de Criação de Fornecedor */}
            <div className="create-supplier-form" style={{ flex: 1, marginRight: '20px' }}>
                <h3>Criar Novo Fornecedor</h3>
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
                        <label>Produto Fornecido:</label>
                        <br></br>
                        <select
                            name="itemID"
                            value={formData.itemID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um Produto</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Criar Fornecedor</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>

            {/* Exibir Fornecedores Cadastrados */}
            <div className="supplier-list" style={{ flex: 1 }}>
                <h4>Fornecedores Cadastrados:</h4>
                <ul>
                    {suppliers.map((supplier) => (
                        <li key={supplier.id}>
                            {supplier.name} - {supplier.email} - Fornece (ID): {supplier.itemID}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Supplier;
