import React, { useState } from 'react';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  // Butona basıldığında çalışacak fonksiyonlar
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Giriş yapma isteği gönderildi!");
    // Arkadaşın servisleri bitirince buraya ekleme yapacak
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Kayıt olma isteği gönderildi!");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <article className="login-box">
          {/* Sekmeler */}
          <header className="tabs">
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
          </header>

          {/* GİRİŞ YAP FORMU */}
          {activeTab === 'login' && (
            <form className="login-form" onSubmit={handleLogin}>
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

          {/* KAYDOL FORMU */}
          {activeTab === 'register' && (
            <form className="login-form" onSubmit={handleRegister}>
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
        </article>
      </div>
    </div>
  );
};

export default LoginPage;