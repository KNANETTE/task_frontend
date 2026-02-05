import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router";
import "./styles/global.css"


const root = document.getElementById("root");

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
