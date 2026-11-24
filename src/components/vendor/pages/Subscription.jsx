import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ArrowUpRight
} from "lucide-react";
import { useVendor, Logo } from "../context/VendorContext";
import { PLANS } from "../utils/storage";
import "./Subscription.css";

function Subscription() {
  const { subscription, selectSubscription } = useVendor();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(subscription?.plan || "Growth");

  const handleContinue = () => {
    selectSubscription(selectedPlan);
    navigate("/payment");
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
          <span className="current">03 Plan</span>
          <i />
          <span>04 Activate</span>
        </div>

        <Link to="/vendor-details" className="text-button">
          <ChevronLeft size={16} /> Back
        </Link>
      </header>

      <div className="onboarding-content">
        <span className="eyebrow">STEP 03 OF 04</span>
        <h1>Choose your partner subscription</h1>
        <p>
          Select a flexible plan designed to grow your wedding enquiries and showcase your craft.
        </p>

        <div className="plans">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            return (
              <div
                key={plan.name}
                className={`plan-card ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedPlan(plan.name)}
                style={{ cursor: "pointer" }}
              >
                {plan.popular && <span className="popular-tag">MOST POPULAR</span>}

                <span className="plan-check">
                  {isSelected ? (
                    <CheckCircle2 size={20} color="#a54222" />
                  ) : (
                    <span />
                  )}
                </span>

                <b>{plan.name}</b>
                <p>{plan.desc}</p>

                <strong>
                  {plan.price}
                  <small> / month</small>
                </strong>

                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="payment-next">
          <div>
            <span className="eyebrow">SELECTED PARTNER PLAN</span>
            <b>
              {selectedPlan} Plan · {PLANS.find((p) => p.name === selectedPlan)?.price || "₹XXXX"} / month
            </b>
          </div>

          <button onClick={handleContinue} className="btn primary">
            Continue to activation <ArrowUpRight size={17} />
          </button>
        </div>

        <small className="auth-legal">
          Transparent pricing · Cancel or upgrade your plan anytime from the dashboard.
        </small>
      </div>
    </div>
  );
}

export default Subscription;
export { Subscription };
