import React, { useContext } from "react";
import styles from "./DisplayLoanDetails.module.scss";
import cx from "classnames";
import { AppContext } from "../../context";

// DisplayLoanDetails component to show loan details in a modal
const DisplayLoanDetails = ({
  amount, // The loan amount
  term, // The term of the loan in years
  rate, // The interest rate of the loan
  monthlyPayment, // The calculated monthly payment
  handleCloseModal, // Function to close the modal
}) => {
  const { isMobile } = useContext(AppContext);

  return (
    <div
      className={cx(styles.modalContent, {
        [styles.modalContentMob]: isMobile,
      })}
    >
      {/* Container for displaying loan details */}
      <div className={styles.subContainer}>
        <div>
          <p className={styles.title}>
            Loan Amount:
            <span>${amount}</span> {/* Display the loan amount */}
          </p>
        </div>
        <div>
          <p className={styles.title}>
            Term:
            <span>{term} years</span> {/* Display the loan term in years */}
          </p>
        </div>
      </div>

      <div className={styles.subContainer}>
        <div>
          <p className={styles.title}>
            Interest Rate:
            <span>{rate}%</span> {/* Display the interest rate */}
          </p>
        </div>
        <div>
          <p className={styles.title}>
            Monthly Payment:
            <span>${monthlyPayment}</span> {/* Display the monthly payment */}
          </p>
        </div>
      </div>

      {/* Button to close the modal */}
      <div className={styles.buttonContainer}>
        <button onClick={handleCloseModal} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DisplayLoanDetails;
