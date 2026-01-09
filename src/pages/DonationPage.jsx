import React, { useState, useEffect } from 'react';
import DonationCard from '../components/DonationCard';
import PaymentModal from '../components/PaymentModal'; // Modal'ı ekledik

const DonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setDonations(data))
      .catch(err => console.error("Ürünler çekilemedi:", err));
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
        alert("❤️ Donation successful! May Allah reward you.");
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
        <p>A small donation can trigger a big change.</p>
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