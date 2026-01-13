import React, { useState, useEffect } from 'react';
//use state hafıza şuan kim log in yapmış
//use effect mesela sayfa değiştiğinde devreye girer 
import { Link, useNavigate, useLocation } from 'react-router-dom';
//useNavigate kullanıcıyı zorla götürür mesela üye oldun git bağıl yap


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
        setUser(null); // navbarı sıfırla
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

//Sürekli Kontrol: Sayfa her değiştiğinde Giriş yapıldı mı? diye bakar (useEffect)
//Karar Verir: Giriş yapılmışsa sağ üstte ismini ve çıkış butonunu gösterir; yapılmamışsa "Log In" butonunu gösterir.
//Yönlendirir: Linklere tıklandığında sayfayı yenilemeden diğer sayfalara geçişi sağlar.