import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';     // (Eğer bu dosya varsa)
import DonationPage from './pages/DonationPage'; // (Eğer bu dosya varsa)
import LoginPage from './pages/LoginPage';   // YENİ EKLEDİĞİMİZ SAYFA
import './App.css'; // Veya './index.css' hangisini kullanıyorsan

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar'ı buraya koyduğumuz için her sayfada otomatik görünecek */}
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            {/* Ana Sayfa */}
            <Route path="/" element={<HomePage />} />
            
            {/* Bağış Sayfası */}
            <Route path="/donation" element={<DonationPage />} />
            
            {/* Etkinlikler (Geçici) */}
            <Route path="/events" element={<div style={{textAlign:'center', padding:'50px'}}>Events Page (Yakında)</div>} />
            
            {/* Giriş Sayfası - ARTIK GERÇEK SAYFAYA BAĞLI */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;