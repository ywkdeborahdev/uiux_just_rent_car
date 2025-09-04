import React from 'react';
import './CarDetailBanner.css';
import SearchBannerImg from '../../assets/SearchBanner.png'; // Background

type CarDetailBannerProps = {
    carImage: string; // Foreground car image
    carName: string;
};

const CarDetailBanner: React.FC<CarDetailBannerProps> = ({ carImage, carName }) => {
    const bannerStyle = {
        backgroundImage: `url(${SearchBannerImg})`,
    };

    return (
        <div className="car-detail-banner" style={bannerStyle}>
            <div className="banner-overlay"></div>
            <img src={carImage} alt={carName} className="overlay-car-image" />
        </div>
    );
};

export default CarDetailBanner;
