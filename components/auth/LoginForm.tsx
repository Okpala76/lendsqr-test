"use client";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import styles from "./Loginform.module.scss";

export const LoginForm = () => {
  const {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  const router = useRouter();

  const onSubmit = (data: { email: string; password: string }) => {
    // TODO: submit logic
    router.push("/dashboard");
    console.log(data);
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
        noValidate
      >
        {/* Email */}
        <div className={styles.field}>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
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
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
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
