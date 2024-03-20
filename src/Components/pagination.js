// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  console.log(currentPage);
  console.log(totalPages);
  console.log(onPageChange);
  return (
    <nav>
      <ul className='pagination'>
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => onPageChange(currentPage - 1)} href='!#'>Previous</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <a onClick={() => onPageChange(number)} href='!#'>{number}</a>
          </li>
        ))}
        <li className={currentPage === totalPages ? 'disabled' : ''}>
          <a onClick={() => onPageChange(currentPage + 1)} href='!#'>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
