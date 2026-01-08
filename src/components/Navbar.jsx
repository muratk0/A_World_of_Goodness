
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">

            <div className="nav-left">
                <Link to="/" id="home_page">Home</Link>
                <a href="#" id="aid_page">Donation</a>
                <a href="#" id="event_page">Events</a>
            </div>

            <div className="center">
                <img src="/images/logo.jpg" alt="Logo" className="logo" />
                <span>A WORD OF GOODNESS</span>
            </div>

            <div className="nav-right">
                <a href="#" id="login_register">Log In</a>
            </div>

        </nav>
    );
};

export default Navbar;
