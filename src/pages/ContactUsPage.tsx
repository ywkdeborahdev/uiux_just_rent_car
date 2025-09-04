import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegularBanner from '../components/RegularBanner/RegularBanner';
import './ContactUsPage.css';
import map from '../assets/Map_rent_car.png';

type ContactUsPageProps = {
    t: (key: string) => string;
};

type FormErrors = {
    [key: string]: string;
};

const ContactUsPage: React.FC<ContactUsPageProps> = ({ t }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phonePrefix: '+852',
        phone: '',
        enquiry: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    // --- CORRECTED VALIDATION LOGIC ---
    const validate = (data: typeof formData, checkAllRequired: boolean = false) => {
        const newErrors: FormErrors = {};

        // On-blur validation for specific fields
        if (data.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                newErrors.email = t('registerPage.errors.invalidEmail');
            }
        }
        if (data.phone) {
            const phoneRegex = /^[0-9]{8}$/;
            if (!phoneRegex.test(data.phone)) {
                newErrors.phone = t('registerPage.errors.invalidPhone');
            }
        }

        // On-submit validation for all required fields
        if (checkAllRequired) {
            const requiredFields: (keyof typeof formData)[] = ['name', 'email', 'phone', 'enquiry'];
            requiredFields.forEach(field => {
                if (!data[field]) {
                    newErrors[field] = t('registerPage.errors.required');
                }
            });
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const newFormData = { ...formData, [id]: value };
        setFormData(newFormData);

        // Run validation on every change to give instant feedback for format errors
        const onTheFlyErrors = validate(newFormData);
        setErrors(prev => ({ ...prev, [id]: onTheFlyErrors[id] }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // The handleChange already handles validation, but you can keep this
        // if you want to ensure validation runs specifically on blur.
        const onBlurErrors = validate(formData);
        setErrors(onBlurErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Pass 'true' to check all required fields for emptiness
        const finalErrors = validate(formData, true);
        setErrors(finalErrors);

        if (Object.keys(finalErrors).length === 0) {
            console.log('Form submitted successfully:', formData);
            navigate('/message', { state: { message: 'contactUsPage.successSubmission' } });
        } else {
            console.log('Form has errors, submission denied.');
        }
    };

    return (
        <div>
            <RegularBanner />
            <div className="contact-us-container">
                {/* Left Panel */}
                <div className="contact-info-panel">
                    <h2>{t('contactUsPage.leftTitle')}</h2>
                    <div className="info-item">
                        <div className="icon">📍{t('contactUsPage.addressTitle')}</div>
                        <div className="details">
                            {/* <h3>{t('contactUsPage.addressTitle')}</h3> */}
                            <p>{t('contactUsPage.addressText')}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="icon">⏰{t('contactUsPage.hoursTitle')}</div>
                        <div className="details">
                            {/* <h3>{t('contactUsPage.hoursTitle')}</h3> */}
                            <p>{t('contactUsPage.hoursText')}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="icon">📞{t('contactUsPage.phoneTitle')}</div>
                        <div className="details">
                            {/* <h3>{t('contactUsPage.phoneTitle')}</h3> */}
                            <p>{t('contactUsPage.phoneText')}</p>
                        </div>
                    </div>
                    <div className="info-item map-container">
                        <img src={map} alt="Map of our location" className="map-image" />
                    </div>
                </div>

                {/* Right Panel */}
                <div className="contact-form-panel">
                    <h2>{t('contactUsPage.formTitle')}</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <label htmlFor="name">{t('contactUsPage.nameLabel')}</label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange} />
                            {errors.name && <p className="error-text-contact">{errors.name}</p>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">{t('contactUsPage.emailLabel')}</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && <p className="error-text-contact">{errors.email}</p>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="phone">{t('contactUsPage.phoneLabel')}</label>
                            <div className="phone-input-group">
                                <select id="phonePrefix" value={formData.phonePrefix} onChange={handleChange}>
                                    <option value="+852">+852</option>
                                    <option value="+853">+853</option>
                                    <option value="+886">+886</option>
                                </select>
                                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            {errors.phone && <p className="error-text-contact">{errors.phone}</p>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="enquiry">{t('contactUsPage.enquiryLabel')}</label>
                            <textarea id="enquiry" value={formData.enquiry} onChange={handleChange}></textarea>
                            {errors.enquiry && <p className="error-text-contact">{errors.enquiry}</p>}
                        </div>
                        <button type="submit" className="submit-button">{t('contactUsPage.submitButton')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;