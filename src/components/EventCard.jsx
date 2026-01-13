import React from 'react';

// We no longer receive onJoin function, event data is enough
const EventCard = ({ event }) => {
  return (
    <div className="box">
      <img src={event.img} alt={event.title} />
      
      <h3>{event.title}</h3>
      
      {/* Date and Time */}
      <p style={{ color: '#666', fontSize: '14px' }}>
        📅 {event.date} | ⏰ {event.time}
      </p>
      
      {/* Location Info */}
      <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        <p style={{ fontSize: '15px', color: '#333' }}>
          📍 <b>Location:</b><br/>
          {event.location}
        </p>
      </div>
      
    </div>
  );
};

export default EventCard;