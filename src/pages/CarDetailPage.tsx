import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CarDetailBanner from '../components/CarDetailBanner/CarDetailBanner';
import { cars } from '../data/carData';
import './CarDetailPage.css';

// Simple icons for UI clarity
const DoorIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"></path><path d="M10 12h.01"></path></svg>;
const SeatIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>;
const TransmissionIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="21" x2="12" y2="15"></line><line x1="12" y1="9" x2="12" y2="3"></line><line x1="21" y1="12" x2="15" y2="12"></line><line x1="9" y1="12" x2="3" y2="12"></line></svg>;


type CarDetailPageProps = {
    t: (key: string) => string;
};

const CarDetailPage: React.FC<CarDetailPageProps> = ({ t }) => {
    const { carId } = useParams<{ carId: string }>();
    const car = cars.find(c => c.id === parseInt(carId || ''));

    if (!car) {
        return <div>{t('carDetailPage.carNotFound')}</div>;
    }

    // Helper to translate transmission type
    const getTranslatedTransmission = (transmission: string) => {
        if (transmission.toLowerCase() === 'automatic') {
            return t('carDetailPage.transmissionAuto');
        }
        if (transmission.toLowerCase() === 'manual') {
            return t('carDetailPage.transmissionManual');
        }
        return transmission;
    };

    const translatedLocations = car.location
        .map(locKey => t(`mainPage.carList.locations.${locKey}`))
        .join(' | ');

    return (
        <div>
            <CarDetailBanner carImage={car.image} carName={car.name} />
            <div className="car-detail-container">
                <div className="car-detail-content">
                    {/* --- Top Header --- */}
                    <div className="car-detail-header">
                        <h2>{car.name} {car.year}</h2>
                        <div className="car-tags">
                            {car.tags.map(tag => <span key={tag} className="tag">{t(`mainPage.carList.tags.${tag}`)}</span>)}
                        </div>
                    </div>

                    {/* --- Main Body (2 Columns) --- */}
                    <div className="car-detail-body">

                        {/* --- Left Panel --- */}
                        <div className="left-panel">
                            <div className="info-and-specs-grid">
                                <div className="info-section">
                                    <p><strong>{t('carDetailPage.pickupLocation')}:</strong> {translatedLocations}</p>
                                    <p><strong>{t('carDetailPage.fuelPolicy')}:</strong> {t('carDetailPage.fuelPolicyText')}</p>
                                    <div className="support-section">
                                        <p><strong>{t('carDetailPage.otherSupport')}:</strong></p>
                                        <ul>
                                            <li>✓ {t('carDetailPage.supportClean')}</li>
                                            <li>✓ {t('carDetailPage.supportLicenseFee')}</li>
                                            <li>✓ {t('carDetailPage.supportInsurance')}</li>
                                            <li>✓ {t('carDetailPage.supportDashcam')}</li>
                                            <li>✓ {t('carDetailPage.supportAccessories')}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="specs-section">
                                    <div className="spec-item"><DoorIcon /> {car.doors} {t('mainPage.carList.doors')}</div>
                                    <div className="spec-item"><SeatIcon /> {car.seats} {t('mainPage.carList.seats')}</div>
                                    <div className="spec-item"><TransmissionIcon /> {getTranslatedTransmission(car.transmission)}</div>
                                </div>
                            </div>
                            <div className="car-detail-actions">
                                <button className="book-now-btn">{t('carDetailPage.bookNow')}</button>
                                <Link to="/contact-us" className="enquiry-btn">{t('carDetailPage.enquiry')}</Link>
                            </div>
                        </div>

                        {/* --- Right Panel --- */}
                        <div className="right-panel">
                            <div className="pricing-section">
                                <div className="price-row">
                                    <span>{t('mainPage.carList.daily')}</span>
                                    <span>${car.price.daily}</span>
                                </div>
                                <div className="price-row">
                                    <span>{t('mainPage.carList.weekly')}</span>
                                    <span>${car.price.weekly}</span>
                                </div>
                                <div className="price-row">
                                    <span>{t('mainPage.carList.monthly')}</span>
                                    <span>${car.price.monthly}</span>
                                </div>
                                <div className="price-row">
                                    <span>&gt; 30 {t('mainPage.carList.days')}</span>
                                    <span>${car.price.longTerm}</span>
                                </div>
                            </div>
                            <div className="policy-section">
                                <h4>{t('carDetailPage.depositPolicy')}:</h4>
                                <p>{t('carDetailPage.depositPolicyFullLicense')}</p>
                                <p>{t('carDetailPage.depositPolicyPLicense')}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- Bottom Remarks --- */}
                    <div className="remarks-section">
                        <p><strong>{t('carDetailPage.remarks')}:</strong> {t('carDetailPage.remarksText')}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;