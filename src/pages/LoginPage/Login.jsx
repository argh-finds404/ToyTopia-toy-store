import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, setUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Email/password login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful! Welcome back.", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center", autoClose: 3000 });
      });
  };

  // Google Sign-In
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className={styles.loginContainer}>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className={styles.loginCard}>
        {/* Material Design Logo */}
        <div className={styles.materialLogo}>
          <div className={styles.logoLayers}>
            <div className={`${styles.layer} ${styles.layer1}`}></div>
            <div className={`${styles.layer} ${styles.layer2}`}></div>
            <div className={`${styles.layer} ${styles.layer3}`}></div>
          </div>
        </div>

        <div className={styles.loginHeader}>
          <h2>Sign in</h2>
          <p>to continue to your account</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          {/* Email */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input type="email" name="email" id="email" required />
              <label htmlFor="email">Email</label>
              <div className={styles.inputLine}></div>
              <div className={styles.rippleContainer}></div>
            </div>
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                />
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  <div className={styles.toggleRipple}></div>
                  <div
                    className={`${styles.toggleIcon} ${
                      showPassword ? styles.showPassword : ""
                    }`}
                  ></div>
                </button>
              </div>
              <div className={styles.inputLine}></div>
              <div className={styles.rippleContainer}></div>
            </div>
          </div>

          {/* Form Options */}
          <div className={styles.formOptions}>
            <div className={styles.checkboxWrapper}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                <div className={styles.checkboxMaterial}>
                  <div className={styles.checkboxRipple}></div>
                  <svg className={styles.checkboxIcon} viewBox="0 0 24 24">
                    <path
                      className={styles.checkboxPath}
                      d="M4.1,12.7 9,17.6 20.3,6.3"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                Remember me
              </label>
            </div>
            <Link
              to="/auth/forgot-password"
              state={{ email: document.getElementById("email")?.value || "" }}
              className={styles.forgotPassword}
            >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className={styles.materialBtn}>
            <div className={styles.btnRipple}></div>
            <span className={styles.btnText}>Sign In</span>
            <div className={styles.btnLoader}>
              <svg className={styles.loaderCircle} viewBox="0 0 24 24">
                <circle
                  className={styles.loaderPath}
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </button>
        </form>

        {/* Social Login Divider */}
        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        {/* Social Login Buttons */}
        <div className={styles.socialLogin}>
          <button
            type="button"
            className={styles.socialBtn}
            onClick={handleGoogleLogin}
          >
            <div className={styles.socialRipple}></div>
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
            Don't have an account?{" "}
            <Link to="/auth/register" className={styles.createAccount}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
