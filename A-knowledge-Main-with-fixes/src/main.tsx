import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { init } from '@emailjs/browser';
import App from './App.tsx';
import './index.css';
import './i18n';

// Initialiser EmailJS avec votre clé publique
init("E5K2kF3SrUELo6U9C");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);