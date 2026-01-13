import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';     // (Eğer bu dosya varsa)

import DonationPage from './pages/DonationPage'; // (Eğer bu dosya varsa)

import LoginPage from './pages/LoginPage';   // YENİ EKLEDİĞİMİZ SAYFA

import TransactionHistoryPage from './pages/TransactionHistoryPage';

import './App.css'; // Veya './index.css' hangisini kullanıyorsan

import EventsPage from './pages/EventsPage';



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





            {/* Giriş Sayfası - ARTIK GERÇEK SAYFAYA BAĞLI */}

            <Route path="/login" element={<LoginPage />} />

            <Route path="/history" element={<TransactionHistoryPage />} />

            <Route path="/events" element={<EventsPage />} />

          </Routes>

        </main>

      </div>

    </Router>

  );

}



export default App;