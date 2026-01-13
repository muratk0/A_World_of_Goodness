import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import './Navbar.css'; // REMOVED: Styles consolidated in index.css


//Navbar! Şu an adres çubuğunda ne yazıyor (URL ne)? /login mi, /home mu? Bana anlık olarak haber ver
const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Sayfa değişimini anlık yakalamak için

    // Sayfa her değiştiğinde (veya ilk açıldığında) giriş yapılmış mı kontrol et

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location]);

    // Çıkış yap butonuna basılınca çalışacak fonksiyon
    const handleLogout = () => {
        localStorage.removeItem('currentUser'); // Hafızadan sil
        setUser(null); // State'i sıfırla
        navigate('/login'); // Giriş sayfasına yönlendir
        alert("Başarıyla çıkış yapıldı.");
    };

    return (
        /*Menünün sol tarafındaki tıklanabilir yazılar. */
        <header className="navbar">
            <nav className="nav-left">
                <Link to="/" id="home_page">Home</Link>
                <Link to="/donation" id="aid_page">Donation</Link>
                <Link to="/events" id="event_page">Events</Link>
            </nav>

            <div className="center">
                <img src="/images/logo.jpg" alt="Logo" className="logo" />
                <span>A WORD OF GOODNESS</span>
            </div>

            <div className="nav-right">
                {user ? (
                    /* Kullanıcı varsa: Çıkış Yap (Logout) göster */
                    <>
                        <Link to="/history" style={{ marginRight: '20px', textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>Transaction History</Link>
                        <span
                            onClick={handleLogout}
                            id="logout_btn"
                            style={{ cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
                        >
                            Logout
                        </span>
                    </>
                ) : (
                    /* Kullanıcı yoksa: Giriş Yap (Log In) göster */
                    <Link to="/login" id="login_register">Log In</Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;