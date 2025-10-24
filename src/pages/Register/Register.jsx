import React, { useState, useContext } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!/(?=.*[A-Z])/.test(value)) {
      setPasswordMessage(
        "Password must include at least one uppercase letter."
      );
    } else if (!/(?=.*[a-z])/.test(value)) {
      setPasswordMessage(
        "Password must include at least one lowercase letter."
      );
    } else if (value.length < 6) {
      setPasswordMessage("Password must be at least 6 characters long.");
    } else {
      setPasswordMessage("Good to go");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value;
    const photo = e.target.photo.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name must be at least 5 characters long.");
      return;
    } else {
      setNameError(""); // clear previous error
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      setPasswordMessage(
        "Password must have at least one uppercase, one lowercase, and be at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        setPasswordMessage("");

        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        setPasswordMessage(error.message);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className={styles.registerContainer}>
      {/* Dynamic page title */}
      <Helmet>
        <title>Registration</title>
      </Helmet>
      
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <div className={styles.materialLogo}>
            <div className={styles.logoLayers}>
              <div className={`${styles.layer} ${styles.layer1}`}></div>
              <div className={`${styles.layer} ${styles.layer2}`}></div>
              <div className={`${styles.layer} ${styles.layer3}`}></div>
            </div>
          </div>
          <h2>Create Account</h2>
          <p>Join us and enjoy your journey</p>
        </div>

        <form onSubmit={handleRegister} className={styles.registerForm}>
          {/* Name */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input name="name" type="text" id="name" required />
              <label htmlFor="name">Full Name</label>
              <span className={styles.inputLine}></span>
            </div>
            {nameError && (
              <p
                className={styles.passwordWarning}
                style={{ color: "#e53935" }}
              >
                {nameError}
              </p>
            )}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input name="email" type="email" id="email" required />
              <label htmlFor="email">Email</label>
              <span className={styles.inputLine}></span>
            </div>
          </div>

          {/* Photo URL */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input name="photo" type="text" id="photoURL" required />
              <label htmlFor="photoURL">Photo URL</label>
              <span className={styles.inputLine}></span>
            </div>
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="password">Password</label>
              <span className={styles.inputLine}></span>
            </div>
            {passwordMessage && (
              <p
                className={styles.passwordWarning}
                style={{
                  color:
                    passwordMessage === "Good to go" ? "#43a047" : "#e53935",
                }}
              >
                {passwordMessage}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button type="submit" className={styles.materialBtn}>
            <span className={styles.btnText}>Register</span>
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span>or</span>
          </div>

          {/* Google Login */}
          <div className={styles.socialLogin}>
            <button className={styles.socialBtn}>
              <div className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.94 0 7.02 1.63 9.17 3l6.76-6.76C35.5 2.24 30.13 0 24 0 14.62 0 6.43 5.37 2.46 13.18l7.9 6.15C12.11 13.74 17.58 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.1 24.5c0-1.57-.14-3.08-.4-4.55H24v9h12.7c-.55 2.84-2.17 5.25-4.62 6.86l7.19 5.56c4.2-3.88 6.83-9.61 6.83-16.87z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M9.36 28.67a14.44 14.44 0 010-9.34l-7.9-6.15C.51 16.13 0 19 0 22s.51 5.87 1.46 8.82l7.9-6.15z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 48c6.13 0 11.49-2.02 15.32-5.53l-7.19-5.56c-2 1.33-4.56 2.09-8.13 2.09-6.42 0-11.89-4.24-13.64-10.09l-7.9 6.15C6.43 42.63 14.62 48 24 48z"
                  />
                </svg>
              </div>
              Continue with Google
            </button>
          </div>

          {/* Login Link */}
          <div className={styles.signupLink}>
            <p>
              Already have an account?{" "}
              <Link to="/auth/login" className={styles.createAccount}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
