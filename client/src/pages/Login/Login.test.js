import { render, screen } from '@testing-library/react';
import Login from './Login';

test("username input should be rendered", () => {
    render(<Login />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl).toBeInTheDocument();
  });

  test("password input should be rendered", () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl).toBeInTheDocument();
  });

  test("button should be rendered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
  });

  test("username input should be empty", () => {
    render(<Login />);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl.value).toBe("");
  });
  
  test("password input should be empty", () => {
    render(<Login />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl.value).toBe("");
  });