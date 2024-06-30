import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

const mockHandleLogin = jest.fn();
const mockOnUsernameChange = jest.fn();
const mockOnPasswordChange = jest.fn();

const setup = () => {
  const utils = render(
    <Login
      username=""
      password=""
      onUsernameChange={mockOnUsernameChange}
      onPasswordChange={mockOnPasswordChange}
      handleLogin={mockHandleLogin}
      action="Login"
    />
  );
  const emailInput = utils.getByPlaceholderText("Enter your email");
  const passwordInput = utils.getByPlaceholderText("Create a password");
  const loginButton = utils.getByRole("button");
  return {
    emailInput,
    passwordInput,
    loginButton,
    ...utils,
  };
};

describe("Login component", () => {
  it("renders correctly", () => {
    const { emailInput, passwordInput, loginButton } = setup();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("calls onUsernameChange when email input changes", () => {
    const { emailInput } = setup();
    fireEvent.change(emailInput, { target: { value: "1@gmail.com" } });
    expect(mockOnUsernameChange).toHaveBeenCalled();
  });

  it("calls onPasswordChange when password input changes", () => {
    const { passwordInput } = setup();
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(mockOnPasswordChange).toHaveBeenCalled();
  });

  it("calls handleLogin when login button is clicked", () => {
    const { loginButton } = setup();
    fireEvent.click(loginButton);
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it("button displays the correct text", () => {
    const action = "Register";
    render(
      <Login
        username=""
        password=""
        onUsernameChange={mockOnUsernameChange}
        onPasswordChange={mockOnPasswordChange}
        handleLogin={mockHandleLogin}
        action={action}
      />
    );
    const actionButton = screen.getByRole("button", { name: action });

    // Check if the button has the correct text content
    expect(actionButton).toHaveTextContent(action);
  });
});
