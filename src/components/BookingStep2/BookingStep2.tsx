import React, { useState, useRef, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, type RangeKeyDict } from 'react-date-range';
import { differenceInCalendarDays } from 'date-fns';
import './BookingStep2.css';
import { type Car } from '../../data/carData';

const DoorIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"></path><path d="M10 12h.01"></path></svg>;
const SeatIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>;
const TransmissionIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="21" x2="12" y2="15"></line><line x1="12" y1="9" x2="12" y2="3"></line><line x1="21" y1="12" x2="15" y2="12"></line><line x1="9" y1="12" x2="3" y2="12"></line></svg>;

type BookingStep2Props = {
    car: Car;
    t: (key: string) => string;
    bookingDetails: {
        pickupLocation: string;
        pLicense: boolean;
        other: string;
        dateRange: {
            startDate: Date;
            endDate: Date;
            key: string;
        }[];
    };
    onLocationChange: (location: string) => void;
    onDateChange: (ranges: RangeKeyDict) => void;
    onDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors: { [key: string]: string };
};

const BookingStep2: React.FC<BookingStep2Props> = ({ car, t, bookingDetails, onLocationChange, onDateChange, onDetailsChange, errors }) => {

    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    const { startDate, endDate } = bookingDetails.dateRange[0];
    const rentalDays = differenceInCalendarDays(endDate, startDate) + 1 || 1;
    const rentalFee = car.price.daily * rentalDays;
    const total = rentalFee + car.deposit;
    const pickupLocations = car.location;

    // Close date picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setDatePickerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [datePickerRef]);


    const formatDate = (date: Date) => date.toLocaleDateString('en-CA'); // YYYY-MM-DD format


    return (
        <div className="booking-step-2-container">
            <h3 className="booking-step-title">{t('bookingPage.step2.formTitle')}</h3>
            <div className="booking-step-2-content">
                {/* Left Panel: Booking Details */}
                <div className="booking-details-panel">
                    <div className="detail-row">
                        <label>{t('bookingPage.step2.carLabel')}</label>
                        <div className="car-info-display">
                            <span>{car.name} {car.year} {car.transmission}</span>
                            <div className="car-specs-summary">
                                <span><DoorIcon /> {car.doors} {t('mainPage.carList.doors')}</span>
                                <span><TransmissionIcon /> {car.transmission == 'Automatic' ? t('mainPage.carList.Automatic') : t('mainPage.carList.Manual')}</span>
                                <span><SeatIcon /> {car.seats} {t('mainPage.carList.seats')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="detail-row">
                        <label htmlFor="rentalDates">{t('bookingPage.step2.datesLabel')}</label>
                        <div className="date-input-wrapper">
                            <input
                                type="text"
                                id="rentalDates"
                                value={`${formatDate(startDate)} - ${formatDate(endDate)}`}
                                onFocus={() => setDatePickerOpen(true)}
                                readOnly
                            />
                            <span className="calendar-icon">📅</span>
                            {isDatePickerOpen && (
                                <div className="date-picker-modal" ref={datePickerRef}>
                                    <DateRange
                                        onChange={onDateChange}
                                        // showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={2}
                                        ranges={bookingDetails.dateRange}
                                        direction="horizontal"
                                        minDate={new Date()}
                                    />
                                </div>
                            )}
                            {errors.dateRange && <p className="error-text-booking">{errors.dateRange}</p>}
                        </div>
                    </div>
                    <div className="detail-row">
                        <label>{t('bookingPage.step2.locationLabel')}</label>
                        <div className="location-buttons">
                            {pickupLocations.map(loc => (
                                <button
                                    key={loc}
                                    className={`location-btn ${bookingDetails.pickupLocation === loc ? 'active' : ''}`}
                                    onClick={() => onLocationChange(loc)}
                                >
                                    {t(`mainPage.carList.locations.${loc}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="detail-row">
                        <label htmlFor="pLicense">{t('bookingPage.step2.pLicenseLabel')}</label>
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="pLicense"
                                checked={bookingDetails.pLicense}
                                onChange={onDetailsChange}
                            />
                        </div>
                    </div>
                    <div className="detail-row">
                        <label htmlFor="other">{t('bookingPage.step2.otherLabel')}</label>
                        <textarea
                            id="other"
                            rows={4}
                            value={bookingDetails.other}
                            onChange={onDetailsChange}
                        ></textarea>
                    </div>
                </div>

                {/* Right Panel: Pricing */}
                <div className="pricing-summary-panel">
                    <h4>{t('bookingPage.step2.pricingTitle')}</h4>
                    <div className="price-detail-row">
                        <span>{t('bookingPage.step2.rentalDays')}</span>
                        <span>{rentalDays} {t('bookingPage.step2.days')}</span>
                    </div>
                    <div className="price-detail-row">
                        <span>{t('bookingPage.step2.rentalFee')}</span>
                        <span>${car.price.daily} X {rentalDays} &nbsp;&nbsp; </span>
                        <span><strong>${rentalFee.toLocaleString()}</strong></span>
                    </div>
                    <div className="price-detail-row">
                        <span>{t('bookingPage.step2.deposit')}</span>
                        <span>${car.deposit.toLocaleString()}</span>
                    </div>
                    <hr className="pricing-divider" />
                    <div className="price-detail-row total">
                        <span>{t('bookingPage.step2.total')}</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingStep2;