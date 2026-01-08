import React, { useState } from 'react';
// DİKKAT: Navbar importunu buradan kaldırdık çünkü App.jsx zaten yönetiyor.

const LoginPage = () => {
  // Hangi tabın (Giriş veya Kayıt) aktif olduğunu tutan state
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="login-page">
      {/* Navbar BURADAN SİLİNDİ */}

      <div className="login-container">
        <div className="login-box">
          
          {/* SEKMELER (Giriş Yap / Kaydol Butonları) */}
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} 
              onClick={() => setActiveTab('login')}
            >
              Giriş Yap
            </button>
            <button 
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`} 
              onClick={() => setActiveTab('register')}
            >
              Kaydol
            </button>
          </div>

          {/* GİRİŞ YAP FORMU */}
          {activeTab === 'login' && (
            <form className="login-form" id="login-form">
              <div className="input-field">
                <label>E-posta Adresi</label>
                <div className="input-group">
                  <input type="email" placeholder="E-postanızı giriniz" required />
                </div>
              </div>
              <div className="input-field">
                <label>Şifre</label>
                <div className="input-group">
                  <input type="password" placeholder="Şifrenizi giriniz" required />
                </div>
              </div>
              <button type="submit" className="btn-submit">Giriş Yap</button>
            </form>
          )}

          {/* KAYDOL FORMU (Sadece Mail ve Şifre) */}
          {activeTab === 'register' && (
            <form className="login-form" id="register-form">
              <div className="input-field">
                <label>E-posta</label>
                <div className="input-group">
                  <input type="email" placeholder="E-posta" required />
                </div>
              </div>
              <div className="input-field">
                <label>Şifre</label>
                <div className="input-group">
                  <input type="password" placeholder="Şifre" required />
                </div>
              </div>
              <button type="submit" className="btn-submit">Kayıt Ol</button>
            </form>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;