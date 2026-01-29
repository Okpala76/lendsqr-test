import { useState } from "react";
import styles from "./Loginform.module.scss";

type FieldErrors = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const nextErrors: FieldErrors = {};

    // Email validation
    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    // TODO: submit logic
    console.log({ email, password });
  }
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className={styles.field}>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <span id="email-error" className={styles.errorText}>
              {errors.email}
            </span>
          ) : null}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <div className={styles.passwordField}>
            <input
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
            />

            <button
              type="button"
              className={styles.showBtn}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-pressed={showPassword}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          {errors.password ? (
            <span id="password-error" className={styles.errorText}>
              {errors.password}
            </span>
          ) : null}
        </div>

        <button type="button" className={styles.forgot}>
          FORGOT PASSWORD?
        </button>

        <button type="submit" className={styles.loginBtn}>
          LOG IN
        </button>
      </form>
    </div>
  );
};
