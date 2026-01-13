import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' //doma monte ettik 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//bu dosyanın tek bir amacı var o da yazdığımız tüm react dosyalarını
// safarinin anlıcağı şekilde html e çevirmek ve ekrana basmak