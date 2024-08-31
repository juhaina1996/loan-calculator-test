import React, { useState, useRef } from "react";
import SelectArrow from "../../assets/SelectArrow";
import SelectArrowDown from "../../assets/SelectArrowDown";
import styles from "./index.css";

const SelectBox = ({
  placeHolder,
  options,
  onChange,
  setSelectedValue,
  selectedValue,
  errorDismissOnclick,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Function to handle dropdown menu toggle
  const handleInputClick = () => {
    setShowMenu(!showMenu);
    errorDismissOnclick();
  };

  // Function to handle item click
  const onItemClick = (option) => {
    setSelectedValue(option);
    onChange(option);
    setShowMenu(false);
  };

  // Function to check if the option is selected
  const isSelected = (option) => {
    return selectedValue && selectedValue.value === option.value;
  };

  // Function to get the display value
  const getDisplay = () => {
    return selectedValue ? selectedValue.label : placeHolder;
  };

  // Function to get the options for dropdown
  const getOptions = () => {
    return options;
  };

  return (
    <div className="dropdownContainer" ref={menuRef}>
      <div onClick={handleInputClick} className="dropdownInput">
        <div className={styles.dropdownSelected}>{getDisplay()}</div>
        <div>
          <div className="dropdownTool">
            {!showMenu ? <SelectArrow /> : <SelectArrowDown />}
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdownMenu">
          {getOptions().map((option) => (
            <div
              key={option.value}
              onClick={() => onItemClick(option)}
              className={`dropdown-item ${
                isSelected(option) ? "selected" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
