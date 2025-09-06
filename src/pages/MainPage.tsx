import React, { useState, useEffect } from 'react'; // 1. Import useCallback
import SearchBanner from '../components/SearchBanner/SearchBanner';
import FilterBar from '../components/FilterBar/FilterBar';
import CarList from '../components/CarList/CarList';
import { cars as allCars, type Car } from '../data/carData';

type MainPageProps = {
    t: (key: string) => string;
};

export type Filters = {
    brand: string;
    model: string;
    seats: string;
    transmission: string;
    price: {
        rentalType: 'daily' | 'weekly' | 'monthly';
        min: number;
        max: number;
    };
};

const title = {
    titleOne: "mainPage.titleOne",
    titleTwo: "mainPage.titleTwo"
};

const MainPage: React.FC<MainPageProps> = ({ t }) => {
    const [filters, setFilters] = useState<Filters>({
        brand: 'All',
        model: 'All',
        seats: 'All',
        transmission: 'All',
        price: {
            rentalType: 'daily',
            min: 0,
            max: Infinity,
        }
    });

    const [filteredCars, setFilteredCars] = useState<Car[]>(allCars);

    useEffect(() => {
        let carsToFilter = [...allCars];

        if (filters.brand !== 'All') {
            carsToFilter = carsToFilter.filter(car => car.brand === filters.brand);
        }
        if (filters.model !== 'All') {
            carsToFilter = carsToFilter.filter(car => car.model === filters.model);
        }
        if (filters.seats !== 'All') {
            carsToFilter = carsToFilter.filter(car => car.seats.toString() === filters.seats);
        }
        if (filters.transmission !== 'All') {
            carsToFilter = carsToFilter.filter(car => car.transmission === filters.transmission);
        }
        carsToFilter = carsToFilter.filter(car => {
            const price = car.price[filters.price.rentalType];
            return price >= filters.price.min && price <= filters.price.max;
        });

        setFilteredCars(carsToFilter);
    }, [filters]);

    // 2. Wrap the handler function in useCallback
    // This ensures the function identity is stable across re-renders
    // const handleFilterChange = useCallback((filterName: keyof Filters, value: any) => {
    //     setFilters(prevFilters => ({
    //         ...prevFilters,
    //         [filterName]: value
    //     }));
    // }, []); // The empty dependency array means this function will never be re-created


    const handleFilterChange = (filterName: keyof Filters, value: any) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };
    return (
        <div>
            <SearchBanner title={title} t={t} />
            <FilterBar t={t} onFilterChange={handleFilterChange} />
            <CarList t={t} cars={filteredCars} />
        </div>
    );
};

export default MainPage;