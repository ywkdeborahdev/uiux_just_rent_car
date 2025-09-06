import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import VerificationInput from '../VerificationInput/VerificationInput';
import PhoneInput from '../PhoneInput/PhoneInput';
import './BookingStep1.css';

type BookingStep1Props = {
    formData: {
        name: string;
        email: string;
        emailCode: string;
        phonePrefix: string;
        phone: string;
        phoneCode: string;
    };
    t: (key: string) => string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    errors: { [key: string]: string };
};

const BookingStep1: React.FC<BookingStep1Props> = ({ formData, t, handleChange, handleBlur, errors }) => {
    return (
        <div className="booking-step">
            <h3 className="booking-step-title">{t('bookingPage.contactInfo.title')}</h3>
            <p className="booking-step-subtitle">
                {t('bookingPage.contactInfo.subtitle.prefix')}
                <Link to="/login">{t('bookingPage.contactInfo.subtitle.login')}</Link>
                {t('bookingPage.contactInfo.subtitle.or')}
                <Link to="/register">{t('bookingPage.contactInfo.subtitle.register')}</Link>
                {t('bookingPage.contactInfo.subtitle.suffix')}
            </p>

            <FormInput
                label={t('bookingPage.contactInfo.nameLabel')}
                id="name"
                type="text"
                value={formData.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleFocus={() => { }}
                error={errors.name}
                t={t}
            />
            <VerificationInput
                label={t('bookingPage.contactInfo.emailLabel')}
                id="email"
                value={formData.email}
                codeValue={formData.emailCode}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleFocus={() => { }}
                t={t}
                emailError={errors.email}
                codeError={errors.emailCode}
            />
            <PhoneInput
                label={t('bookingPage.contactInfo.phoneLabel')}
                prefixId="phonePrefix"
                prefixValue={formData.phonePrefix}
                phoneId="phone"
                phoneValue={formData.phone}
                codeValue={formData.phoneCode}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleFocus={() => { }}
                t={t}
                phoneError={errors.phone}
                codeError={errors.phoneCode}
            />
        </div>
    );
};

export default BookingStep1;