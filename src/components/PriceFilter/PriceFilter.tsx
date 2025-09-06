import React, { useState, useEffect, useRef, useMemo } from 'react';
import './PriceFilter.css';
import { type Filters } from '../../pages/MainPage';

type PriceFilterProps = {
    icon: React.ReactNode;
    label: string;
    t: (key: string) => string;
    onChange: (value: Filters['price']) => void;
};

const PriceFilter: React.FC<PriceFilterProps> = ({ icon, label, t, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rentalType, setRentalType] = useState<Filters['price']['rentalType']>('daily');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [filterRef]);

    const handleRentalTypeChange = (type: Filters['price']['rentalType']) => {
        setRentalType(type);
        onChange({
            rentalType: type,
            min: minPrice ? parseInt(minPrice) : 0,
            max: maxPrice ? parseInt(maxPrice) : Infinity,
        });
    };

    const handleMinPriceChange = (value: string) => {
        setMinPrice(value);
        onChange({
            rentalType,
            min: value ? parseInt(value) : 0,
            max: maxPrice ? parseInt(maxPrice) : Infinity,
        });
    };

    const handleMaxPriceChange = (value: string) => {
        setMaxPrice(value);
        onChange({
            rentalType,
            min: minPrice ? parseInt(minPrice) : 0,
            max: value ? parseInt(value) : Infinity,
        });
    };

    const displayLabel = useMemo(() => {
        const typeLabel = t(`mainPage.priceFilter.${rentalType}`);
        const min = minPrice || '0';
        const max = maxPrice || '∞';

        // Only show the detailed range if a price has been entered
        if (minPrice || maxPrice) {
            return `${typeLabel} ${min} - ${max}`;
        }

        return label; // Show the default label otherwise
    }, [rentalType, minPrice, maxPrice, t, label]);


    const rentalTypes = [
        { key: 'daily', label: t('mainPage.priceFilter.daily') },
        { key: 'weekly', label: t('mainPage.priceFilter.weekly') },
        { key: 'monthly', label: t('mainPage.priceFilter.monthly') }
    ];

    return (
        <div className="custom-dropdown-container" ref={filterRef}>
            <div className="custom-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="header-icon">{icon}</span>
                <span className="header-label">{displayLabel}</span>
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            {isOpen && (
                <div className="price-filter-body">
                    <div className="rental-type-selector">
                        <span>{t('mainPage.priceFilter.selectRentalType')}</span>
                        <div className="options">
                            {rentalTypes.map(type => (
                                <button
                                    key={type.key}
                                    className={rentalType === type.key ? 'active' : ''}
                                    onClick={() => handleRentalTypeChange(type.key as Filters['price']['rentalType'])}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="price-range-selector">
                        <span>{t('mainPage.priceFilter.selectPriceRange')}</span>
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder={t('mainPage.priceFilter.minPrice')}
                                value={minPrice}
                                onChange={(e) => handleMinPriceChange(e.target.value)}
                            />
                            <span className="separator">—</span>
                            <input
                                type="number"
                                placeholder={t('mainPage.priceFilter.maxPrice')}
                                value={maxPrice}
                                onChange={(e) => handleMaxPriceChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceFilter;