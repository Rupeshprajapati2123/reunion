import React from "react";
import "./infoCard.css";

const InfoCard = ({ title, metric }) => {
  return (
    <div className="info-card">
      <div className="info-card-text">{title}</div>
      <div className="info-card-number">{metric}</div>
    </div>
  );
};

export default InfoCard;
