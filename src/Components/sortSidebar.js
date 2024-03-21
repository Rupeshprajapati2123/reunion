// SortSidebar.js
import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";

const SortSidebar = ({ sortOptions, onSelectSort, open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      
    </Drawer>
  );
};

export default SortSidebar;
