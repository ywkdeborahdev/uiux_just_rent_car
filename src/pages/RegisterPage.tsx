import React, { useState } from 'react';
import RegularBanner from '../components/RegularBanner/RegularBanner';
import './RegisterPage.css';

type RegisterPageProps = {
    t: (key: string) => string;
};

const RegisterPage: React.FC<RegisterPageProps> = ({ t }) => {
    // State for each form field
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        emailCode: '',
        phonePrefix: '+852',
        phone: '',
        phoneCode: '',
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registering with data:', formData);
        // Add registration logic here
    };

    return (
        <div>
            <RegularBanner />
            <div className="register-container">
                <form className="register-form" onSubmit={handleRegister}>
                    <h2>{t('registerPage.formTitle')}</h2>
                    <hr className="title-divider" />

                    {/* Name */}
                    <div className="form-row">
                        <label htmlFor="name">{t('registerPage.nameLabel')}</label>
                        <input id="name" type="text" className="main-input" value={formData.name} onChange={handleChange} required />
                    </div>

                    {/* Email */}
                    <div className="form-row">
                        <label htmlFor="email">{t('registerPage.emailLabel')}</label>
                        <input id="email" type="email" className="main-input" value={formData.email} onChange={handleChange} required />
                        <div className="verification-group">
                            <button type="button" className="get-code-button">{t('registerPage.getCode')}</button>
                            <input id="emailCode" type="text" className="code-input" value={formData.emailCode} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="form-row">
                        <label htmlFor="phone">{t('registerPage.phoneLabel')}</label>
                        <div className="phone-input-group">
                            <select id="phonePrefix" value={formData.phonePrefix} onChange={handleChange}>
                                <option value="+852">+852</option>
                                <option value="+853">+853</option>
                                <option value="+886">+886</option>
                            </select>
                            <input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="verification-group">
                            <button type="button" className="get-code-button">{t('registerPage.getCode')}</button>
                            <input id="phoneCode" type="text" className="code-input" value={formData.phoneCode} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="form-row">
                        <label htmlFor="username">{t('registerPage.usernameLabel')}</label>
                        <input id="username" type="text" className="main-input" value={formData.username} onChange={handleChange} required />
                    </div>

                    {/* Password */}
                    <div className="form-row">
                        <label htmlFor="password">{t('registerPage.passwordLabel')}</label>
                        <input id="password" type="password" className="main-input" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="register-button-container">
                        <button type="submit" className="register-button">
                            {t('registerPage.registerButton')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;