import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./components/Button"; // Adjust the import path as necessary
import "@testing-library/jest-dom";

describe("Button Component", () => {
  test("renders button with children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("applies outline style when outline prop is true", () => {
    render(<Button outline>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("outline");
  });

  test("applies filled style when outline prop is false", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("filled");
  });

  test("applies custom styling", () => {
    render(<Button customStyling="custom-class">Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("custom-class");
  });

  test("passes other props to button element", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} type="submit">
        Click Me
      </Button>
    );
    const button = screen.getByText("Click Me");

    // Check if the button has the correct type attribute
    expect(button).toHaveAttribute("type", "submit");

    // Click the button and ensure the click handler is called
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
