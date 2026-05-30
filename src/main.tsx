import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Punto de entrada principal de la aplicación.
// Se monta el componente raíz <App> dentro del elemento con id "root" del HTML.
// StrictMode activa verificaciones adicionales en desarrollo para detectar problemas potenciales.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
