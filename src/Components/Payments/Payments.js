// Payments.js

import React, { useState, useEffect } from "react";
import "./payments.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PaymentsTable from "../PaymentsTable/PaymentsTable";
import { rows } from "../PaymentsTable/PaymentsData";
import { Button, FormControl, Select, MenuItem, Slider } from "@mui/material";
import SortSidebar from "../SortSidebar";
import {
  handleSort,
  handleDownload,
  handleSearch,
  handleCategoryChange,
  handleSubcategoryChange,
  handleFieldChange,
  handlePageChange,
} from "./methods"; // Importing functions from methods.js

const Payments = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("orderId");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedField, setSelectedField] = useState(""); // New state for the additional field
  const [priceRange, setPriceRange] = useState([0, 100]); // State for price range

  const allCategories = Array.from(new Set(rows.map((row) => row.category)));
  const allSubcategories = Array.from(new Set(rows.map((row) => row.subcategory)));
  const allFields = Array.from(new Set(rows.map((row) => row.field)));

  // Extract unique dates from the "createdAt" and "updatedAt" fields
  const allCreatedAtDates = Array.from(new Set(rows.map((row) => row.createdAt)));
  const allUpdatedAtDates = Array.from(new Set(rows.map((row) => row.updatedAt)));

  // Sort the dates in ascending order
  allCreatedAtDates.sort((a, b) => new Date(a) - new Date(b));
  allUpdatedAtDates.sort((a, b) => new Date(a) - new Date(b));

  // Set default start and end dates for createdAt and updatedAt
  const [startCreatedAtDate, setStartCreatedAtDate] = useState(allCreatedAtDates[0]);
  const [endCreatedAtDate, setEndCreatedAtDate] = useState(allCreatedAtDates[allCreatedAtDates.length - 1]);
  const [startUpdatedAtDate, setStartUpdatedAtDate] = useState(allUpdatedAtDates[0]);
  const [endUpdatedAtDate, setEndUpdatedAtDate] = useState(allUpdatedAtDates[allUpdatedAtDates.length - 1]);

  // Calculate min and max price values
  useEffect(() => {
    const minPrice = Math.min(...rows.map((row) => row.price));
    const maxPrice = Math.max(...rows.map((row) => row.price));
    setPriceRange([minPrice, maxPrice]);
  }, []);

  // Filtering rows based on price range
  const filteredByPrice = rows.filter(
    (row) => row.price >= priceRange[0] && row.price <= priceRange[1]
  );

  // Filtering rows based on createdAt and updatedAt date ranges
  const filteredByCreatedAtDateRange = rows.filter(
    (row) => new Date(row.createdAt) >= new Date(startCreatedAtDate) && new Date(row.createdAt) <= new Date(endCreatedAtDate)
  );
  const filteredByUpdatedAtDateRange = rows.filter(
    (row) => new Date(row.updatedAt) >= new Date(startUpdatedAtDate) && new Date(row.updatedAt) <= new Date(endUpdatedAtDate)
  );

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);

  // Update filtered rows when price range, createdAt date range, or updatedAt date range changes
  useEffect(() => {
    const filteredData = filteredByPrice.filter(
      (row) =>
        filteredByCreatedAtDateRange.includes(row) &&
        filteredByUpdatedAtDateRange.includes(row)
    );
    setFilteredRows(filteredData);
  }, [priceRange, startCreatedAtDate, endCreatedAtDate, startUpdatedAtDate, endUpdatedAtDate]);

  return (
    <div className="payments">
      <div className="payments-transactions">
        <div className="payments-transacions-main-search">
          <SearchOutlinedIcon
            style={{ fontSize: "16px", color: "#808080", cursor: "pointer" }}
          />
          <input
            type="text"
            placeholder="Search by order ID..."
            className="payments-transacions-main-search-text"
            value={searchQuery}
            onChange={(event) =>
              handleSearch(event, rows, setSearchQuery, setCurrentPage, setFilteredRows)
            }
          />
        </div>
        <div className="payments-transacions-main-actions">
          <Button
            variant="contained"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ fontSize: "16px", color: "var(--Text-Color-Grey)" }}
          >
            {sidebarOpen ? "Hide Filters" : "Show Filters"}
          </Button>
          <div className="payments-transacions-main-Icon-flex">
            <FileDownloadOutlinedIcon
              style={{ fontSize: "20px", color: "var(--Text-Color-Grey)" }}
              onClick={() => handleDownload(rows)}
            />
          </div>
        </div>
        {filteredRows.length > 0 ? (
          <PaymentsTable
            sortOrder={sortOrder}
            sortColumn={sortColumn}
            products={currentRows}
            searchQuery={searchQuery}
            onSort={(column) =>
              handleSort(column, sortColumn, sortOrder, setSortColumn, setSortOrder)
            }
          />
        ) : (
          <p>No data available for the selected filters.</p>
        )}
        <div className={`filter-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="filter-section">
            <h3>Search</h3>
            <div className="payments-transacions-main-search">
              <SearchOutlinedIcon
                style={{ fontSize: "16px", color: "#808080", cursor: "pointer" }}
              />
              <input
                type="text"
                placeholder="Search by order ID..."
                className="payments-transacions-main-search-text"
                value={searchQuery}
                onChange={(event) =>
                  handleSearch(event, rows, setSearchQuery, setCurrentPage, setFilteredRows)
                }
              />
            </div>
          </div>
          <div className="filter-section">
            <h3>Category</h3>
            <FormControl variant="outlined" className="payments-transacions-main-category-dropdown">
              <Select
                value={selectedCategory}
                onChange={(event) =>
                  handleCategoryChange(
                    event,
                    rows,
                    setSelectedCategory,
                    setSelectedSubcategory,
                    setCurrentPage,
                    setFilteredRows
                  )
                }
                displayEmpty
                inputProps={{ "aria-label": "Select category" }}
              >
                <MenuItem value="" disabled>
                  Group by Category
                </MenuItem>
                {allCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-section">
            <h3>Subcategory</h3>
            <FormControl variant="outlined" className="payments-transacions-main-subcategory-dropdown">
              <Select
                value={selectedSubcategory}
                onChange={(event) =>
                  handleSubcategoryChange(
                    event,
                    rows,
                    setSelectedSubcategory,
                    setCurrentPage,
                    setFilteredRows
                  )
                }
                displayEmpty
                inputProps={{ "aria-label": "Select subcategory" }}
              >
                <MenuItem value="" disabled>
                  Group by Subcategory
                </MenuItem>
                {allSubcategories.map((subcategory, index) => (
                  <MenuItem key={index} value={subcategory}>
                    {subcategory}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-section">
            <h3>Additional Field</h3>
            <FormControl variant="outlined" className="payments-transacions-main-field-dropdown">
              <Select
                value={selectedField}
                onChange={(event) =>
                  handleFieldChange(event, rows, setSelectedField, setCurrentPage, setFilteredRows)
                }
                displayEmpty
                inputProps={{ "aria-label": "Select field" }}
              >
                <MenuItem value="" disabled>
                  Select Field
                </MenuItem>
                {allFields.map((field, index) => (
                  <MenuItem key={index} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-section">
            <h3>Created Date Range</h3>
            <FormControl variant="outlined" className="payments-transacions-main-startCreatedAtDate-dropdown">
              <Select
                value={startCreatedAtDate}
                onChange={(event) => setStartCreatedAtDate(event.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Select start createdAt date" }}
              >
                <MenuItem value="" disabled>
                  Select Start Created Date
                </MenuItem>
                {allCreatedAtDates.map((date, index) => (
                  <MenuItem key={index} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="payments-transacions-main-endCreatedAtDate-dropdown">
              <Select
                value={endCreatedAtDate}
                onChange={(event) => setEndCreatedAtDate(event.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Select end createdAt date" }}
              >
                <MenuItem value="" disabled>
                  Select End Created Date
                </MenuItem>
                {allCreatedAtDates.map((date, index) => (
                  <MenuItem key={index} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-section">
            <h3>Updated Date Range</h3>
            <FormControl variant="outlined" className="payments-transacions-main-startUpdatedAtDate-dropdown">
              <Select
                value={startUpdatedAtDate}
                onChange={(event) => setStartUpdatedAtDate(event.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Select start updatedAt date" }}
              >
                <MenuItem value="" disabled>
                  Select Start Updated Date
                </MenuItem>
                {allUpdatedAtDates.map((date, index) => (
                  <MenuItem key={index} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="payments-transacions-main-endUpdatedAtDate-dropdown">
              <Select
                value={endUpdatedAtDate}
                onChange={(event) => setEndUpdatedAtDate(event.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Select end updatedAt date" }}
              >
                <MenuItem value="" disabled>
                  Select End Updated Date
                </MenuItem>
                {allUpdatedAtDates.map((date, index) => (
                  <MenuItem key={index} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-slider-container">
              <Slider
                value={priceRange}
                onChange={(event, newValue) => setPriceRange(newValue)}
                min={Math.min(...rows.map((row) => row.price))}
                max={Math.max(...rows.map((row) => row.price))}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>
          </div>
        </div>
        
        <div className="pagination">
          <Button
            variant="contained"
            onClick={() => handlePageChange(currentPage - 1, setCurrentPage)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          {Array.from({ length: pageCount }, (_, i) => (
            <Button
              key={i + 1}
              variant="contained"
              onClick={() => handlePageChange(i + 1, setCurrentPage)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="contained"
            onClick={() => handlePageChange(currentPage + 1, setCurrentPage)}
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payments;