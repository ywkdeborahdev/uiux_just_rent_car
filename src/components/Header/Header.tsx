import React from 'react';
import './Header.css'; // Make sure this path is correct
import { justRentColors } from '../../theme/colorScheme';

const Header: React.FC = () => {

    const headerStyle = {
        backgroundColor: justRentColors.primary.light, // Use the primary light color
    };
    return (
        <header className="main-header" style={headerStyle}>
            <div className="container">
                <h1 className="logo">JUST RENT</h1>
                <nav className="main-nav">
                    <a href="#">汽車租賃</a>
                    <a href="#">其他服務</a>
                    <a href="#">聯絡我們</a>
                    <a id='langChi' href="#">繁</a>
                    <text> | </text>
                    <a id='langEng' href="#">EN</a>
                    <a href="#" className="login-btn">登入</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;