import React from 'react';
import './BookingStep3.css';
import { type Car } from '../../data/carData';

const DoorIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"></path><path d="M10 12h.01"></path></svg>;
const SeatIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>;
const TransmissionIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="21" x2="12" y2="15"></line><line x1="12" y1="9" x2="12" y2="3"></line><line x1="21" y1="12" x2="15" y2="12"></line><line x1="9" y1="12" x2="3" y2="12"></line></svg>;

type BookingStep3Props = {
    car: Car;
    t: (key: string) => string;
    contactData: any;
    bookingDetails: any;
    paymentData: any;
    totalPrice: number;
    errors: { [key: string]: string };
    handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePaymentBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const BookingStep3: React.FC<BookingStep3Props> = ({ car, t, contactData, bookingDetails, paymentData, totalPrice, errors, handlePaymentChange, handlePaymentBlur }) => {

    const getTranslatedTransmission = (transmission: string) => {
        return transmission.toLowerCase() === 'automatic' ? t('carDetailPage.transmissionAuto') : transmission;
    };
    const formatDate = (date: Date) => date.toLocaleDateString('en-CA');

    return (
        <div className="booking-step-3-container">
            <h3 className="booking-step-title">{t('bookingPage.step3.title')}</h3>
            <div className="booking-step-3-content">
                {/* Left Panel: Confirmation Details */}
                <div className="confirmation-panel">
                    <div className="conf-row">
                        <span className="conf-label">{t('bookingPage.step3.contactLabel')}</span>
                        <div className="conf-value contact">
                            <span>{contactData.name}</span>
                            <span>{contactData.email}</span>
                            <span>{contactData.phonePrefix} {contactData.phone}</span>
                        </div>
                    </div>
                    <div className="conf-row">
                        <span className="conf-label">{t('bookingPage.step2.carLabel')}</span>
                        <div className="conf-value">
                            <span>{car.name} {car.year}</span>
                            <div className="car-specs-summary">
                                <span><DoorIcon /> {car.doors} {t('mainPage.carList.doors')}</span>
                                <span><TransmissionIcon /> {getTranslatedTransmission(car.transmission)}</span>
                                <span><SeatIcon /> {car.seats} {t('mainPage.carList.seats')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="conf-row">
                        <span className="conf-label">{t('bookingPage.step2.datesLabel')}</span>
                        <span className="conf-value">{formatDate(bookingDetails.dateRange[0].startDate)} - {formatDate(bookingDetails.dateRange[0].endDate)}</span>
                    </div>
                    <div className="conf-row">
                        <span className="conf-label">{t('bookingPage.step2.locationLabel')}</span>
                        <span className="conf-value">{t(`mainPage.carList.locations.${bookingDetails.pickupLocation}`)}</span>
                    </div>
                    <div className="conf-row">
                        <span className="conf-label">{t('bookingPage.step2.pLicenseLabel')}</span>
                        <span className="conf-value">{bookingDetails.pLicense ? t('bookingPage.step3.yes') : t('bookingPage.step3.no')}</span>
                    </div>
                    <div className="conf-row">
                        <span className="conf-label">{t('bookingPage.step2.otherLabel')}</span>
                        <span className="conf-value other">{bookingDetails.other || '-'}</span>
                    </div>
                </div>

                {/* Right Panel: Payment */}
                <div className="payment-panel">
                    <h4>{t('bookingPage.step3.paymentTitle')}</h4>
                    <div className="payment-form">
                        <div className="payment-input-group">
                            <label htmlFor="cardholderName">{t('bookingPage.step3.cardholderLabel')}</label>
                            <input type="text" id="cardholderName" value={paymentData.cardholderName} onChange={handlePaymentChange} onBlur={handlePaymentBlur} />
                            {errors.cardholderName && <p className="error-text-payment">{errors.cardholderName}</p>}
                        </div>
                        <div className="payment-input-group">
                            <label htmlFor="cardNumber">{t('bookingPage.step3.cardLabel')}</label>
                            <input type="text" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
                            {errors.cardNumber && <p className="error-text-payment">{errors.cardNumber}</p>}
                        </div>
                        <div className="payment-input-row">
                            <div className="payment-input-group">
                                <label htmlFor="expiryDate">{t('bookingPage.step3.expiryLabel')}</label>
                                <input type="text" id="expiryDate" placeholder="MM / YY" />
                                {errors.expiryDate && <p className="error-text-payment">{errors.expiryDate}</p>}
                            </div>
                            <div className="payment-input-group">
                                <label htmlFor="cvc">{t('bookingPage.step3.cvcLabel')}</label>
                                <input type="text" id="cvc" placeholder="XXX" />
                                {errors.cvc && <p className="error-text-payment">{errors.cvc}</p>}
                            </div>
                        </div>
                    </div>
                    <hr className="pricing-divider" />
                    <div className="price-detail-row total">
                        <span>{t('bookingPage.step3.totalFee')}</span>
                        <span>${totalPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingStep3;