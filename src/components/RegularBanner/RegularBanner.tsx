import React from 'react';
import './RegularBanner.css'; // We will create this next
import RegularBannerImage from '../../assets/RegularBanner.png';

const RegularBanner: React.FC = () => {
    // Use inline style to set the background image dynamically
    const bannerStyle = {
        backgroundImage: `url(${RegularBannerImage})`,
    };

    return (
        <div className="shared-banner" style={bannerStyle}>
        </div>
    );
};

export default RegularBanner;