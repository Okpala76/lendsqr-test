import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../LoginForm";

describe("LoginForm Component", () => {
  // Positive Scenarios
  beforeEach(() => {
    render(<LoginForm />);
  });
  describe("Positive Scenarios", () => {
    test("should render all form elements correctly", () => {
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /log in/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /forgot password/i }),
      ).toBeInTheDocument();
    });

    test("should toggle password visibility when show/hide button is clicked", async () => {
      const user = userEvent.setup();

      const passwordInput = screen.getByPlaceholderText(
        "Password",
      ) as HTMLInputElement;
      const toggleBtn = screen.getByRole("button", { name: /show/i });

      expect(passwordInput.type).toBe("password");
      expect(toggleBtn).toHaveTextContent("SHOW");

      await user.click(toggleBtn);
      expect(passwordInput.type).toBe("text");
      expect(toggleBtn).toHaveTextContent("HIDE");

      await user.click(toggleBtn);
      expect(passwordInput.type).toBe("password");
      expect(toggleBtn).toHaveTextContent("SHOW");
    });

    test("should accept and submit valid form data", async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "user@example.com");
      await user.type(passwordInput, "validpassword123");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith({
          email: "user@example.com",
          password: "validpassword123",
        });
      });

      consoleSpy.mockRestore();
    });

    test("should clear validation errors after successful correction", async () => {
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      // Submit with invalid data
      await user.type(emailInput, "invalid");
      await user.type(passwordInput, "short");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/enter a valid email address/i),
        ).toBeInTheDocument();
        expect(
          screen.getByText(/password must be at least 6 characters/i),
        ).toBeInTheDocument();
      });

      // Correct the data
      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, "valid@example.com");
      await user.type(passwordInput, "correctpassword");
      await user.click(submitBtn);

      // Errors should be cleared
      await waitFor(() => {
        expect(
          screen.queryByText(/enter a valid email address/i),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(/password must be at least 6 characters/i),
        ).not.toBeInTheDocument();
      });
    });

    test("should not show validation errors on initial render", () => {
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password is required/i),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/enter a valid email address/i),
      ).not.toBeInTheDocument();
    });
  });

  // Negative Scenarios
  describe("Negative Scenarios", () => {
    test("should show validation errors for empty form submission", async () => {
      const user = userEvent.setup();

      const submitBtn = screen.getByRole("button", { name: /log in/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/Email is required/)).toBeInTheDocument();
        expect(
          screen.getByText(/Password must be at least 6 characters/),
        ).toBeInTheDocument();
      });
    });

    test("should show error for invalid email format", async () => {
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText("Email");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      // Test various invalid formats
      await user.type(emailInput, "invalid-email");
      await user.click(submitBtn);
      expect(
        screen.getByText(/enter a valid email address/i),
      ).toBeInTheDocument();

      await user.clear(emailInput);
      await user.type(emailInput, "user@");
      await user.click(submitBtn);
      expect(
        screen.getByText(/enter a valid email address/i),
      ).toBeInTheDocument();

      await user.clear(emailInput);
      await user.type(emailInput, "@example.com");
      await user.click(submitBtn);
      expect(
        screen.getByText(/enter a valid email address/i),
      ).toBeInTheDocument();
    });

    test("should show error for password that is too short", async () => {
      const user = userEvent.setup();

      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      // Test password less than 6 characters
      await user.type(passwordInput, "12345");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least 6 characters/i),
        ).toBeInTheDocument();
      });
    });

    test("should prevent submission and apply error styling for invalid inputs", async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitBtn = screen.getByRole("button", { name: /log in/i });

      // Submit with invalid data
      await user.type(emailInput, "bad-email");
      await user.type(passwordInput, "123");
      await user.click(submitBtn);

      await waitFor(() => {
        // Should not call submit handler
        expect(consoleSpy).not.toHaveBeenCalled();

        // Should show error messages
        expect(
          screen.getByText(/enter a valid email address/i),
        ).toBeInTheDocument();
        expect(
          screen.getByText(/password must be at least 6 characters/i),
        ).toBeInTheDocument();

        // Should apply error styling
        expect(emailInput).toHaveClass("inputError");
        expect(passwordInput).toHaveClass("inputError");
      });

      consoleSpy.mockRestore();
    });
  });
});
