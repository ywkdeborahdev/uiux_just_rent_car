import React from 'react';
import './Pagination.css';

type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) {
        return null; // Don't render pagination if there's only one page
    }

    return (
        <nav className="pagination-container">
            <ul className="pagination-list">
                {/* Previous Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &laquo;
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;