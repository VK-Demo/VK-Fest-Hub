import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/users/Login_User.css';
import logoImg from '../../assets/images/common/Logo.jpeg';
import { loginUser, getUsers } from '../../services/authStorage';
import {
  BsEye,
  BsEyeSlash,
  BsEnvelopeFill,
  BsLockFill,
  BsShieldLockFill,
  BsArrowLeft,
  BsCheckCircleFill,
} from 'react-icons/bs';

const Login_User = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Send OTP simulation
  const handleSendOtp = () => {
    if (!identifier.trim()) {
      setErrorMsg('Please enter your Email or 10-digit Mobile Number first.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setSuccessMsg(`A 6-digit verification OTP has been sent to ${identifier.trim()}`);
    setCountdown(30);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Form submit handler (Supports either Password or OTP)
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanId = identifier.trim();
    if (!cleanId) {
      setErrorMsg('Please enter your Email or Mobile Number.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    // Check if user is logging in with Password or OTP
    if (password.trim()) {
      // 1. Password Login
      const result = loginUser(cleanId, password);
      if (!result.success) {
        setErrorMsg(result.message);
        return;
      }
      setSuccessMsg(`Welcome back, ${result.user.fullName || result.user.username}! Redirecting...`);
      setTimeout(() => {
        navigate('/services');
      }, 700);
    } else if (otp.trim()) {
      // 2. OTP Login
      if (otp.trim().length < 4) {
        setErrorMsg('Please enter a valid OTP code.');
        return;
      }
      // Look up user by identifier in authStorage
      const users = getUsers();
      const matched = users.find(
        (u) =>
          (u.email && u.email.toLowerCase() === cleanId.toLowerCase()) ||
          (u.mobileNo && u.mobileNo === cleanId) ||
          (u.username && u.username.toLowerCase() === cleanId.toLowerCase())
      );

      if (matched) {
        const { password: _, ...userSession } = matched;
        localStorage.setItem(
          'vk_current_session',
          JSON.stringify({ role: 'user', user: userSession, loggedInAt: new Date().toISOString() })
        );
        window.dispatchEvent(new Event('vk_auth_change'));
        setSuccessMsg(`OTP verified! Welcome back, ${matched.fullName || matched.username}!`);
      } else {
        // Create demo session for the verified mobile/email
        const newSessionUser = {
          id: 'user_otp_' + Date.now(),
          username: cleanId.includes('@') ? cleanId.split('@')[0] : 'User_' + cleanId.slice(-4),
          fullName: 'VK Member',
          email: cleanId.includes('@') ? cleanId : '',
          mobileNo: cleanId.includes('@') ? '' : cleanId,
        };
        localStorage.setItem(
          'vk_current_session',
          JSON.stringify({ role: 'user', user: newSessionUser, loggedInAt: new Date().toISOString() })
        );
        window.dispatchEvent(new Event('vk_auth_change'));
        setSuccessMsg('OTP verified successfully! Redirecting...');
      }

      setTimeout(() => {
        navigate('/services');
      }, 700);
    } else {
      setErrorMsg('Please enter your Password OR request an OTP to log in.');
    }
  };

  // Social Login Handler
  const handleSocialLogin = (platform) => {
    if (!agreeTerms) {
      setErrorMsg(`Please agree to the Terms of Service to continue with ${platform}.`);
      return;
    }
    setErrorMsg('');
    setSuccessMsg(`Connecting securely with ${platform}...`);
    setTimeout(() => {
      navigate('/services');
    }, 800);
  };

  return (
    <div className="vk-auth-page">
      {/* =========================================================================
          TOP HEADER
          ========================================================================= */}
      <header className="vk-auth-header">
        <div className="vk-auth-header-container">
          <a href="#/" className="vk-auth-brand" title="Back to Home">
            <img src={logoImg} alt="VK Fest Hub Logo" className="vk-auth-logo" />
            <div className="vk-auth-brand-text">
              <span className="vk-auth-brand-title">VK Fest Hub</span>
              <span className="vk-auth-brand-tagline">Complete A to Z Services</span>
            </div>
          </a>

          <a href="#/login" className="vk-auth-back-link" title="Back to Login Portal">
            <BsArrowLeft className="vk-back-icon" />
            <span>Back to Login Portal</span>
          </a>
        </div>
      </header>

      {/* =========================================================================
          MAIN AUTH CARD CONTAINER
          Matches User Hand-drawn Sketch:
          Logo -> Name -> Welcome Back -> Google / iPhone / Android ->
          Email or no -> Password -> (or) -> OTP -> Forgot Password / Remember / Agree -> Login Button
          ========================================================================= */}
      <main className="vk-auth-main">
        <div className="vk-auth-card">
          {/* Card Top Brand Info */}
          <div className="vk-auth-card-top">
            <div className="vk-auth-card-brand-row">
              <img src={logoImg} alt="VK Fest Hub Logo" className="vk-auth-card-logo" />
              <div className="vk-auth-card-brand-info">
                <h2 className="vk-auth-card-brand-name">VK Fest Hub</h2>
                <span className="vk-auth-card-tagline">Complete A to Z Services</span>
              </div>
            </div>
            <h1 className="vk-auth-title">Welcome Back</h1>
          </div>

          {/* Feedback Messages */}
          {errorMsg && <div className="vk-auth-alert error">{errorMsg}</div>}
          {successMsg && (
            <div className="vk-auth-alert success">
              <BsCheckCircleFill /> {successMsg}
            </div>
          )}

          {/* Main Credentials Form */}
          <form className="vk-auth-form" onSubmit={handleSubmit}>
            {/* 1. Email or Phone or Username: */}
            <div className="vk-auth-field">
              <label className="vk-auth-label">Email or Phone or Username:</label>
              <div className="vk-auth-input-wrap">
                <BsEnvelopeFill className="vk-auth-input-icon" />
                <input
                  type="text"
                  className="vk-auth-input"
                  placeholder="Email, 10-digit mobile, or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* 2. Password & OTP in 2-Column Row */}
            <div className="vk-auth-grid-row">
              <div className="vk-auth-field">
                <label className="vk-auth-label">Password:</label>
                <div className="vk-auth-input-wrap">
                  <BsLockFill className="vk-auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="vk-auth-input"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="vk-auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
              </div>

              <div className="vk-auth-field">
                <div className="vk-auth-label-row">
                  <label className="vk-auth-label">OTP (or):</label>
                  {otpSent && countdown > 0 && (
                    <span className="vk-auth-resend-countdown">
                      {countdown}s
                    </span>
                  )}
                </div>
                <div className="vk-auth-input-wrap vk-auth-otp-row">
                  <BsShieldLockFill className="vk-auth-input-icon" />
                  <input
                    type="text"
                    maxLength={6}
                    className="vk-auth-input vk-auth-otp-input"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                  <button
                    type="button"
                    className="vk-auth-send-otp-btn"
                    onClick={handleSendOtp}
                    disabled={countdown > 0}
                  >
                    {otpSent ? (countdown > 0 ? 'Sent' : 'Resend') : 'Send OTP'}
                  </button>
                </div>
              </div>
            </div>

            {/* Checkboxes: Forgot Password, Remember Me, Agree */}
            <div className="vk-auth-controls-block">
              <div className="vk-auth-checkbox-group">
                <label className="vk-auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember Me</span>
                </label>

                <label className="vk-auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    Agree to <a href="#terms">Terms</a>
                  </span>
                </label>
              </div>

              <a
                href="#forgot-password"
                className="vk-auth-forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleSendOtp();
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button type="submit" className="vk-auth-submit-btn">
              Login
            </button>
          </form>

          {/* Social Divider */}
          <div className="vk-auth-divider">
            <span>or login with</span>
          </div>

          {/* Social Logins Grid (Google, iPhone) */}
          <div className="vk-auth-social-stack">
            {/* Google Login */}
            <button
              type="button"
              className="vk-social-btn vk-social-google"
              onClick={() => handleSocialLogin('Google')}
              title="Sign in with Google"
            >
              <svg className="vk-social-icon" viewBox="0 0 24 24" width="18" height="18">
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
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* iPhone (Apple) Login */}
            <button
              type="button"
              className="vk-social-btn vk-social-apple"
              onClick={() => handleSocialLogin('iPhone (Apple)')}
              title="Sign in with iPhone / Apple ID"
            >
              <svg className="vk-social-icon" viewBox="0 0 170 170" width="18" height="18" fill="currentColor">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.85-10.4-12.01-21.84-15.48-34.33-3.47-12.49-5.21-23.77-5.21-33.85 0-14.15 3.7-25.79 11.1-34.93 7.4-9.14 16.71-13.82 27.93-14.05 4.8 0 10.37 1.34 16.72 4.02 6.35 2.68 10.22 4.07 11.61 4.17 1.28-.1 5.38-1.57 12.3-4.42 6.92-2.85 12.44-4.14 16.57-3.87 12.98.67 23.36 5.34 31.14 14.02-11.3 6.84-16.8 16.31-16.51 28.41.31 9.4 3.99 17.26 11.05 23.59 7.06 6.33 15.26 10.02 24.6 11.06-2.13 6.5-4.66 12.63-7.59 18.39zM119.22 33.15c0-7.39 2.65-14.3 7.95-20.73 5.3-6.43 11.83-10.58 19.59-12.42.33 2.57.5 4.96.5 7.17 0 7.39-2.82 14.47-8.46 21.24-5.64 6.77-12.37 10.74-20.19 11.91-.44-2.34-.66-4.73-.66-7.17z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Footer Switching Links */}
          <div className="vk-auth-footer-links">
            <p className="vk-auth-register-prompt">
              Don’t have an account?{' '}
              <a href="#/register-user" className="vk-auth-highlight-link">
                Register here
              </a>
            </p>
            <div className="vk-auth-role-switch">
              <span>Are you a Wedding Vendor or Venue?</span>
              <a href="#/login-vendor" className="vk-auth-vendor-portal-link">
                Go to Vendor Login →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login_User;
