import React, { type Dispatch, type SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure this path is correct
import { justRentColors } from '../../theme/colorScheme';
import { useAuth } from '../../context/AuthContext';

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

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/message', { state: { message: 'messagePage.LogoutSuccess' } });
    }

    return (
        <header className="main-header" style={headerStyle}>
            <div className="container">
                <nav className="title-nav">
                    <Link to='/' className="logo">{t('header.companyName')}</Link>
                </nav>
                <nav className="main-nav">
                    <Link to='/'>{t('header.carRental')}</Link>
                    <Link to='/services'>{t('header.otherServices')}</Link>
                    <Link to='/contact-us'>{t('header.contactUs')}</Link>
                    <button
                        className="lang-switch"
                        onClick={() => setLanguage('Chinese')}
                        disabled={language === 'Chinese'} // Disable if current language is Chinese
                    >
                        繁
                    </button>
                    <text> | </text>
                    <button
                        className="lang-switch lang-english"
                        onClick={() => setLanguage('English')}
                        disabled={language === 'English'} // Disable if current language is English
                    >
                        EN
                    </button>

                    {
                        currentUser ? (
                            <>
                                <span className="welcome-message">{t('header.Welcome')}, {currentUser.username}</span>
                                <button onClick={handleLogout} className="logout-btn">{t('header.logout')}</button>
                            </>
                        ) : (
                            <Link to='/login' className="login-btn">{t('header.login')}</Link>
                        )
                    }
                </nav>
            </div>
        </header>
    );
};

export default Header;