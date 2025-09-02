import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegularBanner from '../components/RegularBanner/RegularBanner';
import './LoginPage.css';

import * as bcrypt from 'bcrypt-ts';

import { members } from '../data/memberData';
import { useAuth } from '../context/AuthContext';


const saltRounds = import.meta.env.VITE_SALT_ROUNDS;
const saltPassword = import.meta.env.VITE_SALT_PASSWORD;

type LoginPageProps = {
    t: (key: string) => string;
};

const LoginPage: React.FC<LoginPageProps> = ({ t }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // State to hold any login error messages
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the form from reloading the page
        // console.log('Logging in with:', { username, password, hashedPassword });
        setError(null); // Reset error on new submission

        // Find a member that matches both username and password
        const foundMember = members.find(
            (member) => member.username === username
        );

        let isMatch = false;
        if (foundMember) {
            isMatch = await bcrypt.compare(password, foundMember.password);
        }

        if (foundMember && isMatch) {
            // --- SUCCESSFUL LOGIN ---
            // In a real app, you'd set user context or a token here
            login(foundMember);
            navigate('/'); // Redirect to the main page
        } else {
            // --- FAILED LOGIN ---
            setError('loginPage.errorMessage');
        }

    };


    return (
        <div>
            <RegularBanner />

            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>{t('loginPage.formTitle')}</h2>
                    <text>{saltRounds}</text>
                    <div className="input-group">
                        <label htmlFor="username">{t('loginPage.usernameLabel')}</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">{t('loginPage.passwordLabel')}</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Display error message if it exists */}
                    {error && <p className="error-message">{t(error)}</p>}

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