import React from 'react';

const InfoCard = ({ icon, title, text }) => {
  return (
    <div className="info-box">
      <div className="info-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default InfoCard;