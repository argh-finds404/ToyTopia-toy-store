import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from "./LoginPage/Login.module.css";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const location = useLocation();
  const prefilledEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefilledEmail);

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(`Password reset email sent to ${email}. Check your inbox/spam!`);
        setEmail(""); // optional: clear email after sending
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.loginContainer}>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>

      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
        </div>

        <form onSubmit={handleReset} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <div className={styles.inputLine}></div>
              <div className={styles.rippleContainer}></div>
            </div>
          </div>

          <button type="submit" className={styles.materialBtn}>
            <div className={styles.btnRipple}></div>
            <span className={styles.btnText}>Reset Password</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
