import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, SwapVertRounded } from '@mui/icons-material';
import './paymentsTable.css';

const ProductTable = ({ products, sortOrder, sortColumn, onSort, searchQuery }) => {
  const renderCell = (product, column) => {
    return <TableCell key={column}>{product[column]}</TableCell>;
  };

  const filteredSortedProducts = () => {
    let filteredProducts = products;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        Object.values(product).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (sortColumn) {
      filteredProducts.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filteredProducts;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(products[0]).map((column) => (
              <TableCell key={column}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                  <IconButton size="small" onClick={() => onSort(column)}>
                    {sortColumn === column && <SwapVertRounded className="sort-icon" />}
                  </IconButton>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSortedProducts().map((product) => (
            <TableRow key={product.id}>
              {Object.keys(product).map((column) => renderCell(product, column))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
