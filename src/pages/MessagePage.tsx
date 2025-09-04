import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import RegularBanner from '../components/RegularBanner/RegularBanner';
import './MessagePage.css';

// 1. Define the props type
type MessagePageProps = {
    t: (key: string) => string;
};

const MessagePage: React.FC<MessagePageProps> = ({ t }) => { // 2. Accept 't' as a prop
    const location = useLocation();
    // 3. Use the translation key for the fallback message
    const message = t(location.state?.message) ?? t('messagePage.defaultMessage');

    return (
        <div>
            <RegularBanner />
            <div className="message-container">
                <div className="message-box">
                    {/* 4. Use translation keys for the title and button */}
                    <h2>{t('messagePage.title')}</h2>
                    <p>{message}</p>
                    <Link to="/" className="continue-button">
                        {t('messagePage.continueButton')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;