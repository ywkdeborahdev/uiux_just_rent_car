import React, { useState, useEffect, useRef } from 'react';
import './CustomDropdown.css';

type CustomDropdownProps = {
    t: (key: string) => string;
    icon: React.ReactNode;
    label: string;
    options: string[];
    onSelect: (value: string) => void;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ icon, label, options, onSelect, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(label);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleSelect = (option: string) => {
        const valueToSet = option === label ? 'All' : option;
        setSelectedValue(option);
        onSelect(valueToSet); // Call the onSelect prop with the chosen value
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown-container" ref={dropdownRef}>
            <div className="custom-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="header-icon">{icon}</span>
                <span className="header-label">{t(selectedValue)}</span>
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            {isOpen && (
                <div className="custom-dropdown-list">
                    {/* Add a non-selectable default option */}
                    <div className="dropdown-option disabled" onClick={() => handleSelect(label)}>
                        {t(label)}
                    </div>
                    {options.map((option, index) => (
                        <div key={index} className="dropdown-option" onClick={() => handleSelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;