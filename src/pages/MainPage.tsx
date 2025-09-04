import React from 'react';
import SearchBanner from '../components/SearchBanner/SearchBanner';

type MainPageProps = {
    t: (key: string) => string; // Add 't' to the props
};

const title: any = {
    titleOne: "mainPage.titleOne",
    titleTwo: "mainPage.titleTwo"
}
const MainPage: React.FC<MainPageProps> = ({ t }) => {
    return (
        <div>
            <SearchBanner title={title} t={t} />
        </div>
    );
};

export default MainPage;