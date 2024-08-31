import React, { useState, useRef } from "react";
import cx from "classnames";
import { CSSTransition } from "react-transition-group";
import styles from "./mobile.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import hamburgerClose from "../../assets/hamburgerClose.svg";
import hamburgerMenu from "../../assets/hamburgerMenu.svg";
import { ROUTES_MAIN } from "../routes";

const duration = 100; // Duration for the CSS transition in milliseconds

const NavBarMobile = () => {
  // State to toggle the visibility of the menu
  const [showMenu, setShowMenu] = useState(false);

  // Reference for the CSSTransition component
  const nodeRef = useRef();

  // Hook to get the current location (URL path) for active link styling
  const location = useLocation();

  // Transition styles for CSSTransition
  const transitionStyles = {
    enterActive: styles.menuBarEnterActive,
    enterDone: styles.menuBarEnter,
    exitActive: styles.menuBarExitActive,
    exitDone: styles.menuBarExit,
  };

  // Handler to close the menu when a navigation link is clicked
  const handleNavLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className={styles.mainDiv}>
        {/* Button to toggle the menu visibility */}
        <div
          className={cx(styles.mobileButtons, {
            [styles.mobileButtonsMob]: showMenu,
          })}
        >
          <button
            className={cx(styles.hamburgerButton, {
              [styles.hbWhite]: !showMenu, // White icon when menu is closed
              [styles.hbGreen]: showMenu, // Green icon when menu is open
            })}
            onClick={() => setShowMenu((prev) => !prev)} // Toggle menu visibility
          >
            <img
              src={showMenu ? hamburgerClose : hamburgerMenu} // Show close icon if menu is open, otherwise show menu icon
              alt={showMenu ? "Close menu" : "Open menu"} // Alt text for accessibility
              className={styles.menuIcon}
            />
          </button>
        </div>

        {/* Transition component for the menu */}
        <CSSTransition
          nodeRef={nodeRef}
          in={showMenu} // Control visibility based on state
          timeout={duration} // Transition duration
          classNames={transitionStyles} // CSS classes for transition
          mountOnEnter // Mount component only when it enters
        >
          <div ref={nodeRef} className={styles.menuBar}>
            {/* Navigation menu */}
            <nav className={styles.navBar}>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {ROUTES_MAIN.map((route) => (
                  <li className={styles.navBarItems} key={route.route}>
                    <NavLink
                      className={`${styles.navLink} ${
                        location.pathname === route.route
                          ? styles.activeNavLink
                          : ""
                      }`}
                      to={route.route}
                      onClick={handleNavLinkClick}
                    >
                      {route.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default NavBarMobile;
