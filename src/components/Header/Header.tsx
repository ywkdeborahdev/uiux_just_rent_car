import React from 'react';
import './Header.css'; // Make sure this path is correct

const Header: React.FC = () => {
    return (
        <header className="main-header">
            <div className="container">
                <h1 className="logo">JUST RENT</h1>
                <nav className="main-nav">
                    <a href="#">汽車租賃</a>
                    <a href="#">其他服務</a>
                    <a href="#">聯絡我們</a>
                    <a href="#">简</a>
                    <a href="#">EN</a>
                    <a href="#" className="login-btn">登入</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;