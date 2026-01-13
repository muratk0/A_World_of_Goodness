import React, { useState, useEffect } from 'react';
import DonationCard from '../components/DonationCard';
import PaymentModal from '../components/PaymentModal'; // Modal'ı ekledik

const DonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // 1. Yardımcı bir asenkron fonksiyon tanımlıyoruz
    const fetchProducts = async () => {
      try {
        // Bekle (await) ve veriyi çek
        const res = await fetch('http://localhost:3000/products');
        
        // Bekle (await) ve JSON'a çevir
        const data = await res.json();
        
        // Hafızaya at
        setDonations(data);
      } catch (err) {
        // Hata varsa yakala
        console.error("Ürünler çekilemedi:", err);
      }
    };

    // 2. Fonksiyonu hemen çalıştırıyoruz
    fetchProducts();
  }, []);

  // "Aid" butonuna basınca modal'ı açar
  const openPaymentModal = (productId) => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      alert("⚠️ Please LOG IN to make a donation!");
      return;
    }
    const item = donations.find(d => d.id === productId);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Modal içindeki "Confirm" butonuna basınca çalışır
  const handleFinalDonation = async (productId) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    try {
      const response = await fetch('http://localhost:3000/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId, amount: 1 })
      });

      const result = await response.json();

      if (result.success) {
        alert("❤️ Donation successful! ");
        setIsModalOpen(false); // Modal'ı kapat
        
        setDonations(prev => prev.map(item => 
          item.id === productId ? { ...item, stock: result.newStock } : item
        ));
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Connection to server lost!");
    }
  };

  return (
    <main className="donation">
      <div className="page-header">
        <h1>Extend a Helping Hand</h1>
        <p>Even the smallest donation can spark a massive wave of hope. Your contribution today triggers the big change we wish to see in the world.</p>
      </div>

      <section className="box-container">
        {donations.map(item => (
          <DonationCard key={item.id} item={item} onAidClick={openPaymentModal} />
        ))}
      </section>

      {/* Payment Modal Bileşeni */}
      {selectedItem && (
        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleFinalDonation}
          item={selectedItem}
        />
      )}
    </main>
  );
};

export default DonationPage;