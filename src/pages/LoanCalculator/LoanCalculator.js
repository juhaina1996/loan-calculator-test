import React, { useContext, useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { LOAN_CALCULATOR_ENUM } from "../../enums/loanCalculatorEnum";
import styles from "./LoanCalculator.module.scss";
import Modal from "react-modal";
import LoanDetailsSubmittedSuccessfulModal from "../LoanDetailsSubmittedSuccessfulModal/LoanDetailsSubmittedSuccessfulModal";
import DisplayLoanDetails from "../DisplayLoanDetails/DisplayLoanDetails";
import Button from "../../components/Button";
import InputField from "../../components/InputField/InputField";
import cx from "classnames";
import { AppContext } from "../../context";
import SelectBox from "../../components/SelectBox/SelectBox";

const LoanCalculator = () => {
  // Retrieve the `isMobile` value from the application context
  const { isMobile } = useContext(AppContext);

  // Define state variables for the loan amount, term, interest rate, monthly payment, modal visibility, and error messages
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPageNumber, setModalPageNumber] = useState(null);
  const [errors, setErrors] = useState({
    amount: "",
    term: "",
    rate: "",
  });
  const [interestRates, setInterestRates] = useState([]);

  // Fetch available interest rates from the API when the component mounts
  useEffect(() => {
    const fetchInterestRates = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/interest-rates`
        );
        const data = await response.json();
        // Format the fetched interest rates for use in the SelectBox component
        const formattedRates = data.map((rate) => ({
          value: rate.rate,
          label: `${rate.rate}%`,
        }));
        setInterestRates(formattedRates);
      } catch (error) {
        console.error("Error fetching interest rates:", error);
      }
    };

    fetchInterestRates();
  }, []);

  // Validate user inputs before performing any calculations or API requests
  const validateInputs = () => {
    const errors = {
      amount: "",
      term: "",
      rate: "",
    };

    if (!amount || isNaN(amount) || amount <= 0) {
      errors.amount = "Please enter a valid loan amount.";
    }

    if (!term || isNaN(term) || term <= 0) {
      errors.term = "Please enter a valid term in years.";
    }

    if (!rate || isNaN(rate.value) || rate.value < 0) {
      errors.rate = "Please select a valid interest rate.";
    }

    // Update the errors state with validation messages
    setErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  // Handle changes to input fields and clear corresponding error messages
  const handleInputChange = (e, field) => {
    switch (field) {
      case "amount":
        setAmount(e.target.value);
        break;
      case "term":
        setTerm(e.target.value);
        break;
      default:
        break;
    }

    // Clear the error message for the specific field being modified
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  // Calculate the monthly payment based on the input values
  const calculatePayment = () => {
    if (!validateInputs()) return;

    const principal = parseFloat(amount);
    const interest = parseFloat(rate.value) / 100 / 12;
    const numPayments = parseFloat(term) * 12;

    const payment =
      (principal * interest) / (1 - Math.pow(1 + interest, -numPayments));
    setMonthlyPayment(payment.toFixed(2));

    // Open the modal and set the modal page number to 2 (DisplayLoanDetails)
    setModalIsOpen(true);
    setModalPageNumber(2);
  };

  // Submit loan details to the server after validating inputs
  const submitLoanDetails = async () => {
    if (!validateInputs()) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/loan-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            term,
            rate,
            monthlyPayment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("API response:", data);

      // Open the modal and set the modal page number to 1 (LoanDetailsSubmittedSuccessfulModal)
      setModalPageNumber(1);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error submitting loan details:", error);
      alert("There was an error submitting your details. Please try again.");
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  // Render the content for the modal based on the current page number
  const renderModalContent = () => {
    switch (modalPageNumber) {
      case 1:
        return (
          <LoanDetailsSubmittedSuccessfulModal
            setModalIsOpen={setModalIsOpen}
            handleCloseModal={handleCloseModal}
            setModalPageNumber={setModalPageNumber}
          />
        );
      case 2:
        return (
          <DisplayLoanDetails
            amount={amount}
            term={term}
            rate={rate.value}
            monthlyPayment={monthlyPayment}
            handleCloseModal={handleCloseModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Card
        titleComponent={
          <p
            className={cx(styles.title, {
              [styles.titleMob]: isMobile,
            })}
          >
            {LOAN_CALCULATOR_ENUM.title}
          </p>
        }
      >
        <form className={styles.loanForm}>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              {LOAN_CALCULATOR_ENUM.loanAmountLabel}
            </label>
            <InputField
              className={styles.input}
              type="number"
              value={amount}
              onChange={(e) => handleInputChange(e, "amount")}
              aria-label={LOAN_CALCULATOR_ENUM.loanAmountLabel}
              placeholder="Enter loan amount"
            />
            {errors.amount && <p className={styles.error}>{errors.amount}</p>}
          </div>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              {LOAN_CALCULATOR_ENUM.termLabel}
            </label>
            <InputField
              className={styles.input}
              type="number"
              value={term}
              onChange={(e) => handleInputChange(e, "term")}
              aria-label={LOAN_CALCULATOR_ENUM.termLabel}
              placeholder="Enter term in years"
            />
            {errors.term && <p className={styles.error}>{errors.term}</p>}
          </div>

          <SelectBox
            placeHolder="Select interest rate"
            options={interestRates}
            onChange={(newValue) => setRate(newValue)}
            setSelectedValue={setRate}
            selectedValue={rate}
            errorDismissOnclick={() =>
              setErrors((prevErrors) => ({ ...prevErrors, rate: "" }))
            }
          />
          {errors.rate && <p className={styles.error}>{errors.rate}</p>}

          <div className={styles.buttonContainer}>
            <Button
              type="button"
              onClick={calculatePayment}
              className={styles.button}
            >
              {LOAN_CALCULATOR_ENUM.calculateButton}
            </Button>
            <Button
              type="button"
              ariaLabel="Submit Form"
              onClick={submitLoanDetails}
              className={styles.button}
            >
              {LOAN_CALCULATOR_ENUM.submitButton}
            </Button>
          </div>
        </form>
      </Card>

      <Modal
        isOpen={modalIsOpen}
        overlayClassName={styles.popupOverlay}
        className={styles.popupContent}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default LoanCalculator;
