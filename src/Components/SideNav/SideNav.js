import React, { useState } from "react";
import "./sideNav.css";
import userProfilePic from "../../Assets/Images/userProfilePic.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import pages from "./sideNavData";

const SideNav = () => {
  const [active, setActive] = useState("Payments");
  const IconStyle = {
    fontSize: "24px",
    flexShrink: "0",
    color: "var(--Icon-Color)",
    cursor: "pointer",
  };
  // const PageIconStyleInactive = {
  //   fontSize: "20px",
  //   flexShrink: "0",
  //   color: "var(--Icon-Color)",
  //   opacity: "0.8",
  // };
  const BtmIconStyle = {
    fontSize: "24px",
    color: "var(--Icon-Color)",
  };
  return (
    <div className="sideNav">
      <div className="sideNav-top">
        <div className="sideNav-userInfo">
          <img
            src={userProfilePic}
            alt="Nishyan"
            className="sideNav-userInfo-profilePic"
          />
          <div className="sideNav-userInfo-flex">
            <div className="sideNav-userInfo-flex-name">Nishyan</div>
            <a href="/" target="_blank" className="sideNav-userInfo-flex-link">
              Visit Store
            </a>
          </div>
          <KeyboardArrowDownIcon sx={IconStyle} />
        </div>
        <div className="sideNav-pages">
          {pages.map((page) => {
            return (
              <div
                className={
                  active === page.name
                    ? "sideNav-page"
                    : "sideNav-page-inactive"
                }
                key={page.id}
                onClick={() => setActive(page.name)}
              >
                {page.icon}
                <div
                  className={
                    active === page.name
                      ? "sideNav-page-name"
                      : "sideNav-page-name sideNav-page-inactive-text"
                  }
                >
                  {page.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sideNav-btm">
        <div className="sideNav-btm-Icon-container">
          <AccountBalanceWalletOutlinedIcon sx={BtmIconStyle} />
        </div>
        <div className="sideNav-btm-text-flex">
          <div className="sideNav-btm-text">Available credits</div>
          <div className="sideNav-btm-number">222.10</div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
