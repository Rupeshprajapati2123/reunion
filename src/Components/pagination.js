// Pagination.js
import React from 'react';
import "./pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  console.log(currentPage);
  console.log(totalPages);
  console.log(onPageChange);
  return (

    <div className='pagination' style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", width: "100%", border : "1px solid red" }}>
      <div className={currentPage === 1 ? 'disabled' : ''}>
        <a onClick={() => onPageChange(currentPage - 1)} href='!#'>Previous</a>
      </div>
      {pageNumbers.map(number => (
        <div key={number} className={number === currentPage ? 'active' : ''}>
          <a onClick={() => onPageChange(number)} href='!#'>{number}</a>
        </div>
      ))}
      <div className={currentPage === totalPages ? 'disabled' : ''}>
        <a onClick={() => onPageChange(currentPage + 1)} href='!#'>Next</a>
      </div>
    </div>

  );
};

export default Pagination;
