import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bcrypt from 'bcrypt-ts';
import RegularBanner from '../components/RegularBanner/RegularBanner';
import FormInput from '../components/FormInput/FormInput';
import VerificationInput from '../components/VerificationInput/VerificationInput';
import PhoneInput from '../components/PhoneInput/PhoneInput';
import './RegisterPage.css';


import { useAuth } from '../context/AuthContext';
import { members, type Member } from '../data/memberData';

type RegisterPageProps = {
    t: (key: string) => string;
};

type FormErrors = {
    [key: string]: string;
};

const RegisterPage: React.FC<RegisterPageProps> = ({ t }) => {
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

    const [errors, setErrors] = useState<FormErrors>({});

    const { login } = useAuth();
    const navigate = useNavigate();

    const validate = (data: typeof formData, checkAllFields: boolean = false) => {
        const newErrors: FormErrors = {};

        if (checkAllFields) {
            const requiredFields: (keyof typeof formData)[] = [
                'name', 'email', 'emailCode', 'phone', 'phoneCode', 'username', 'password'
            ];
            requiredFields.forEach(field => {
                if (!data[field]) {
                    newErrors[field] = 'registerPage.errors.required';
                }
            });
        }

        if (data.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                newErrors.email = 'registerPage.errors.invalidEmail';
            }
        }

        if (data.emailCode && data.emailCode !== '000') {
            newErrors.emailCode = 'registerPage.errors.invalidCode';
        }

        if (data.phone) {
            const phoneRegex = /^[0-9]{8}$/;
            if (!phoneRegex.test(data.phone)) {
                newErrors.phone = 'registerPage.errors.invalidPhone';
            }
        }

        if (data.phoneCode && data.phoneCode !== '000') {
            newErrors.phoneCode = 'registerPage.errors.invalidCode';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const newFormData = { ...formData, [id]: value };
        setFormData(newFormData);

        const onTheFlyErrors = validate(newFormData, false);
        setErrors(onTheFlyErrors);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalErrors = validate(formData, true);
        setErrors(finalErrors);

        if (Object.keys(finalErrors).length === 0) {
            try {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

                const newMember: Member = {
                    id: members.length + 1,
                    username: formData.username,
                    email: formData.email,
                    name: formData.name,
                    phonePrefix: formData.phonePrefix,
                    phone: formData.phone,
                    password: hashedPassword,
                };

                members.push(newMember);
                login(newMember);
                navigate('/message', { state: { message: 'registerPage.successRegister' } });

            } catch (error) {
                console.error("Registration failed:", error);
                setErrors({ ...errors, form: 'Registration failed. Please try again.' });
            }
        } else {
            console.log('Form has errors, registration denied.');
        }
    };

    return (
        <div>
            <RegularBanner />
            <div className="register-container">
                <form className="register-form" onSubmit={handleRegister} noValidate>
                    <h2>{t('registerPage.formTitle')}</h2>
                    <hr className="title-divider" />

                    <FormInput
                        label={t('registerPage.nameLabel')}
                        id="name"
                        type="text"
                        value={formData.name}
                        handleChange={handleChange}
                        handleBlur={() => { }}
                        handleFocus={() => { }}
                        error={errors.name}
                        t={t}
                    />
                    <VerificationInput
                        label={t('registerPage.emailLabel')}
                        id="email"
                        value={formData.email}
                        codeValue={formData.emailCode}
                        handleChange={handleChange}
                        handleBlur={() => { }}
                        handleFocus={() => { }}
                        t={t}
                        emailError={errors.email}
                        codeError={errors.emailCode}
                    />
                    <PhoneInput
                        label={t('registerPage.phoneLabel')}
                        prefixId="phonePrefix"
                        prefixValue={formData.phonePrefix}
                        phoneId="phone"
                        phoneValue={formData.phone}
                        codeValue={formData.phoneCode}
                        handleChange={handleChange}
                        handleBlur={() => { }}
                        handleFocus={() => { }}
                        t={t}
                        phoneError={errors.phone}
                        codeError={errors.phoneCode}
                    />
                    <FormInput
                        label={t('registerPage.usernameLabel')}
                        id="username"
                        type="text"
                        value={formData.username}
                        handleChange={handleChange}
                        handleBlur={() => { }}
                        handleFocus={() => { }}
                        error={errors.username}
                        t={t}
                    />
                    <FormInput
                        label={t('registerPage.passwordLabel')}
                        id="password"
                        type="password"
                        value={formData.password}
                        handleChange={handleChange}
                        handleBlur={() => { }}
                        handleFocus={() => { }}
                        error={errors.password}
                        t={t}
                    />

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