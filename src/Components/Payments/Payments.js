import React, { useState, useEffect } from "react";
import "./payments.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PaymentsTable from "../PaymentsTable/PaymentsTable";
import { rows } from "../PaymentsTable/PaymentsData";
import { Button, FormControl, Select, MenuItem, Slider, Checkbox, ListItemText } from "@mui/material";
import { handleSort, handleDownload, handleSearch, handleSubcategoryChange, handleFieldChange, handlePageChange } from "./methods";

const Payments = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("orderId");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const allCategories = Array.from(new Set(rows.map((row) => row.category)));
  const allSubcategories = Array.from(new Set(rows.map((row) => row.subcategory)));
  const allCreatedAtDates = Array.from(new Set(rows.map((row) => row.createdAt)));
  const allUpdatedAtDates = Array.from(new Set(rows.map((row) => row.updatedAt)));
  allCreatedAtDates.sort((a, b) => new Date(a) - new Date(b));
  allUpdatedAtDates.sort((a, b) => new Date(a) - new Date(b));
  const [startCreatedAtDate, setStartCreatedAtDate] = useState(allCreatedAtDates[0]); // Set to the first date
  const [endCreatedAtDate, setEndCreatedAtDate] = useState(allCreatedAtDates[allCreatedAtDates.length - 1]); // Set to the last date
  const [startUpdatedAtDate, setStartUpdatedAtDate] = useState(allUpdatedAtDates[0]);
  const [endUpdatedAtDate, setEndUpdatedAtDate] = useState(allUpdatedAtDates[allUpdatedAtDates.length - 1]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  useEffect(() => {
    const minPrice = Math.min(...rows.map((row) => row.price));
    const maxPrice = Math.max(...rows.map((row) => row.price));
    setPriceRange([minPrice, maxPrice]);
  }, []);

  const filteredByPrice = rows.filter((row) => row.price >= priceRange[0] && row.price <= priceRange[1]);
  const filteredByCreatedAtDateRange = rows.filter((row) => new Date(row.createdAt) >= new Date(startCreatedAtDate) && new Date(row.createdAt) <= new Date(endCreatedAtDate));
  const filteredByUpdatedAtDateRange = rows.filter((row) => new Date(row.updatedAt) >= new Date(startUpdatedAtDate) && new Date(row.updatedAt) <= new Date(endUpdatedAtDate));
  const filteredByCategories = selectedCategories.length > 0 ? rows.filter((row) => selectedCategories.includes(row.category)) : rows;
  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);

  const clearFilters = () => {
    setFilteredRows(rows);
    setSearchQuery("");
    setCurrentPage(1);
    setSidebarOpen(false);
    setSelectedSubcategory("");
    setSelectedField("");
    setSelectedCategories([]);
    setPriceRange([Math.min(...rows.map((row) => row.price)), Math.max(...rows.map((row) => row.price))]);
    setStartCreatedAtDate(allCreatedAtDates[0]);
    setEndCreatedAtDate(allCreatedAtDates[allCreatedAtDates.length - 1]);
    setStartUpdatedAtDate(allUpdatedAtDates[0]);
    setEndUpdatedAtDate(allUpdatedAtDates[allUpdatedAtDates.length - 1]);
  };

  useEffect(() => {
    const filteredData = filteredByPrice.filter((row) => filteredByCreatedAtDateRange.includes(row) && filteredByUpdatedAtDateRange.includes(row) && filteredByCategories.includes(row));
    setFilteredRows(filteredData);
  }, [priceRange, startCreatedAtDate, endCreatedAtDate, startUpdatedAtDate, endUpdatedAtDate, selectedCategories,selectedSubcategories]);
  useEffect(() => {
    const filteredData = rows.filter((row) => {
      const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(row.category);
      const isSubcategoryMatch = selectedSubcategories.length === 0 || selectedSubcategories.includes(row.subcategory);
      return isCategoryMatch && isSubcategoryMatch;
    });
    setFilteredRows(filteredData);
  }, [selectedCategories, selectedSubcategories]);
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategories(selectedCategory);
    setCurrentPage(1);
  };
  const handleSubcategoryChange = (event) => {
    const selectedSubcategory = event.target.value;
    setSelectedSubcategories(selectedSubcategory);
  };

  return (
    <div className="payments">
      <div className="payments-transactions">
        
        <div className="payments-transacions-main-actions">
          <Button variant="contained" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ fontSize: "16px", color: "var(--Text-Color-White)" }}>{sidebarOpen ? "Hide Filters" : "Show Filters"}</Button>
       
        </div>
        {filteredRows.length > 0 ? (
          <PaymentsTable sortOrder={sortOrder} sortColumn={sortColumn} products={currentRows} searchQuery={searchQuery} onSort={(column) => handleSort(column, sortColumn, sortOrder, setSortColumn, setSortOrder)} />
        ) : (
          <p>No data available for the selected filters.</p>
        )}
        <div className={`filter-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="filter-section">
            <h3>Search</h3>
            <div className="payments-transacions-main-search">
              
              <SearchOutlinedIcon style={{ fontSize: "16px", color: "#808080", cursor: "pointer" }} />
              <input type="text" placeholder="Search by order ID..." className="payments-transacions-main-search-text" value={searchQuery} onChange={(event) => handleSearch(event, rows, setSearchQuery, setCurrentPage, setFilteredRows)} />
            </div>
          </div>
          <div className="filter-section">
            <h3>Category</h3>
            <FormControl variant="outlined" className="payments-transacions-main-category-dropdown">
              <Select multiple value={selectedCategories} onChange={handleCategoryChange} renderValue={(selected) => selected.join(", ")} displayEmpty inputProps={{ "aria-label": "Select categories" }}>
                {allCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    <Checkbox checked={selectedCategories.includes(category)} />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-section">
            <h3>Subcategory</h3>
            <FormControl variant="outlined" className="payments-transacions-main-subcategory-dropdown">
              <Select
                multiple
                value={selectedSubcategories}
                onChange={handleSubcategoryChange}
                renderValue={(selected) => selected.join(", ")}
                
                inputProps={{ "aria-label": "Select subcategory" }}
              >
                <MenuItem value={startCreatedAtDate} disabled>Select subcategory</MenuItem>
                {allSubcategories.map((subcategory) => (
                  <MenuItem key={subcategory} value={subcategory}>
                    <Checkbox checked={selectedSubcategories.includes(subcategory)} />
                    <ListItemText primary={subcategory} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-section">
            <h3>Created Date Range</h3>
            <FormControl variant="outlined" className="payments-transacions-main-startCreatedAtDate-dropdown">
  <Select value={startCreatedAtDate} onChange={(event) => setStartCreatedAtDate(event.target.value)} displayEmpty inputProps={{ "aria-label": "Select start createdAt date" }}>
    <MenuItem value={startCreatedAtDate} disabled>Select Start Created Date</MenuItem>
    {allCreatedAtDates.map((date, index) => (
      <MenuItem key={index} value={date.split('T')[0]}>{date.split('T')[0]}</MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl variant="outlined" className="payments-transacions-main-endCreatedAtDate-dropdown">
  <Select value={endCreatedAtDate} onChange={(event) => setEndCreatedAtDate(event.target.value)} displayEmpty inputProps={{ "aria-label": "Select end createdAt date" }}>
    <MenuItem value={endCreatedAtDate} disabled>Select End Created Date</MenuItem>
    {allCreatedAtDates.map((date, index) => (
      <MenuItem key={index} value={date.split('T')[0]}>{date.split('T')[0]}</MenuItem>
    ))}
  </Select>
</FormControl>

          </div>
          <div className="filter-section">
            <h3>Updated Date Range</h3>
            <FormControl variant="outlined" className="payments-transacions-main-startUpdatedAtDate-dropdown">
  <Select value={startUpdatedAtDate} onChange={(event) => setStartUpdatedAtDate(event.target.value)} displayEmpty inputProps={{ "aria-label": "Select start updatedAt date" }}>
    <MenuItem value={startUpdatedAtDate} disabled>Select Start Updated Date</MenuItem>
    {allUpdatedAtDates.map((date, index) => (
      <MenuItem key={index} value={date.split('T')[0]}>{date.split('T')[0]}</MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl variant="outlined" className="payments-transacions-main-endUpdatedAtDate-dropdown">
  <Select value={endUpdatedAtDate} onChange={(event) => setEndUpdatedAtDate(event.target.value)} displayEmpty inputProps={{ "aria-label": "Select end updatedAt date" }}>
    <MenuItem value={endUpdatedAtDate} disabled>Select End Updated Date</MenuItem>
    {allUpdatedAtDates.map((date, index) => (
      <MenuItem key={index} value={date.split('T')[0]}>{date.split('T')[0]}</MenuItem>
    ))}
  </Select>
</FormControl>

          </div>
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-slider-container">
              <Slider value={priceRange} onChange={(event, newValue) => setPriceRange(newValue)} min={Math.min(...rows.map((row) => row.price))} max={Math.max(...rows.map((row) => row.price))} step={1} valueLabelDisplay="auto" aria-labelledby="range-slider" />
            </div>
          </div>
          <Button variant="contained" onClick={clearFilters} style={{ marginTop: "20px" }}>Clear Filters</Button>
        </div>
        <div className="pagination">
          <Button variant="contained" onClick={() => handlePageChange(currentPage - 1, setCurrentPage)} disabled={currentPage === 1}>Prev</Button>
          {Array.from({ length: pageCount }, (_, i) => (
            <Button key={i + 1} variant="contained" onClick={() => handlePageChange(i + 1, setCurrentPage)} disabled={currentPage === i + 1}>{i + 1}</Button>
          ))}
          <Button variant="contained" onClick={() => handlePageChange(currentPage + 1, setCurrentPage)} disabled={currentPage === pageCount}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
