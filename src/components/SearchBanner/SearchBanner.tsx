import React from 'react';
import './SearchBanner.css'; // We will create this next
import SearchBannerImg from '../../assets/SearchBanner.png';


// The banner can take a title and an image URL as props
type SearchBannerProps = {
    t: (key: string) => string;
    title: any;
};

const SearchBanner: React.FC<SearchBannerProps> = ({ title, t }) => {
    // Use inline style to set the background image dynamically
    const bannerStyle = {
        backgroundImage: `url(${SearchBannerImg})`,
    };

    return (
        <div className="search-banner" style={bannerStyle}>
            <div className="banner-overlay"></div>
            <h1 className="banner-title">{t(title.titleOne)}</h1>
            <div className="empty-space"></div>
            <h1 className="banner-title">{t(title.titleTwo)}</h1>
        </div>
    );
};

export default SearchBanner;