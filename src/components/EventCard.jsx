import React from 'react';

// Artık onJoin fonksiyonunu almıyoruz, sadece event verisi yeterli
const EventCard = ({ event }) => {
  return (
    <div className="box">
      <img src={event.img} alt={event.title} />
      
      <h3>{event.title}</h3>
      
      {/* Tarih ve Saat */}
      <p style={{ color: '#666', fontSize: '14px' }}>
        📅 {event.date} | ⏰ {event.time}
      </p>
      
     

      {/* Konum Bilgisi (Yeni Eklenen Kısım) */}
      <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        <p style={{ fontSize: '15px', color: '#333' }}>
          📍 <b>Konum:</b><br/>
          {event.location}
        </p>
      </div>
      
    </div>
  );
};

export default EventCard;