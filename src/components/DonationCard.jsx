import React from 'react';

const DonationCard = ({ item, onAidClick }) => {
  return (
    <article className="box">
      {/* HEADER: Resim ve Başlık */}
      <header className="box-head">
        <img src={item.img} alt={item.title} />
        <div className="card-details">
          <span className="category-tag">{item.category || "BAĞIŞ"}</span>
          <h3>{item.title}</h3>
        </div>
      </header>

      {/* BODY: Fiyat ve Stok */}
      <div className="box-info">
        <div className="price">₺{item.price}</div>
        <div className="stock">
            Needed: <span>{item.stock}</span>
        </div>
      </div>

      {/* FOOTER: Buton */}
      <footer className="box-bottom">
        <button className="btn-aid" onClick={() => onAidClick(item.id)}>
          Aid 
        </button>
      </footer>
    </article>
  );
};

export default DonationCard;