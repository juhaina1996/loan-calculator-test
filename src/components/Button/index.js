import React from "react";
import styles from "./index.module.scss";
import cx from "classnames";

// Button component accepts several props to customize its appearance and behavior
const Button = ({
  outline,
  children,
  customStyling,
  ariaLabel, // New prop for ARIA label
  ...otherProps
}) => {
  return (
    <button
      // Dynamically assign CSS classes based on props
      className={cx(
        {
          [styles.outline]: outline, // Outline style if 'outline' prop is true
          [styles.filled]: !outline, // Filled style if 'outline' prop is false
        },
        customStyling // Additional custom styles passed via 'customStyling' prop
      )}
      aria-label={ariaLabel} // Set ARIA label if provided
      {...otherProps} // Spread the remaining props onto the button element (e.g., onClick, type, etc.)
    >
      {children}
    </button>
  );
};

export default Button;
