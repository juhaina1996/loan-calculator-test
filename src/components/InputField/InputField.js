import React from "react";
import styles from "./InputField.module.scss";

// InputField component for rendering a styled input field
const InputField = ({ type, value, onChange, ariaLabel, step }) => (
  <div className={styles.inputBox}>
    <input
      className={styles.input}
      type={type} // Specifies the type of the input (e.g., text, number)
      value={value} // Sets the value of the input field
      onChange={onChange} // Event handler for input value changes
      aria-label={ariaLabel} // Accessibility label for the input field
      step={step} // Specifies the step size for numeric input fields (optional)
    />
  </div>
);

export default InputField;
