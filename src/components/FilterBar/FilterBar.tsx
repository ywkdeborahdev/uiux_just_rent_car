import React from 'react';
import './FilterBar.css';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import PriceFilter from '../PriceFilter/PriceFilter';
import { cars } from '../../data/carData'; // Import the car data
import { type Filters } from '../../pages/MainPage';

type FilterBarProps = {
    t: (key: string) => string;
    onFilterChange: (filterName: keyof Filters, value: any) => void;
};

// --- Helper functions to get unique values from the car data ---
const getUniqueValues = (key: 'brand' | 'model' | 'seats' | 'transmission') => {
    const values = cars.map(car => car[key]);
    return [...new Set(values)].map(String); // Use Set for uniqueness
};

const BrandIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;
const ModelIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const PriceIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const SeatsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const TransmissionIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="12" r="3"></circle><line x1="6" y1="15" x2="6" y2="21"></line><line x1="18" y1="15" x2="18" y2="21"></line><path d="M12 12v9"></path><path d="M9 12H3"></path><path d="M15 12h6"></path><path d="M9 9L6 3 3 9"></path><path d="M15 9l3-6 3 6"></path></svg>;


const FilterBar: React.FC<FilterBarProps> = ({ t, onFilterChange }) => {
    // --- Dynamically generate options from the data ---
    const brandOptions = getUniqueValues('brand');
    const modelOptions = getUniqueValues('model');
    const seatsOptions = getUniqueValues('seats').sort((a, b) => Number(a) - Number(b)); // Sort seats numerically
    const transmissionOptions = getUniqueValues('transmission');

    return (
        <div className="filter-bar-container">
            <div className="filter-bar">
                <CustomDropdown
                    icon={<BrandIcon />}
                    label={'mainPage.filters.brand'}
                    options={brandOptions}
                    onSelect={(value) => onFilterChange('brand', value)}
                    t={t}
                />
                <CustomDropdown
                    icon={<ModelIcon />}
                    label={'mainPage.filters.model'}
                    options={modelOptions}
                    onSelect={(value) => onFilterChange('model', value)}
                    t={t}
                />
                <PriceFilter
                    icon={<PriceIcon />}
                    label={t('mainPage.filters.price')}
                    t={t}
                    onChange={(value) => onFilterChange('price', value)}
                />
                <CustomDropdown
                    icon={<SeatsIcon />}
                    label={'mainPage.filters.seats'}
                    options={seatsOptions}
                    onSelect={(value) => onFilterChange('seats', value)}
                    t={t}
                />
                <CustomDropdown
                    icon={<TransmissionIcon />}
                    label={'mainPage.filters.transmission'}
                    options={transmissionOptions}
                    onSelect={(value) => onFilterChange('transmission', value)}
                    t={t}
                />
            </div>
        </div>
    );
};

export default FilterBar;