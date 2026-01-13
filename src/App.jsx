import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//router sayfanın akışını güzelleştiriyo yenilenmeden sayfa akıyo

import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';     

import DonationPage from './pages/DonationPage'; 

import LoginPage from './pages/LoginPage';   

import TransactionHistoryPage from './pages/TransactionHistoryPage';



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

//yani app js de sayfanın akışının iyi olması sayfanın yenilenmemesini ve navbarın sabit kalmasını diğerlerinin tıkladığımızda açılmasını sağladık
//navbarı router üstüne yazdık ki hep o her sayfada olsun
export default App;