import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onConfirm, item }) => {
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kart numarası uzunluk kontrolleri (Ekstra güvenlik için)
    if(cardData.number.length < 16 || cardData.expiry.length < 4 || cardData.cvv.length < 3) {
        alert("Lütfen kart bilgilerini eksiksiz doldurun.");
        return;
    }
    onConfirm(item.id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h3>Complete Your Donation</h3>
        <p className="modal-subtitle">You are donating for: <strong>{item.title}</strong></p>
        
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="input-group">
            <label>Card Number</label>
            <input 
              type="text" 
              placeholder="0000 0000 0000 0000" 
              required 
              value={cardData.number} // Inputu state'e bağladık
              onChange={(e) => {
                // Sadece sayıları al, harfleri sil ve 16 karakterle sınırla
                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                setCardData({...cardData, number: val});
              }}
            />
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Expiry Date</label>
              <input 
                type="text" 
                placeholder="MMAA" // Ay ve Yıl (4 hane)
                required 
                value={cardData.expiry}
                onChange={(e) => {
                    // Sadece sayı, max 4 karakter
                    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setCardData({...cardData, expiry: val});
                }}
              />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input 
                type="text" 
                placeholder="123" 
                required 
                value={cardData.cvv}
                onChange={(e) => {
                    // Sadece sayı, max 3 karakter
                    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
                    setCardData({...cardData, cvv: val});
                }}
              />
            </div>
          </div>
          <button type="submit" className="btn-submit">Confirm and Pay ₺{item.price}</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;