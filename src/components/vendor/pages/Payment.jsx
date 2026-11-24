import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IndianRupee,
  CreditCard,
  ShieldCheck,
  Building2,
  Wallet,
  CheckCircle2,
  Check,
  LockKeyhole,
  ChevronLeft,
  UserRound
} from "lucide-react";
import { useVendor, Logo } from "../context/VendorContext";
import { PLANS, getInitials } from "../utils/storage";
import "./Payment.css";

const PAYMENT_METHODS = [
  { id: "UPI", label: "UPI (Google Pay, PhonePe, Paytm, BHIM)", icon: IndianRupee },
  { id: "Card", label: "Credit / Debit Card (Visa, MasterCard, RuPay)", icon: CreditCard },
  { id: "Razorpay", label: "Razorpay (Cards, UPI, NetBanking, Wallets)", icon: ShieldCheck },
  { id: "NetBanking", label: "Net Banking (SBI, HDFC, ICICI, Axis)", icon: Building2 },
  { id: "PayPal", label: "PayPal / International Card", icon: Wallet }
];

const UPI_APPS = ["Google Pay", "PhonePe", "Paytm", "BHIM UPI", "Other UPI ID", "Scan QR Code"];

const POPULAR_BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank"];

function Payment() {
  const { subscription, vendor, profile, processPayment, notify } = useVendor();
  const navigate = useNavigate();

  const [method, setMethod] = useState("UPI");
  const [upiApp, setUpiApp] = useState("Google Pay");
  const [customUpiId, setCustomUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [isProcessing, setIsProcessing] = useState(false);

  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8910");
  const [cardHolder, setCardHolder] = useState("Karthikeyan Natarajan");
  const [cardExpiry, setCardExpiry] = useState("12 / 28");
  const [cardCvv, setCardCvv] = useState("•••");

  const currentPlan = subscription?.plan || "Growth";
  const matchedPlan = PLANS.find((p) => p.name === currentPlan) || PLANS[1];
  const planPriceNumber = matchedPlan.rawPrice || "XXXX";
  const planPriceDisplay = "₹XXXX";
  const totalAmount = "₹XXXX";

  const businessName = profile?.company || vendor?.company || "Sri Vari Wedding Creations";
  const initials = getInitials(businessName);

  const handleVerifyUpi = () => {
    if (!customUpiId.includes("@")) {
      notify("Please enter a valid UPI ID (e.g. yourname@okaxis)");
      return;
    }
    setUpiVerified(true);
    notify("UPI ID verified successfully: " + customUpiId);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processPayment({
        method,
        app: method === "UPI" ? upiApp : method === "Razorpay" ? "Razorpay Gateway" : method,
        plan: currentPlan,
        amount: "₹XXXX"
      });
      setIsProcessing(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="onboarding-shell">
      <header className="onboarding-header">
        <Logo />

        <div className="steps">
          <span className="done">
            <Check size={14} /> Account
          </span>
          <i />
          <span className="done">
            <Check size={14} /> Business
          </span>
          <i />
          <span className="done">
            <Check size={14} /> Plan
          </span>
          <i />
          <span className="current">04 Activate</span>
        </div>

        <Link to="/subscription" className="text-button">
          <ChevronLeft size={16} /> Back
        </Link>
      </header>

      <div className="onboarding-content">
        <span className="eyebrow">STEP 04 OF 04</span>
        <h1>Complete your partner subscription</h1>
        <p>
          Activate your vendor storefront and start receiving verified wedding enquiries.
        </p>

        <div className="checkout-grid">
          {/* Payment Methods Selection */}
          <div className="checkout-methods">
            <h3>Select Payment Method</h3>

            {PAYMENT_METHODS.map((m) => {
              const Icon = m.icon;
              const isChosen = method === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`method-row ${isChosen ? "chosen" : ""}`}
                >
                  <span className="method-icon">
                    <Icon size={18} />
                  </span>
                  <b>{m.label}</b>
                  {isChosen && <CheckCircle2 className="method-check" size={18} />}
                </button>
              );
            })}

            {/* UPI Option */}
            {method === "UPI" && (
              <div style={{ marginTop: 16, background: "#fbf9f7", padding: 16, borderRadius: 10, border: "1px solid var(--line)" }}>
                <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>
                  Choose UPI App / Method
                </span>
                <div className="upi-options" style={{ marginBottom: 12 }}>
                  {UPI_APPS.map((app) => (
                    <button
                      key={app}
                      type="button"
                      className={upiApp === app ? "active" : ""}
                      onClick={() => setUpiApp(app)}
                    >
                      {app}
                    </button>
                  ))}
                </div>

                {upiApp === "Other UPI ID" && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <div className="input-wrap" style={{ flex: 1 }}>
                        <IndianRupee size={16} />
                        <input
                          type="text"
                          placeholder="e.g. mobile@paytm or name@okhdfcbank"
                          value={customUpiId}
                          onChange={(e) => {
                            setCustomUpiId(e.target.value);
                            setUpiVerified(false);
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyUpi}
                        className="btn outline"
                        style={{ padding: "0 14px", height: 42 }}
                      >
                        {upiVerified ? <Check size={16} color="var(--green)" /> : "Verify"}
                      </button>
                    </div>
                    {upiVerified && (
                      <small style={{ color: "var(--green)", display: "block", marginTop: 4, fontWeight: 600 }}>
                        ✓ UPI ID Verified for payment
                      </small>
                    )}
                  </div>
                )}

                {upiApp === "Scan QR Code" && (
                  <div style={{ textAlign: "center", padding: "16px 0" }}>
                    <div style={{ display: "inline-block", background: "#ffffff", padding: 12, borderRadius: 12, border: "2px dashed var(--brand)" }}>
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=vkadmin@okhdfcbank&pn=VKFestHub&cu=INR"
                        alt="Scan UPI QR Code"
                        style={{ width: 140, height: 140, display: "block" }}
                      />
                    </div>
                    <small style={{ display: "block", marginTop: 8, color: "var(--muted)", fontWeight: 600 }}>
                      Scan using Google Pay, PhonePe, Paytm or BHIM to pay ₹XXXX
                    </small>
                  </div>
                )}

                {upiApp !== "Other UPI ID" && upiApp !== "Scan QR Code" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "#ffffff", borderRadius: 8, marginTop: 8 }}>
                    <CheckCircle2 size={16} color="var(--brand)" />
                    <span style={{ fontSize: 12, color: "var(--ink)" }}>
                      Pay ₹XXXX seamlessly via <b>{upiApp}</b>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Card Option */}
            {method === "Card" && (
              <div className="stack-form" style={{ marginTop: 16, background: "#fbf9f7", padding: 16, borderRadius: 10, border: "1px solid var(--line)" }}>
                <label className="field">
                  <span>Card Number</span>
                  <div className="input-wrap">
                    <CreditCard size={17} />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                </label>

                <label className="field">
                  <span>Cardholder Name</span>
                  <div className="input-wrap">
                    <UserRound size={17} />
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>
                </label>

                <div className="form-grid">
                  <label className="field">
                    <span>Valid Thru</span>
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>CVV</span>
                    <div className="input-wrap">
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </label>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 10, background: "#e5e7eb", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>VISA</span>
                  <span style={{ fontSize: 10, background: "#e5e7eb", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>MasterCard</span>
                  <span style={{ fontSize: 10, background: "#e5e7eb", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>RuPay</span>
                </div>
              </div>
            )}

            {/* Razorpay Option */}
            {method === "Razorpay" && (
              <div style={{ marginTop: 16, background: "#f0f7ff", padding: 18, borderRadius: 10, border: "1px solid #bfdbfe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <ShieldCheck size={22} color="#0284c7" />
                  <div>
                    <b style={{ color: "#0369a1", fontSize: 14 }}>Razorpay Secure Gateway</b>
                    <small style={{ display: "block", color: "#0284c7" }}>India's leading payment infrastructure</small>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.5, margin: "8px 0 12px" }}>
                  One-click instant payment. Razorpay supports all Credit/Debit cards, 58+ Indian Banks NetBanking, UPI (Google Pay, Paytm, PhonePe), Wallets, and EMI.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 11, color: "#0284c7", fontWeight: 600 }}>
                  <span>✓ 100% RBI Compliant</span>
                  <span>✓ Instant Activation</span>
                  <span>✓ 256-Bit SSL</span>
                </div>
              </div>
            )}

            {/* NetBanking Option */}
            {method === "NetBanking" && (
              <div style={{ marginTop: 16, background: "#fbf9f7", padding: 16, borderRadius: 10, border: "1px solid var(--line)" }}>
                <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>
                  Select Your Bank
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  {POPULAR_BANKS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBank(b)}
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        border: selectedBank === b ? "2px solid var(--brand)" : "1px solid var(--line)",
                        background: selectedBank === b ? "#fffaf7" : "#ffffff",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <small style={{ color: "var(--muted)", fontSize: 11 }}>
                  All 50+ major Indian banks supported via secure payment gateway.
                </small>
              </div>
            )}

            {/* PayPal Option */}
            {method === "PayPal" && (
              <div style={{ marginTop: 16, background: "#fffbeb", padding: 16, borderRadius: 10, border: "1px solid #fef3c7" }}>
                <b style={{ color: "#b45309", fontSize: 13, display: "block", marginBottom: 4 }}>
                  PayPal Express Checkout & International Cards
                </b>
                <p style={{ fontSize: 12, color: "#78350f", margin: 0, lineHeight: 1.4 }}>
                  Recommended for NRI vendors and couples overseas. Supports multi-currency conversion and international debit/credit cards.
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <aside className="order-summary">
            <h3>Order Summary</h3>

            <div className="summary-vendor">
              <div className="avatar">{initials}</div>
              <div>
                <b>{businessName}</b>
                <small>VK Fest Hub Vendor Partner</small>
              </div>
            </div>

            <div className="summary-line">
              <span>{currentPlan} Plan Subscription</span>
              <b>₹XXXX</b>
            </div>

            <div className="summary-line">
              <span>Billing Cycle</span>
              <b>Monthly (Cancel anytime)</b>
            </div>

            <div className="summary-line">
              <span>Platform Setup Fee</span>
              <b style={{ color: "var(--green)" }}>FREE</b>
            </div>

            <div className="summary-total">
              <span>Total Due Today</span>
              <strong>₹XXXX</strong>
            </div>

            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="btn primary"
              style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: 16 }}
            >
              <LockKeyhole size={16} />
              {isProcessing ? "Processing Secure Payment..." : `Activate My Partner Portal`}
            </button>

            <small className="secure-note" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, color: "var(--muted)" }}>
              <ShieldCheck size={14} /> 256-bit SSL encrypted · Demo simulation mode
            </small>
          </aside>
        </div>

        <small className="auth-legal">
          Note: This is a demonstration sandbox. No actual credit card or bank funds are debited.
        </small>
      </div>
    </div>
  );
}

export default Payment;
export { Payment, PAYMENT_METHODS, UPI_APPS, POPULAR_BANKS };
