import React, { useState, useEffect } from 'react';
import './PhoneInput.css';

type PhoneInputProps = {
    label: string;
    prefixId: string;
    prefixValue: string;
    phoneId: string;
    phoneValue: string;
    codeValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    // Correct the type to accept both element types
    handleFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    t: (key: string) => string;
    phoneError?: string;
    codeError?: string;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
    label,
    prefixId,
    prefixValue,
    phoneId,
    phoneValue,
    codeValue,
    handleChange,
    handleBlur,
    handleFocus,
    t,
    phoneError,
    codeError
}) => {
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
        if (!phoneValue || phoneError) return;
        setIsCodeSent(true);
        setCountdown(60);
        console.log(`Verification code sent to: ${prefixValue}${phoneValue}`);
    };

    return (
        <div className="form-row">
            <label htmlFor={phoneId}>{label}</label>
            <div className="input-container phone-input-container">
                <div className="phone-input-group">
                    <select
                        id={prefixId}
                        value={prefixValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    >
                        <option value="+852">+852</option>
                        <option value="+853">+853</option>
                        <option value="+886">+886</option>
                    </select>
                    <input
                        id={phoneId}
                        type="tel"
                        value={phoneValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                </div>
                {phoneError && <p className="error-text">{t(phoneError)}</p>}
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
                        id="phoneCode"
                        type="text"
                        className="code-input"
                        value={codeValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        placeholder="000"
                    />
                    {codeError && <p className="error-text code-error">{t(codeError)}</p>}
                </div>
            </div>
        </div>
    );
};

export default PhoneInput;