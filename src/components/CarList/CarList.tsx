import React, { useState, useMemo, useEffect } from 'react';
import CarListItem from '../CarListItem/CarListItem';
import Pagination from '../Pagination/Pagination';
import './CarList.css';
import { type Car } from '../../data/carData'; //

const SortIcon = ({ direction }: { direction: 'asc' | 'desc' }) => (<svg className={`sort-icon ${direction}`} width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" /></svg>);

const ITEMS_PER_PAGE = 5;

type CarListProps = {
    t: (key: string) => string;
    cars: Car[]; // Accept cars as a prop
};

const CarList: React.FC<CarListProps> = ({ t, cars }) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const sortedCars = useMemo(() => {
        const carsCopy = [...cars];
        carsCopy.sort((a, b) => {
            return sortOrder === 'asc' ? a.price.daily - b.price.daily : b.price.daily - a.price.daily;
        });
        return carsCopy;
    }, [cars, sortOrder]);

    // Reset to page 1 whenever the filters change (i.e., when the 'cars' prop array changes)
    useEffect(() => {
        setCurrentPage(1);
    }, [cars]);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = sortedCars.slice(indexOfFirstItem, indexOfLastItem);

    const handleSortToggle = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="car-list-container">
            <div className="sorter-container">
                <button className="price-sorter-button" onClick={handleSortToggle}>
                    <span>{t(sortOrder === 'asc' ? 'mainPage.carList.priceAsc' : 'mainPage.carList.priceDesc')}</span>
                    <SortIcon direction={sortOrder} />
                </button>
            </div>
            {cars.length > 0 ? (
                <>
                    <div className="car-list">
                        {currentItems.map((car) => (
                            <CarListItem key={car.name} car={car} t={t} />
                        ))}
                    </div>
                    <Pagination
                        totalItems={sortedCars.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            ) : (
                <div className="no-results-message">
                    <p>{t('mainPage.carList.noResults')}</p>
                </div>
            )}
        </div>
    );
};

export default CarList;