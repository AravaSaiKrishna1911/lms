import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h2>LMS</h2>
            </div>
            
            {/* Grouped all links in one <nav> */}
            <nav className="nav-links">
                <Link to="/courses">Courses</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/contactus">Contact Us</Link>
            </nav>

            <div className="search-bar">
                <input type="text" placeholder="Search courses..." />
            </div>
            <div className="auth-buttons">
                <Link to="/login" className="login-btn">Login</Link>
            </div>
        </header>
    );
};

export default Header;
