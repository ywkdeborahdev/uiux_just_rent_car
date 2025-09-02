import React from 'react';

type MainPageProps = {
    language: string;
    t: (key: string) => string; // Add 't' to the props
};

const MainPage: React.FC<MainPageProps> = ({ language, t }) => {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>{t('mainPage.title')}</h1>
            <p style={{ fontSize: '1.2rem' }}>
                {t('mainPage.languageDisplay')}<strong>{language}</strong>
            </p>
        </div>
    );
};

export default MainPage;