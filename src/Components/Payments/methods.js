// methods.js

export const handleSort = (column, sortColumn, sortOrder, setSortColumn, setSortOrder) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => {
      if (prevOrder === "asc" && column === sortColumn) {
        return "desc";
      } else {
        return "asc";
      }
    });
  };
  
  export const handleDownload = (rows) => {
    const paymentData = rows;
    const jsonData = JSON.stringify(paymentData, null, 2);
  
    const blob = new Blob([jsonData], { type: "application/json" });
  
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "payment_data.json";
    a.click();
  };
  
  export const handleSearch = (event, rows, setSearchQuery, setCurrentPage, setFilteredRows) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  
    const filteredRows = rows.filter((row) => {
      return Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      );
    });
  
    setFilteredRows(filteredRows);
  };
  
  export const handleCategoryChange = (event, rows, setSelectedCategory, setSelectedSubcategory, setCurrentPage, setFilteredRows) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory
    setCurrentPage(1);
  
    const filteredRows = rows.filter((row) => {
      return row.category === category;
    });
  
    setFilteredRows(filteredRows);
  };
  
  export const handleSubcategoryChange = (event, rows, setSelectedSubcategory, setCurrentPage, setFilteredRows) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  
    const filteredRows = rows.filter((row) => {
      return row.subcategory === subcategory;
    });
  
    setFilteredRows(filteredRows);
  };
  
  export const handleFieldChange = (event, rows, setSelectedField, setCurrentPage, setFilteredRows) => {
    const field = event.target.value;
    setSelectedField(field);
    setCurrentPage(1);
  
    const filteredRows = rows.filter((row) => {
      return row.field === field;
    });
  
    setFilteredRows(filteredRows);
  };
  
  export const handlePageChange = (pageNumber, setCurrentPage) => {
    setCurrentPage(pageNumber);
  };
  