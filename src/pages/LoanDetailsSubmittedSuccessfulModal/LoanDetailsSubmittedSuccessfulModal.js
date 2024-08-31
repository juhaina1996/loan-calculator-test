import React, { useContext } from "react";
import styles from "./LoanDetailsSubmittedSuccessfulModal.module.scss";
import ButtonRade from "../../components/Button";
import cx from "classnames";
import { AppContext } from "../../context";
import exclamationIcon from "../../assets/Upload Icon.svg";
import { LOAN_CALCULATOR_ENUM } from "../../enums/loanCalculatorEnum";

// Component for displaying a modal to complete KYC
const LoanDetailsSubmittedSuccessfulModal = ({ setModalIsOpen }) => {
  const { isMobile } = useContext(AppContext);

  // Function to handle complete KYC button click
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Inner component for the card body
  const CardBody = () => (
    <div className={styles.mainContainer}>
      <img
        src={exclamationIcon}
        alt="exclamationIcon"
        className={styles.exclamationIcon}
      />
      <div
        className={cx(styles.submissionSuccesfullContainer, {
          [styles.submissionSuccesfullContainerMob]: isMobile,
        })}
      >
        {LOAN_CALCULATOR_ENUM.submissionSuccessMessage}
      </div>

      <div
        className={cx(styles.buttonContainer, {
          [styles.buttonContainerMob]: isMobile,
        })}
      >
        <ButtonRade
          className={cx(styles.closeButton, {
            [styles.closeButtonMob]: isMobile,
          })}
          onClick={closeModal}
        >
          {LOAN_CALCULATOR_ENUM.close}
        </ButtonRade>
      </div>
    </div>
  );

  return <CardBody />;
};

export default LoanDetailsSubmittedSuccessfulModal;
