import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// index.css zaten genelde main.jsx veya App.jsx içinde import edildiği için 
// buraya tekrar import etmene gerek yok ama garanti olsun istersen:
import '../index.css'; 

const TransactionHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const storedUser = localStorage.getItem('currentUser');
                
                if (!storedUser) {
                    navigate('/login');
                    return;
                }

                const user = JSON.parse(storedUser);
                const response = await fetch(`http://localhost:3000/user/${user.id}`);

                if (!response.ok) throw new Error('Veri sunucudan çekilemedi.');

                const data = await response.json();

                if (data.success) {
                    const sortedHistory = data.user?.history?.sort((a, b) => b.id - a.id) || [];
                    setHistory(sortedHistory);
                } else {
                    throw new Error(data.message || 'Hata oluştu.');
                }

            } catch (err) {
                console.error("Hata Detayı:", err);
                setError('Geçmiş yüklenirken bir sorun oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    // Hata Durumu
    if (error) {
        return (
            <div className="history-page-wrapper">
                <div className="error-box">
                    <p>{error}</p>
                    <button className="btn-aid" onClick={() => window.location.reload()}>Tekrar Dene</button>
                </div>
            </div>
        );
    }

    return (
        <main className="donation"> {/* Mevcut yapıya uyması için main class'ı */}
            
            {/* Senin index.css'inde zaten var olan page-header yapısı */}
            <div className="page-header">
                <h1>Transaction History</h1>
                <p>Thank you for your generous contributions.</p>
            </div>

            <div className="history-container">
                {loading ? (
                    <div className="loading-state">
                        <p>Loading history...</p>
                    </div>
                ) : history.length > 0 ? (
                    <div className="history-card-glass">
                        <ul className="history-list">
                            {history.map((item) => (
                                <li key={item.id} className="history-item">
                                    <div className="item-info">
                                        <strong className="item-name">{item.productName}</strong>
                                        <span className="item-date">{item.date}</span>
                                    </div>
                                    <div className="item-amount-badge">
                                        {item.amount} Items
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="empty-state-glass">
                        <p>Henüz herhangi bir bağış yapmadınız.</p>
                        <button 
                            className="btn-aid"
                            style={{ maxWidth: '200px', margin: '20px auto' }}
                            onClick={() => navigate('/donation')}
                        >
                            Bağış Yap
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default TransactionHistoryPage;
