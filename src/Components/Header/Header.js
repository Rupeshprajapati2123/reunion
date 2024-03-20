import React from "react";
import "./header.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const Header = () => {
  const IconSmallStyle = { fontSize: "14px", color: "var(--Text-Color-Grey)" };
  const IconSearchStyle = {
    fontSize: "16px",
    color: "#808080",
    cursor: "pointer",
  };
  const headerIconStyle = { fontSize: "24px", color: "#4d4d4d" };
  const headerIconStyle2 = { fontSize: "40px", color: "#4d4d4d" };
  return (
    <div className="header">
      <div className="header-text-flex">
        <div className="header-text">Payments</div>
        <div className="header-info-flex">
          <HelpOutlineOutlinedIcon sx={IconSmallStyle} />
          <div className="header-info-text">How it works</div>
        </div>
      </div>
      <div className="header-search-flex">
        <SearchOutlinedIcon sx={IconSearchStyle} />
        <input
          type="text"
          placeholder="Search features, tutorials, etc."
          className="header-search"
        />
      </div>
      <div className="header-icons">
        <div className="header-icon-bg">
          <CampaignIcon sx={headerIconStyle} />
        </div>
        <div className="header-icon-bg">
          <ArrowDropDownRoundedIcon sx={headerIconStyle2} />
        </div>
      </div>
    </div>
  );
};

export default Header;
