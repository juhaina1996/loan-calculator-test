import React, { useContext } from "react";
import { AppContext } from "../../context";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import "./header.css";

const Header = () => {
  const { isMobile } = useContext(AppContext);

  return (
    <div
      className={`container-fluid ${isMobile ? "p-2" : "p-4"} headerContainer`}
    >
      <div
        className={`d-flex justify-content-center align-items-center ${
          isMobile ? "h-100" : "h-auto"
        } headerInner`}
      >
        <div className={`text-center ${isMobile ? "fs-4" : "fs-2"} logo`}>
          Check Loan
        </div>
      </div>
    </div>
  );
};

export default Header;
