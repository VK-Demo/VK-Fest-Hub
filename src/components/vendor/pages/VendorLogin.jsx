import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  LockKeyhole,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import { useVendor, Logo, VendorContext, VendorProvider } from "../context/VendorContext";
import "./VendorLogin.css";

function VendorLoginForm() {
  const { vendor, loginVendor, notify } = useVendor();
  const navigate = useNavigate();

  const [username, setUsername] = useState(vendor?.username || "srivari_weddings");
  const [password, setPassword] = useState("vendor123");
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = loginVendor(username, password);
    if (res.success) {
      // Directly redirect to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-shell">
      {/* Left visual column */}
      <div className="auth-visual">
        <div className="auth-visual-content">
          <Logo />

          <div className="auth-quote">
            <span className="eyebrow">YOUR BUSINESS, IN FULL BLOOM</span>
            <h1>Every great celebration starts with a great partner.</h1>
            <p>
              Sign in to manage your bookings, respond to eager couples, update your
              packages, and maintain your stellar wedding reputation.
            </p>
          </div>

          <small className="visual-foot">
            VK Fest Hub · Vendor Partner Portal
          </small>
        </div>
      </div>

      {/* Right login column */}
      <div className="auth-main">
        <div className="auth-form-wrap">
          <div className="auth-mobile-logo">
            <Logo />
          </div>

          <div className="login-icon">
            <LockKeyhole size={24} />
          </div>

          <div className="form-heading">
            <span className="eyebrow">WELCOME BACK</span>
            <h2>Vendor sign in</h2>
            <p>Enter your username and password to proceed to your business details.</p>
          </div>

          <form onSubmit={handleSubmit} className="stack-form">
            <label className="field">
              <span>Username</span>
              <div className="input-wrap">
                <UserRound size={17} />
                <input
                  type="text"
                  placeholder="Enter your username or email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-wrap">
                <LockKeyhole size={17} />
                <input
                  type="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>

            <div className="form-between">
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember password
              </label>

              <button
                type="button"
                className="text-button"
                onClick={() =>
                  notify("Password reset instructions dispatched to your registered email.")
                }
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn primary">
              Sign In to Vendor Portal <ArrowUpRight size={17} />
            </button>
          </form>

          <p className="auth-switch">
            New to VK Fest Hub? <Link to="/register-vendor">Create an account</Link>
          </p>

          <div className="demo-hint">
            <ShieldCheck size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
            {vendor ? (
              <span>
                Demo credentials preloaded: <b>{vendor.username}</b>
              </span>
            ) : (
              <span>Demo credentials: username <b>srivari_weddings</b>, password <b>vendor123</b></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorLogin() {
  const context = useContext(VendorContext);
  if (!context) {
    return (
      <VendorProvider>
        <VendorLoginForm />
      </VendorProvider>
    );
  }
  return <VendorLoginForm />;
}

export default VendorLogin;
export { VendorLogin };
