import React, { type Dispatch, type SetStateAction } from 'react';
import './Header.css'; // Make sure this path is correct
import { justRentColors } from '../../theme/colorScheme';

// Define the type for the props the component will receive
type HeaderProps = {
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    t: (key: string) => string; // Add 't' to the props
};

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {

    const headerStyle = {
        backgroundColor: justRentColors.primary.light, // Use the primary light color
    };
    return (
        <header className="main-header" style={headerStyle}>
            <div className="container">
                <h1 className="logo">JUST RENT</h1>
                <nav className="main-nav">
                    <a href="#">{t('header.carRental')}</a>
                    <a href="#">{t('header.otherServices')}</a>
                    <a href="#">{t('header.contactUs')}</a>
                    <button
                        className="lang-switch"
                        onClick={() => setLanguage('Chinese')}
                        disabled={language === 'Chinese'} // Disable if current language is Chinese
                    >
                        繁
                    </button>
                    <text> | </text>
                    <button
                        className="lang-switch"
                        onClick={() => setLanguage('English')}
                        disabled={language === 'English'} // Disable if current language is English
                    >
                        EN
                    </button>
                    <a href="#" className="login-btn">{t('header.login')}</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;