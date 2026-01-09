import React, { useState } from 'react';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  // Kontenjanı sildik, yerine rastgele konumlar ekledik
  const [events] = useState([
    { id: 1, category: "ATÖLYE", title: "Renkli Dünyalar: Resim Günü", date: "12 Ocak 2026", time: "14:00", location: "Kadıköy Halk Eğitim Merkezi", img: "/images/atölye.jpg" },
    { id: 2, category: "EĞİTİM", title: "Masal Saati ve Kitap Okuma", date: "15 Ocak 2026", time: "13:30", location: "Beşiktaş İlçe Kütüphanesi", img: "/images/eğitim.jpg" },
    { id: 3, category: "DOĞA", title: "Geleceğe Nefes: Fidan Dikimi", date: "20 Ocak 2026", time: "09:00", location: "Belgrad Ormanı Girişi", img: "/images/doğa.jpg" },
    { id: 4, category: "SOSYAL", title: "Huzurevi Ziyareti ve Sohbet", date: "22 Ocak 2026", time: "11:00", location: "Darülaceze Kurumu", img: "/images/sosyal.jpg" },
    { id: 5, category: "SPOR", title: "Dostluk Maçı: Basketbol Günü", date: "25 Ocak 2026", time: "16:00", location: "Maltepe Sahil Spor Tesisleri", img: "/images/spor.jpg" },
    { id: 6, category: "BESLENME", title: "Mutluluk Çorbası Dağıtımı", date: "30 Ocak 2026", time: "19:00", location: "Üsküdar Meydanı", img: "/images/beslenme.jpg" }
  ]);

  return (
    <main className="donation">
      <div className="page-header">
        <h2>Etkinliklerimize Katılın</h2>
        <p>
          Topluluğumuzu güçlendirmek ve birlikte öğrenmek için düzenlediğimiz 
          atölye çalışmalarını, yardım buluşmalarını ve sosyal etkinlikleri buradan takip edebilirsiniz.
        </p>
      </div>
      
      <section className="box-container">
        {events.map(event => (
          // Artık fonksiyona gerek yok, sadece veriyi gönderiyoruz
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </main>
  );
};

export default EventsPage;