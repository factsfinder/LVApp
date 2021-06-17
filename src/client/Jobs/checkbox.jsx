import React from "react";

const CheckBox = ({ label, handleToggle, isChecked }) => {
  return (
    <div class="row">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <label>{label}</label>
    </div>
  );
};

export default CheckBox;
