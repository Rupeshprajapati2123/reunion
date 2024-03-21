import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Checkbox, FormControl, FormGroup, FormControlLabel, Select, MenuItem, ListItemText } from '@mui/material';

import './paymentsTable.css';
import '../../Components/Payments/payments.css'
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
const PaymentsTable = ({ products, sortOrder, sortColumn, onSort, searchQuery }) => {
  const [visibleColumns, setVisibleColumns] = useState({
    orderId: true,
    category: true,
    subcategory: true,
    field: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    id:true,
    sale_price:true,
    name:true
  });
const [toggle,setToggle]=useState(true);

  const renderCell = (product, column) => {
    if (!visibleColumns[column]) return null;

    if (column === 'createdAt' || column === 'updatedAt') {
      return (
        <TableCell key={column}>
          {product[column].split('T')[0]} {/* Render starting date (yyyy-mm-dd) */}
        </TableCell>
      );
    }

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

  const handleColumnToggle = (event) => {
    const { name, checked } = event.target;
    setVisibleColumns({
      ...visibleColumns,
      [name]: checked,
    });
  };

  
const handleclick=()=>{
  
  setToggle(!toggle);
}
  return (
    <TableContainer component={Paper}>
      
      <div className="payments-transacions-main-Icon-flex">
            <FileDownloadOutlinedIcon style={{ fontSize: "20px", color: "var(--Text-Color-Grey)" }}onClick={handleclick} />
          </div>
      <div className={toggle?'hidden':'not-hidden'}>
      <FormControl component="fieldset">
        <FormGroup>
          {Object.keys(products[0]).map((column) => (
            <FormControlLabel
              key={column}
              control={<Checkbox checked={visibleColumns[column]} onChange={handleColumnToggle} name={column} />}
              label={column}
            />
          ))}
        </FormGroup>
      </FormControl>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(products[0]).map((column) => (
              visibleColumns[column] && (
                <TableCell key={column}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                    
                  </div>
                </TableCell>
              )
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSortedProducts().map((product) => (
            <TableRow key={product.orderId}>
              {Object.keys(product).map((column) => (
                visibleColumns[column] && renderCell(product, column)
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentsTable;
