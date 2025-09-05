import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegularBanner from '../components/RegularBanner/RegularBanner';
import './LoginPage.css';

import * as bcrypt from 'bcrypt-ts';

import { members } from '../data/memberData';
import { useAuth } from '../context/AuthContext';

type LoginPageProps = {
    t: (key: string) => string;
};

const LoginPage: React.FC<LoginPageProps> = ({ t }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [authError, setAuthError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { login } = useAuth();

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!username) {
            newErrors.username = 'registerPage.errors.required';
        }
        if (!password) {
            newErrors.password = 'registerPage.errors.required';
        }
        return newErrors;
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setAuthError(null);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const foundMember = members.find(
            (member) => member.username === username
        );

        let isMatch = false;
        if (foundMember) {
            isMatch = await bcrypt.compare(password, foundMember.password);
        }

        if (foundMember && isMatch) {
            login(foundMember);
            navigate('/');
        } else {
            setAuthError('loginPage.errorMessage');
        }
    };

    // --- NEW HANDLER TO CLEAR ERRORS ON INPUT ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === 'username') {
            setUsername(value);
        } else if (id === 'password') {
            setPassword(value);
        }

        // If there was an error for this field, clear it
        if (errors[id]) {
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
        }
    };


    return (
        <div>
            <RegularBanner />

            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin} noValidate>
                    <h2>{t('loginPage.formTitle')}</h2>
                    {authError && <p className="error-message">{t(authError)}</p>}

                    <div className="input-group">
                        <label htmlFor="username">{t('loginPage.usernameLabel')}</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-text-login">{t(errors.username)}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">{t('loginPage.passwordLabel')}</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-text-login">{t(errors.password)}</p>}
                    </div>

                    <button type="submit" className="login-button">
                        {t('loginPage.buttonText')}
                    </button>

                    <p className="signup-prompt">
                        {t('loginPage.signupPrompt')}{' '}
                        <Link to="/register">{t('loginPage.signupLink')}</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

