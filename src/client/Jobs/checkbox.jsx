import React from "react";

const CheckBox = ({ label, handleToggle, isChecked, name }) => {
  return (
    <div class="row">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        name={name}
      />
      <label>{label}</label>
    </div>
  );
};

export default CheckBox;
