import React from 'react';
import './SearchBanner.css'; // We will create this next
import SearchBannerImg from '../../assets/SearchBanner.png';


// The banner can take a title and an image URL as props
type SearchBannerProps = {
    title: string;
};

const SearchBanner: React.FC<SearchBannerProps> = ({ title }) => {
    // Use inline style to set the background image dynamically
    const bannerStyle = {
        backgroundImage: `url(${SearchBannerImg})`,
    };

    return (
        <div className="shared-banner" style={bannerStyle}>
            <div className="banner-overlay"></div>
            <h1 className="banner-title">{title}</h1>
        </div>
    );
};

export default SearchBanner;