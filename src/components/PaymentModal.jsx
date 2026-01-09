import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onConfirm, item }) => {
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada kart doğrulama simüle edilebilir
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
              type="text" placeholder="0000 0000 0000 0000" required 
              onChange={(e) => setCardData({...cardData, number: e.target.value})}
            />
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Expiry Date</label>
              <input 
                type="text" placeholder="MM/YY" required 
                onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input 
                type="text" placeholder="123" required 
                onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
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