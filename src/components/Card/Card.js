import React, { useContext } from "react";
import styles from "./Card.module.scss";
import { AppContext } from "../../context";
import cx from "classnames";

// Card component to display content with a title and body
const Card = ({ titleComponent, children }) => {
  // Access the 'isMobile' value from AppContext to apply responsive styles
  const { isMobile } = useContext(AppContext);

  return (
    <div
      // Apply dynamic class names based on the 'isMobile' value
      className={cx(styles.rudMainDiv, {
        [styles.rudMainDivMob]: isMobile, // Apply mobile-specific styles if 'isMobile' is true
      })}
    >
      {/* Render the title component passed as a prop */}
      <div className={styles.titleContainer}>{titleComponent}</div>
      {/* Render the children components or content passed as a prop */}
      <div className={styles.bodyContainer}>{children}</div>
    </div>
  );
};

export default Card;
