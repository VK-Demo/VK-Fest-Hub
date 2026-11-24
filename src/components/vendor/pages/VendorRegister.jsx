import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  UserRound,
  Phone,
  Mail,
  LockKeyhole,
  Tag,
  ShieldCheck,
  Users,
  ArrowUpRight
} from "lucide-react";
import { useVendor, Logo, VendorContext, VendorProvider } from "../context/VendorContext";
import { CATEGORIES } from "../utils/storage";
import "./VendorRegister.css";

function VendorRegisterForm() {
  const { registerVendor, notify, openModal } = useVendor();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    owner: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    confirm: "",
    remember: true,
    terms: true
  });

  const [selectedCategory, setSelectedCategory] = useState("Photography & Videography");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      notify("Password must contain at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      notify("Passwords do not match.");
      return;
    }
    if (!form.terms) {
      notify("Please accept the Terms & Conditions.");
      return;
    }
    if (!selectedCategory) {
      notify("Please select a vendor category.");
      return;
    }

    const newVendor = {
      company: form.company,
      owner: form.owner,
      username: form.username,
      mobile: form.mobile,
      email: form.email,
      categories: [selectedCategory],
      category: selectedCategory,
      password: form.password
    };

    registerVendor(newVendor);
    notify("Account registered! Please complete your business details.");
    // Directly redirect to Business Profile details page as requested
    navigate("/vendor-details");
  };

  return (
    <div className="auth-shell">
      {/* Left visual column */}
      <div className="auth-visual">
        <div className="auth-visual-content">
          <Logo />

          <div className="auth-quote">
            <span className="eyebrow">GROW WITH VK FEST HUB</span>
            <h1>Turn your craft into unforgettable celebrations.</h1>
            <p>
              Connect with couples planning their big day, showcase your finest work,
              and grow your wedding business with Tamil Nadu's leading vendor portal.
            </p>

            <div className="auth-proof">
              <span>
                <ShieldCheck />
                Verified partner network
              </span>
              <span>
                <Users />
                High-intent wedding enquiries
              </span>
            </div>
          </div>

          <small className="visual-foot">
            VK Fest Hub · Designed for wedding professionals across Tamil Nadu.
          </small>
        </div>
      </div>

      {/* Right form column */}
      <div className="auth-main">
        <div className="auth-form-wrap wide">
          <div className="auth-mobile-logo">
            <Logo />
          </div>

          <div className="form-heading">
            <span className="eyebrow">BECOME A PARTNER</span>
            <h2>Create your vendor account</h2>
            <p>Join our curated wedding partner directory in less than 3 minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <label className="field">
              <span>Company Name</span>
              <div className="input-wrap">
                <Building2 size={17} />
                <input
                  type="text"
                  placeholder="e.g. Sri Vari Wedding Creations"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
            </label>

            <label className="field">
              <span>Owner Name</span>
              <div className="input-wrap">
                <UserRound size={17} />
                <input
                  type="text"
                  placeholder="Proprietor / Full Name"
                  required
                  value={form.owner}
                  onChange={(e) => setForm({ ...form, owner: e.target.value })}
                />
              </div>
            </label>

            <label className="field">
              <span>User (Username)</span>
              <div className="input-wrap">
                <UserRound size={17} />
                <input
                  type="text"
                  placeholder="e.g. srivari_weddings"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>
            </label>

            <label className="field">
              <span>Mobile Number</span>
              <div className="input-wrap">
                <Phone size={17} />
                <input
                  type="tel"
                  placeholder="+91 98401 23456"
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </div>
            </label>

            <label className="field form-span">
              <span>Email Address</span>
              <div className="input-wrap">
                <Mail size={17} />
                <input
                  type="email"
                  placeholder="contact@yourbusiness.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </label>

            <label className="field form-span">
              <span>Vendor Category</span>
              <div className="input-wrap">
                <Tag size={17} />
                <select
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "inherit",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    cursor: "pointer",
                    padding: "0 6px"
                  }}
                >
                  <option value="" disabled>-- Select Your Vendor Category --</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <small>Choose your primary wedding service category.</small>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-wrap">
                <LockKeyhole size={17} />
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </label>

            <label className="field">
              <span>Confirm Password</span>
              <div className="input-wrap">
                <LockKeyhole size={17} />
                <input
                  type="password"
                  placeholder="Re-enter password"
                  required
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                />
              </div>
            </label>

            <div className="form-span checks">
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                />
                Remember password on this computer
              </label>

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                />
                I agree to the{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => openModal("terms")}
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => openModal("privacy")}
                >
                  Privacy Policy
                </button>
                .
              </label>
            </div>

            <div className="form-span">
              <button type="submit" className="btn primary">
                Submit Registration <ArrowUpRight size={17} />
              </button>
            </div>
          </form>

          <p className="auth-switch">
            Already registered? <Link to="/login-vendor">Sign in here</Link>
          </p>

          <small className="auth-legal">
            By creating an account, you agree to receive wedding lead alerts & updates from VK Fest Hub.
          </small>
        </div>
      </div>
    </div>
  );
}

function VendorRegister() {
  const context = useContext(VendorContext);
  if (!context) {
    return (
      <VendorProvider>
        <VendorRegisterForm />
      </VendorProvider>
    );
  }
  return <VendorRegisterForm />;
}

export default VendorRegister;
export { VendorRegister };
