import React from 'react';

const DonationCard = ({ item, onAidClick }) => {
  return (
    <article className="box">
      {/* Hocanın istediği Semantic Header */}
      <header className="box-head">
        <img src={item.img} alt={item.title} />
        <span className="donation-category" style={{fontSize: '0.8rem', color: '#666'}}>{item.category}</span>
        <h3>{item.title}</h3>
      </header>

      <div className="box-info">
        <div className="price">{item.price}</div>
        <div className="stock">Needed: <span>{item.stock}</span></div>
      </div>

      <footer className="box-bottom">
        <button className="btn" onClick={() => onAidClick(item.id)}>
          aid
        </button>
      </footer>
    </article>
  );
};

export default DonationCard;