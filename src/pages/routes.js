import HomePage from "./HomePage/HomePage";
import LoanCalculator from "./LoanCalculator/LoanCalculator";
export const ROUTES_MAIN = [
  {
    label: "Home",
    route: "/home",
    component: <HomePage />,
  },
  {
    label: "Loan Calculation",
    route: "/loanCalulator",
    component: <LoanCalculator />,
  },
];
