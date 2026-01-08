import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DonationPage from './pages/DonationPage'; // Donation sayfasını ekledik
import './App.css';

function App() {
  return (
    <Router>
      <>
        
        <header>
          <Navbar />
        </header>

        
        <main>
          <Routes>
            {/* Ana Sayfa */}
            <Route path="/" element={<HomePage />} />
            
            {/* Bağış Sayfası */}
            <Route path="/donation" element={<DonationPage />} />
            
            {/* Etkinlikler Sayfası (Henüz yapmadıysan geçici bir yazı görünür) */}
            <Route path="/events" element={<div style={{textAlign:'center', padding:'50px'}}>Events Page (Yakında)</div>} />
            
            {/* Giriş Sayfası (Henüz yapmadıysan) */}
            <Route path="/login" element={<div style={{textAlign:'center', padding:'50px'}}>Login Page (Yakında)</div>} />
          </Routes>
        </main>
      </>
    </Router>
  );
}

export default App;