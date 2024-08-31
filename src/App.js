import React from "react";
import cx from "classnames";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "./context";
import Header from "./components/header/header";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBarMobile from "./pages/Mobile";
import styles from "./styles/app.module.scss";
import { Helmet } from "react-helmet";
import { ROUTES_MAIN } from "./pages/routes";

function App() {
  // Get the current location for navigation purposes
  const location = useLocation();

  // Check if the viewport width is less than or equal to 992px to determine if it's mobile view
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <>
      <Helmet>
        {/* Meta tags for SEO and responsive design */}
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>Loan Calculator</title>
      </Helmet>

      {/* Provide the AppContext to child components */}
      <AppContext.Provider
        value={{
          isMobile,
        }}
      >
        {/* Conditional className for header container based on screen size */}
        <div
          className={cx(styles.headerContainer, {
            [styles.headerContainerMob]: isMobile,
          })}
        >
          <Header />
        </div>

        {/* Render mobile navigation bar if it's a mobile view */}
        {isMobile && <NavBarMobile />}

        <div
          className={cx(styles.mainContentDiv, {
            [styles.mainContentDivMob]: isMobile,
          })}
        >
          {/* Conditional rendering of the desktop navigation bar */}
          {!isMobile && (
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
                    >
                      {route.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div
            className={cx(styles.layoutDiv, {
              [styles.layoutDivMob]: isMobile,
            })}
          >
            {/* Define routes for the application */}
            <Routes>
              {/* Redirect from the root path to the loan calculator page */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {ROUTES_MAIN.map((route) => (
                <Route
                  key={route.route}
                  path={route.route}
                  element={route.component}
                />
              ))}
            </Routes>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
