import React from "react";

const CheckBox = ({ label, onClick }) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" id={label} onClick={onClick} />
      <label htmlFor={label} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
