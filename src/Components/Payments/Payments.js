import React, { useState } from "react";
import "./payments.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InfoCard from "../InfoCard/InfoCard";
import PaymentsTable from "../PaymentsTable/PaymentsTable";
import { rows } from "../PaymentsTable/PaymentsData";
import { Button } from "@mui/material";
import SortSidebar from '../sortSidebar';

const Payments = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("orderId");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar
  const [filteredRows, setFilteredRows] = useState(rows); // State for filtered rows

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => {
      if (prevOrder === "asc" && column === sortColumn) {
        return "desc";
      } else {
        return "asc";
      }
    });
  };

  const handleDownload = () => {
    const paymentData = rows;
    const jsonData = JSON.stringify(paymentData, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "payment_data.json";
    a.click();
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search query changes

    // Filter data based on search query
    const filteredRows = rows.filter((row) => {
      return Object.values(row).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredRows(filteredRows);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);

  return (
    <div className="payments">
      <div className="payments-overview">
        <div className="payments-overview-header">
          <div className="payments-overview-header-text">Overview</div>
          <div className="payments-overview-header-dropdown">
            <div className="payments-overview-header-dropdown-text">
              Last Month
            </div>
            <KeyboardArrowDownIcon
              style={{ fontSize: "14px", color: "#999999", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="payments-overview-info">
          <InfoCard title={"Online orders"} metric={"231"} />
          <InfoCard title={"Amount received"} metric={"₹23,92,312.19"} />
        </div>
      </div>
      <div className="payments-transactions">
        <div className="payments-transactions-title">
          Transactions | This Month
        </div>
        <div className="payments-transactions-main">
          <div className="payments-transactions-main-actions">
            <div className="payments-transacions-main-search">
              <SearchOutlinedIcon
                style={{ fontSize: "16px", color: "#808080", cursor: "pointer" }}
              />
              <input
                type="text"
                placeholder="Search by order ID..."
                className="payments-transacions-main-search-text"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="payments-transacions-main-other-actions">
              <div className="payments-transacions-main-Icon-flex">
                <div className="payments-transacions-main-Icon-text">Sort</div>
                <Button
                  variant="contained"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  style={{
                    fontSize: "16px",
                    color: "var(--Text-Color-Grey)",
                  }}
                >
                  Open Sidebar
                </Button>
              </div>
              <div className="payments-transacions-main-Icon-flex">
                <FileDownloadOutlinedIcon
                  style={{ fontSize: "20px", color: "var(--Text-Color-Grey)" }}
                  onClick={handleDownload}
                />
              </div>
            </div>
          </div>
          <PaymentsTable
            sortOrder={sortOrder}
            sortColumn={sortColumn}
            products={currentRows}
            searchQuery={searchQuery}
            onSort={handleSort} // Pass the handleSort function
          />
          <SortSidebar
            sortOptions={Object
              .keys(rows[0])}
              onSelectSort={handleSort}
              open={sidebarOpen} // Pass the open state to the sidebar component
              onClose={() => setSidebarOpen(false)} // Toggle the open state when the closing button is clicked
            />
            <div className="pagination">
              <Button
                variant="contained"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              {Array.from({ length: pageCount }, (_, i) => (
                <Button
                  key={i + 1}
                  variant="contained"
                  onClick={() => handlePageChange(i + 1)}
                  disabled={currentPage === i + 1}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="contained"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Payments;
  