import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!/(?=.*[A-Z])/.test(value))
      setPasswordMessage("Include uppercase letter.");
    else if (!/(?=.*[a-z])/.test(value))
      setPasswordMessage("Include lowercase letter.");
    else if (value.length < 6) setPasswordMessage("At least 6 characters.");
    else setPasswordMessage("Good to go");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value;
    const photo = e.target.photo.value;

    if (name.length < 5) {
      setNameError("Name must be at least 5 characters.");
      return;
    } else setNameError("");

    if (!passwordRegex.test(password)) {
      setPasswordMessage("Password invalid.");
      return;
    }

    createUser(email, password)
      .then(() => updateUser({ displayName: name, photoURL: photo }))
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/auth/login");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Signed up with Google!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className={styles.registerContainer}>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className={styles.registerCard}>
        {/* Material Design Logo */}
        <div className={styles.materialLogo}>
          <div className={styles.logoLayers}>
            <div className={`${styles.layer} ${styles.layer1}`}></div>
            <div className={`${styles.layer} ${styles.layer2}`}></div>
            <div className={`${styles.layer} ${styles.layer3}`}></div>
          </div>
        </div>

        <div className={styles.registerHeader}>
          <h2>Create Account</h2>
          <p>Join our community and explore amazing toys!</p>
        </div>

        <form onSubmit={handleRegister} className={styles.loginForm}>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input type="text" name="name" id="name" required />
              <label htmlFor="name">Full Name</label>
              <div className={styles.inputLine}></div>
            </div>
            {nameError && <p className="error">{nameError}</p>}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input type="email" name="email" id="email" required />
              <label htmlFor="email">Email</label>
              <div className={styles.inputLine}></div>
            </div>
          </div>

          {/* Photo URL */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input type="text" name="photo" id="photo" required />
              <label htmlFor="photo">Photo URL</label>
              <div className={styles.inputLine}></div>
            </div>
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <div
              className={styles.inputWrapper}
              style={{ position: "relative" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                style={{ paddingRight: "50px" }}
              />
              <label htmlFor="password">Password</label>
              <div className={styles.inputLine}></div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  color: "#757575",
                  fontSize: "16px",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordMessage && (
              <p
                className={
                  passwordMessage === "Good to go"
                    ? styles.passwordWarning + " success"
                    : styles.passwordWarning + " error"
                }
              >
                {passwordMessage}
              </p>
            )}
          </div>

          <button type="submit" className={styles.materialBtn}>
            Register
          </button>
        </form>

        {/* Social Login Divider */}
        <div className={styles.divider}>
          <span>or sign up with</span>
        </div>

        {/* Social Login Buttons */}
        <div className={styles.socialLogin}>
          <button
            type="button"
            className={styles.socialBtn}
            onClick={handleGoogleRegister}
          >
            <div className={styles.socialIcon}>
              <svg viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            Continue with Google
          </button>
        </div>

        <div className={styles.signupLink}>
          <p>
            Already have an account?{" "}
            <Link to="/auth/login" className={styles.createAccount}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
