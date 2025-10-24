import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import styles from "./Login.module.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
      .then((res) => {
        const user = res.user;
        // show success toast
        toast.success("Login successful! Welcome back.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className={styles.loginContainer}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.materialLogo}>
            <div className={styles.logoLayers}>
              <div className={`${styles.layer} ${styles.layer1}`}></div>
              <div className={`${styles.layer} ${styles.layer2}`}></div>
              <div className={`${styles.layer} ${styles.layer3}`}></div>
            </div>
          </div>
          <h2>Sign in</h2>
          <p>to continue to your account</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm} noValidate>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
              />
              <label htmlFor="email">Email</label>
              <div className={styles.inputLine}></div>
              <div className={styles.rippleContainer}></div>
            </div>
            <span className={styles.errorMessage} id="emailError"></span>
          </div>

          <div className={styles.formGroup}>
            <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                autoComplete="current-password"
              />
              <label htmlFor="password">Password</label>
              <div className={styles.inputLine}></div>
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <div className={styles.toggleRipple}></div>
                <span className={styles.toggleIcon}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </button>
              <div className={styles.rippleContainer}></div>
            </div>
            <span className={styles.errorMessage} id="passwordError"></span>
          </div>

          <div className={styles.formOptions}>
            <div className={styles.checkboxWrapper}>
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember" className={styles.checkboxLabel}>
                <div className={styles.checkboxMaterial}>
                  <div className={styles.checkboxRipple}></div>
                  <svg className={styles.checkboxIcon} viewBox="0 0 24 24">
                    <path
                      className={styles.checkboxPath}
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                    />
                  </svg>
                </div>
                Keep me signed in
              </label>
            </div>
            <Link to="" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`${styles.loginBtn} ${styles.materialBtn}`}
          >
            <div className={styles.btnRipple}></div>
            <span className={styles.btnText}>SIGN IN</span>
            <div className={styles.btnLoader}>
              <svg className={styles.loaderCircle} viewBox="0 0 50 50">
                <circle
                  className={styles.loaderPath}
                  cx="25"
                  cy="25"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <div className={styles.socialLogin}>
          <button
            type="button"
            className={`${styles.socialBtn} ${styles.googleMaterial}`}
          >
            <div className={styles.socialRipple}></div>
            <div className={`${styles.socialIcon} ${styles.googleIcon}`}>
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
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className={`${styles.socialBtn} ${styles.facebookMaterial}`}
          >
            <div className={styles.socialRipple}></div>
            <div className={`${styles.socialIcon} ${styles.facebookIcon}`}>
              <svg viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </div>
            <span>Continue with Facebook</span>
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

        <div className={styles.successMessage} id="successMessage">
          <div className={styles.successElevation}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h3>Welcome back!</h3>
            <p>Signing you in...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
