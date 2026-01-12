import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // --- KAYIT OLMA ---
  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. E-posta Kontrolü (Zaten vardı)
    if (!email.includes('@') || !email.includes('.')) {
        alert("Please enter a valid email address! (@ and . symbols are missing)");
        return; 
    }

   
    // Eğer şifre 6 karakterden kısaysa uyarı ver ve işlemi durdur.
    if (password.length < 6) {
        alert("Şifre en az 6 karakter olmalıdır!");
        return; 
    }

    console.log("Kayıt işlemi başlatılıyor..."); 

    const name = email.split('@')[0];

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      console.log("Server Cevabı:", result); 

      if (result.success) {
        alert("✅ Kayıt Başarılı! Veritabanına işlendi.");
        setActiveTab('login');
      } else {
        alert("❌ Hata: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Server'a ulaşılamadı! Terminal açık mı?");
    }
  };

  // --- GİRİŞ YAPMA ---
  const handleLogin = async (e) => {
    e.preventDefault();

    // Giriş yaparken de mail formatı kontrolü
    if (!email.includes('@') || !email.includes('.')) {
        alert("Please enter a valid email address! (@ and . symbols are missing)");
        return; 
    }
    

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Giriş Başarılı!");
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        navigate('/donation');
      } else {
        alert("❌ Hata: " + result.message);
      }
    } catch (error) {
      alert("⚠️ Bağlantı hatası!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="tabs">
            <button className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Giriş Yap</button>
            <button className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Kaydol</button>
          </div>

          <form className="login-form" onSubmit={activeTab === 'login' ? handleLogin : handleRegister}>
            <div className="input-field">
              <label>E-posta</label>
              <div className="input-group">
                <input 
                    type="email" 
                    placeholder="E-posta" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>
            <div className="input-field">
              <label>Şifre</label>
              <div className="input-group">
                <input 
                    type="password" 
                    placeholder="Şifre" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>
            <button type="submit" className="btn-submit">{activeTab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;