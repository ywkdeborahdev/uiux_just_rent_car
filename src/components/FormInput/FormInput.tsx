import React from 'react';
import './FormInput.css';

type FormInputProps = {
    label: string;
    id: string;
    type: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
};

const FormInput: React.FC<FormInputProps> = ({ label, id, type, value, handleChange, handleBlur, handleFocus, error }) => {
    return (
        <div className="form-row">
            <label htmlFor={id}>{label}</label>
            <div className="input-container">
                <input
                    id={id}
                    type={type}
                    className="main-input"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default FormInput;