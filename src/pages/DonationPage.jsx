import React, { useState, useEffect } from 'react';
import DonationCard from '../components/DonationCard';

const DonationPage = () => {
  // Başlangıçta liste boş, Server'dan gelince dolacak
  const [donations, setDonations] = useState([]);

  // 1. Sayfa Açılınca: Server'a git, ürünleri getir (GET)
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setDonations(data)) // Gelen veriyi hafızaya at
      .catch(err => console.error("Ürünler çekilemedi:", err));
  }, []);

  // 2. Bağış Butonuna Basınca: Server'a bildir (POST)
  const handleAid = async (productId) => {
    // Önce giriş yapmış mı diye bakıyoruz
    const storedUser = localStorage.getItem('currentUser');
    
    if (!storedUser) {
      alert("⚠️ Bağış yapmak için önce GİRİŞ YAPMALISIN!");
      return; // Giriş yoksa işlemi durdur
    }
    
    const user = JSON.parse(storedUser);

    try {
      // Backend'e istek atıyoruz: "Bu kişi, şu üründen 1 tane aldı"
      const response = await fetch('http://localhost:3000/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId, amount: 1 })
      });

      const result = await response.json();

      if (result.success) {
        alert("❤️ Bağışınız alındı! Allah kabul etsin.");
        
        // Sayfayı yenilemeden ekrandaki stok sayısını güncelle
        setDonations(prev => prev.map(item => 
          item.id === productId ? { ...item, stock: result.newStock } : item
        ));
      } else {
        alert("Hata: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Sunucuyla bağlantı koptu!");
    }
  };

  return (
    <main className="donation">
      <h1>Donation Page</h1>
      <section className="box-container">
        {/* Eğer ürünler geldiyse listele, gelmediyse 'Yükleniyor' yaz */}
        {donations.length > 0 ? (
          donations.map(item => (
            <DonationCard key={item.id} item={item} onAidClick={handleAid} />
          ))
        ) : (
          <p style={{textAlign:'center', fontSize: '1.2rem'}}>
            Ürünler yükleniyor... <br/>
            <span style={{fontSize:'0.8rem'}}>(Görünmüyorsa server kapalı olabilir)</span>
          </p>
        )}
      </section>
    </main>
  );
};

export default DonationPage;