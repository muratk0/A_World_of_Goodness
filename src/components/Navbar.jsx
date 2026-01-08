
import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">

            <div className="nav-left">
                <a href="index.html" id="home_page">Home</a>
                <a href="donation.html" id="aid_page">Donation</a>
                <a href="events.html" id="event_page">Events</a>
            </div>

            <div className="center">
                <img src="/images/logo.png" alt="Logo" className="logo" />
                <span>A WORD OF GOODNESS</span>
            </div>

            <div className="nav-right">
                <a href="login.html" id="login_register">Log In</a>
            </div>

        </nav>
    );
};

export default Navbar;
