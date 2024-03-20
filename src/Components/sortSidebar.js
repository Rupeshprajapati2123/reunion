// SortSidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SortSidebar = ({ sortOptions, onSelectSort, onClose, open }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <List>
        {sortOptions.map(option => (
          <ListItem button key={option} onClick={() => onSelectSort(option)}>
            <ListItemText primary={option} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SortSidebar;
