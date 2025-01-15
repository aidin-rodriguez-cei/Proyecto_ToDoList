import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import '../src/css/style.css'; // Asegúrate de que el CSS esté cargado correctamente
import { ModoOscuroProvider } from './context/ModoOscuroContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModoOscuroProvider>
      <App />
    </ModoOscuroProvider>
  </React.StrictMode>
);
