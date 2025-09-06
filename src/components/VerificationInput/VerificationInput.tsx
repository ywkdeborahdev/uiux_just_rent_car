import React, { useState, useEffect } from 'react';
import './VerificationInput.css';

type VerificationInputProps = {
    label: string;
    id: string;
    value: string;
    codeValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    t: (key: string) => string;
    emailError?: string;
    codeError?: string;
};

const VerificationInput: React.FC<VerificationInputProps> = ({ label, id, value, codeValue, handleChange, handleBlur, handleFocus, t, emailError, codeError }) => {
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(60);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCodeSent && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setIsCodeSent(false);
        }
        return () => clearTimeout(timer);
    }, [isCodeSent, countdown]);

    const handleGetCodeClick = () => {
        if (!value || emailError) return; // Prevent sending if email is empty or invalid
        setIsCodeSent(true);
        setCountdown(60);
        console.log("Verification code sent to:", value);
    };

    return (
        <div className="form-row verification-row">
            <label htmlFor={id}>{label}</label>
            <div className="input-container">
                <input
                    id={id}
                    type="email"
                    className="main-input"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                {emailError && <p className="error-text">{emailError}</p>}
            </div>
            <div className="verification-group">
                <button
                    type="button"
                    className="get-code-button"
                    onClick={handleGetCodeClick}
                    disabled={isCodeSent}
                >
                    {isCodeSent
                        ? t('registerPage.resend').replace('{{seconds}}', countdown.toString())
                        : t('registerPage.getCode')}
                </button>
                <div className="input-container">
                    <input
                        id={`${id}Code`}
                        type="text"
                        className="code-input"
                        value={codeValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        placeholder="000"
                    />
                    {codeError && <p className="error-text code-error">{codeError}</p>}
                </div>
            </div>
        </div>
    );
};

export default VerificationInput;