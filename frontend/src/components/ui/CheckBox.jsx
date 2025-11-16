import React from "react";

const CheckBox = ({ label, onClick }) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={label}
        onClick={onClick}
        className="checkbox-input"
      />
      <label htmlFor={label} className="checkox-label">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
