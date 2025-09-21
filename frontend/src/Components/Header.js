import React from 'react';
import logo from '../logo.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';
import Login from './Login';
import './Header.css';
function Home() {
    return (
        <div className="main_page">
            <h1 style={{ textAlign: "center"}}>Connect. Engage. Grow.</h1>;
            <p>A centralized digital platform for alumni networking,</p>
            <p>mentorship, and lifelong learning</p>
        </div>
    );
}

function About() {
    return <div className="main_page"> <h1>About Page</h1></div>;
}

export default function Header() {
    return (
        <BrowserRouter>
            <nav className="nav_header">
                <div className="left"> 
                    <img src={logo} alt="Website Logo" style={{ height: '30px'}} />
                    <Link to="/" className="nav-link" style={{fontFamily: "sans-serif",fontSize: "30px"}}>AlumniNexus</Link>
                </div>
                <div className="right">
                    <Link to="/login"  className="nav-link">Login</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>
        </BrowserRouter>
    );
}