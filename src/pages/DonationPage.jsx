import React, { useState } from 'react';
import DonationCard from '../components/DonationCard';

const DonationPage = () => {
  // Senin ürün listen (Dinamik olması için useState kullandık)
  const [donations, setDonations] = useState([
    { id: 1, category: "BAG", title: "Bag Donation", price: "₺500.00", stock: 200, img: "/images/canta.png" },
    { id: 2, category: "SHOE", title: "Shoe Donation", price: "₺2300.00", stock: 150, img: "/images/ayakkabı.png" },
    { id: 3, category: "BOAT", title: "Boat Donation", price: "₺2000.00", stock: 150, img: "/images/bot.png" },
    { id: 4, category: "COAT", title: "Coat Donation", price: "₺1500.00", stock: 150, img: "/images/mont.png" },
    { id: 5, category: "NOTEBOOK", title: "Notebook Donation", price: "₺150.00", stock: 500, img: "/images/defter.png" },
    { id: 6, category: "COLERED PENCIL", title: "Colored Pencil Donation", price: "₺580.00", stock: 400, img: "/images/kalem.png" },
    { id: 7, category: "COLORING BOOK", title: "Coloring Book Donation", price: "₺70.00", stock: 300, img: "/images/boyama.png" },
    { id: 8, category: "BOOK", title: "Book Donation", price: "₺350.00", stock: 150, img: "/images/kitap.png" }
  ]);

  const handleAid = (id) => {
    // Şimdilik sadece frontend'de stoğu düşürüyoruz. 
    // Arkadaşın 'services' kodunu bitirince buraya ekleme yapacak.
    setDonations(donations.map(item => 
      item.id === id ? { ...item, stock: item.stock - 1 } : item
    ));
    alert("Bağışınız için teşekkürler!");
  };

  return (
    <main className="donation">
      <h1>Donation Page</h1>
      <section className="box-container">
        {donations.map(item => (
          <DonationCard key={item.id} item={item} onAidClick={handleAid} />
        ))}
      </section>
    </main>
  );
};

export default DonationPage;