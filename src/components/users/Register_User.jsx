import React, { useState } from 'react';
import '../../style/users/Register_User.css';
import logoImg from '../../assets/images/common/Logo.jpeg';
import { registerUser } from '../../services/authStorage';
import {
  BsEye,
  BsEyeSlash,
  BsEnvelopeFill,
  BsLockFill,
  BsShieldLockFill,
  BsPersonFill,
  BsTelephoneFill,
  BsArrowLeft,
  BsCheckCircleFill,
} from 'react-icons/bs';

const Register_User = () => {
  const [formData, setFormData] = useState({
    email: '',
    mobileNo: '',
    username: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Send OTP simulation
  const handleSendOtp = () => {
    if (!formData.mobileNo.trim() && !formData.email.trim()) {
      setErrorMsg('Please enter your Email or Mobile Number first to receive verification OTP.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setSuccessMsg(
      `A 6-digit OTP verification code has been sent to ${formData.mobileNo || formData.email}`
    );
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

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!formData.mobileNo.trim()) {
      setErrorMsg('Please enter your 10-digit mobile number.');
      return;
    }
    if (!formData.username.trim()) {
      setErrorMsg('Please enter your username.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!formData.otp || formData.otp.trim().length < 4) {
      setErrorMsg('Please enter the 6-digit verification OTP.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    const result = registerUser({
      username: formData.username,
      fullName: formData.username,
      email: formData.email,
      mobileNo: formData.mobileNo,
      password: formData.password,
    });

    if (!result.success) {
      setErrorMsg(result.message);
      return;
    }

    setSuccessMsg('Account registered successfully! Redirecting to login...');
    setTimeout(() => {
      window.location.hash = '#/login-user';
    }, 1000);
  };

  return (
    <div className="vk-reg-page">
      {/* =========================================================================
          TOP HEADER
          ========================================================================= */}
      <header className="vk-reg-header">
        <div className="vk-reg-header-container">
          <a href="#/" className="vk-reg-brand" title="Back to Home">
            <img src={logoImg} alt="VK Fest Hub Logo" className="vk-reg-logo" />
            <div className="vk-reg-brand-text">
              <span className="vk-reg-brand-title">VK Fest Hub</span>
              <span className="vk-reg-brand-tagline">Complete A to Z Services</span>
            </div>
          </a>

          <a href="#/login" className="vk-reg-back-link" title="Back to Login Portal">
            <BsArrowLeft className="vk-reg-back-icon" />
            <span>Back to Login Portal</span>
          </a>
        </div>
      </header>

      {/* =========================================================================
          MAIN AUTH CARD CONTAINER
          Matches User Hand-drawn Sketch:
          Logo -> Name -> Register ->
          1. Email
          2. Mobile no.
          3. username
          4. Password
          5. OTP
          Checkboxes: Remember Me, Agree -> Register Button
          ========================================================================= */}
      <main className="vk-reg-main">
        <div className="vk-reg-card">
          {/* Card Top Brand Info */}
          <div className="vk-reg-card-top">
            <div className="vk-reg-card-brand-row">
              <img src={logoImg} alt="VK Fest Hub Logo" className="vk-reg-card-logo" />
              <div className="vk-reg-card-brand-info">
                <h2 className="vk-reg-card-brand-name">VK Fest Hub</h2>
                <span className="vk-reg-card-tagline">Complete A to Z Services</span>
              </div>
            </div>
            <h1 className="vk-reg-title">Register</h1>
          </div>

          {/* Feedback Messages */}
          {errorMsg && <div className="vk-reg-alert error">{errorMsg}</div>}
          {successMsg && (
            <div className="vk-reg-alert success">
              <BsCheckCircleFill /> {successMsg}
            </div>
          )}

          {/* Registration Form in 2-Column Grid */}
          <form className="vk-reg-form" onSubmit={handleSubmit}>
            {/* Row 1: Email & Mobile */}
            <div className="vk-reg-grid-row">
              <div className="vk-reg-field">
                <label className="vk-reg-label">Email:</label>
                <div className="vk-reg-input-wrap">
                  <BsEnvelopeFill className="vk-reg-input-icon" />
                  <input
                    type="email"
                    name="email"
                    className="vk-reg-input"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="vk-reg-field">
                <label className="vk-reg-label">Mobile no:</label>
                <div className="vk-reg-input-wrap">
                  <BsTelephoneFill className="vk-reg-input-icon" />
                  <input
                    type="tel"
                    name="mobileNo"
                    maxLength={10}
                    className="vk-reg-input"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Username & OTP */}
            <div className="vk-reg-grid-row">
              <div className="vk-reg-field">
                <label className="vk-reg-label">Username:</label>
                <div className="vk-reg-input-wrap">
                  <BsPersonFill className="vk-reg-input-icon" />
                  <input
                    type="text"
                    name="username"
                    className="vk-reg-input"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="vk-reg-field">
                <div className="vk-reg-label-row">
                  <label className="vk-reg-label">OTP:</label>
                  {otpSent && countdown > 0 && (
                    <span className="vk-reg-resend-countdown">
                      {countdown}s
                    </span>
                  )}
                </div>
                <div className="vk-reg-input-wrap vk-reg-otp-row">
                  <BsShieldLockFill className="vk-reg-input-icon" />
                  <input
                    type="text"
                    name="otp"
                    maxLength={6}
                    className="vk-reg-input vk-reg-otp-input"
                    placeholder="6-digit OTP"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        otp: e.target.value.replace(/\D/g, ''),
                      }))
                    }
                    required
                  />
                  <button
                    type="button"
                    className="vk-reg-send-otp-btn"
                    onClick={handleSendOtp}
                    disabled={countdown > 0}
                  >
                    {otpSent ? (countdown > 0 ? 'Sent' : 'Resend') : 'Send OTP'}
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Password & Confirm Password */}
            <div className="vk-reg-grid-row">
              <div className="vk-reg-field">
                <label className="vk-reg-label">Password:</label>
                <div className="vk-reg-input-wrap">
                  <BsLockFill className="vk-reg-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="vk-reg-input"
                    placeholder="Password (min 6 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="vk-reg-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
              </div>

              <div className="vk-reg-field">
                <label className="vk-reg-label">Confirm Password:</label>
                <div className="vk-reg-input-wrap">
                  <BsLockFill className="vk-reg-input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="vk-reg-input"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="vk-reg-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Checkboxes: Remember Me & Agree to Terms */}
            <div className="vk-reg-options">
              <label className="vk-reg-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>

              <label className="vk-reg-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>
                  Agree to <a href="#terms">Terms</a> & <a href="#privacy">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button type="submit" className="vk-reg-submit-btn">
              Register
            </button>
          </form>

          {/* Footer Switching Links */}
          <div className="vk-reg-footer-links">
            <p className="vk-reg-login-prompt">
              Already have an account?{' '}
              <a href="#/login-user" className="vk-reg-highlight-link">
                Login here
              </a>
            </p>
            <div className="vk-reg-vendor-note">
              <span>Wedding Vendor or Business Owner?</span>
              <a href="#/register-vendor" className="vk-reg-vendor-link">
                Register as Vendor Partner →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register_User;
