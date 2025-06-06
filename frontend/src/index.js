import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importação do arquivo de estilos globais
import App from './App'; // Importação do componente principal da aplicação

// Seleciona o elemento HTML com ID "root" como contêiner principal
const rootElement = document.getElementById('root');

// Cria a raiz do React e renderiza o componente App dentro dela
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
