import React from 'react';
import './CarListItem.css';
import { type Car } from '../../data/carData';

type CarListItemProps = {
    car: Car;
    t: (key: string) => string;
};

const CarListItem: React.FC<CarListItemProps> = ({ car, t }) => {
    const translatedLocations = car.location
        .map(locKey => t(`mainPage.carList.locations.${locKey}`))
        .join(' | ');
    return (
        <div className="car-list-item">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-details">
                <div className="car-title-container">
                    <h3 className="car-name">{`${car.name} ${car.year}`}</h3>
                    {car.isHot && <span className="hot-deal">{t('mainPage.carList.hot')} 🔥</span>}
                </div>
                <div className="car-tags">
                    {car.tags.map(tag => <span key={tag} className="tag">{t(`mainPage.carList.tags.${tag}`)}</span>)}
                </div>
                <p className="car-location">{t('mainPage.carList.pickup')}: {translatedLocations}</p>
                <div className="car-specs">
                    <span>{car.seats} {t('mainPage.carList.seats')}</span>
                    <span>|</span>
                    <span>{car.doors} {t('mainPage.carList.doors')}</span>
                    <span>|</span>
                    <span>{car.transmission}</span>
                </div>
            </div>
            <div className="car-pricing">
                <div className="price-row">
                    <span>{t('mainPage.carList.daily')}</span>
                    <span className="price-value">${car.price.daily}</span>
                </div>
                <div className="price-row">
                    <span>{t('mainPage.carList.weekly')}</span>
                    <span className="price-value">${car.price.weekly}</span>
                </div>
                <div className="price-row">
                    <span>{t('mainPage.carList.monthly')}</span>
                    <span className="price-value">${car.price.monthly}</span>
                </div>
                <div className="price-row">
                    <span>&gt; 30 {t('mainPage.carList.days')}</span>
                    <span className="price-value">${car.price.longTerm}</span>
                </div>
                <p className="deposit">{t('mainPage.carList.deposit')}: ${car.deposit.toLocaleString()}+</p>
            </div>
        </div>
    );
};

export default CarListItem;