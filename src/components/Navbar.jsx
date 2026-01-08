import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        
        <header className="navbar">

            
            <nav className="nav-left">
                {/* 3. Link kullanımı: Sayfa yenilenmeden geçiş sağlar */}
                <Link to="/" id="home_page">Home</Link>
                
                {/* 4. 'a href' yerine 'Link to' yaparak router'a bağladık */}
                <Link to="/donation" id="aid_page">Donation</Link>
                <Link to="/events" id="event_page">Events</Link>
            </nav>

            <div className="center">
                <img src="/images/logo.jpg" alt="Logo" className="logo" />
                <span>A WORD OF GOODNESS</span>
            </div>

            <div className="nav-right">
                {/* 5. Login linkini de router'a bağladık */}
                <Link to="/login" id="login_register">Log In</Link>
            </div>

        </header>
    );
};

export default Navbar;
