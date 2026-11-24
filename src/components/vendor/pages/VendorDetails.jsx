import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Store,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  ArrowUpRight,
  Check
} from "lucide-react";
import { useVendor, Logo } from "../context/VendorContext";
import "./VendorDetails.css";

function VendorDetails() {
  const { vendor, profile, saveProfile, notify } = useVendor();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    city: profile?.city || "Madurai",
    experience: profile?.experience || "5",
    address: profile?.address || "Anna Nagar",
    website: profile?.website || "https://www.artlysoft.com/",
    instagram: profile?.instagram || "@srivari_weddings",
    description: profile?.description || "we are best photographers in our surrounding"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    saveProfile({
      ...details,
      company: profile?.company || vendor?.company || "Sri Vari Wedding Creations",
      owner: profile?.owner || vendor?.owner || "Karthikeyan Natarajan",
      categories: profile?.categories || vendor?.categories || ["Photography & Videography"]
    });

    notify("Business profile saved! Proceeding to subscription plan.");
    navigate("/subscription");
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
          <span className="current">02 Business</span>
          <i />
          <span>03 Plan</span>
          <i />
          <span>04 Activate</span>
        </div>

        <Link to="/register-vendor" className="text-button">
          <ChevronLeft size={16} /> Back
        </Link>
      </header>

      <div className="onboarding-content">
        <span className="eyebrow">STEP 02 OF 04</span>
        <h1>Complete your business profile</h1>
        <p>
          Help couples learn about your experience, style, and past wedding projects.
        </p>

        <div className="onboarding-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <label className="field">
              <span>Primary Operating City</span>
              <div className="input-wrap">
                <MapPin size={17} />
                <input
                  type="text"
                  required
                  placeholder="Madurai"
                  value={details.city}
                  onChange={(e) => setDetails({ ...details, city: e.target.value })}
                />
              </div>
            </label>

            <label className="field">
              <span>Years of Industry Experience</span>
              <div className="input-wrap no-icon">
                <input
                  type="number"
                  min="0"
                  max="60"
                  required
                  placeholder="5"
                  value={details.experience}
                  onChange={(e) => setDetails({ ...details, experience: e.target.value })}
                />
              </div>
            </label>

            <label className="field form-span">
              <span>Business Address / Studio Location</span>
              <div className="input-wrap">
                <MapPin size={17} />
                <input
                  type="text"
                  required
                  placeholder="Anna Nagar"
                  value={details.address}
                  onChange={(e) => setDetails({ ...details, address: e.target.value })}
                />
              </div>
            </label>

            <label className="field">
              <span>Website / Portfolio URL (Optional)</span>
              <div className="input-wrap">
                <ExternalLink size={17} />
                <input
                  type="url"
                  placeholder="https://www.artlysoft.com/"
                  value={details.website}
                  onChange={(e) => setDetails({ ...details, website: e.target.value })}
                />
              </div>
            </label>

            <label className="field">
              <span>Instagram Profile (Optional)</span>
              <div className="input-wrap">
                <Store size={17} />
                <input
                  type="text"
                  placeholder="@srivari_weddings"
                  value={details.instagram}
                  onChange={(e) => setDetails({ ...details, instagram: e.target.value })}
                />
              </div>
            </label>

            <label className="field form-span">
              <span>About Your Business & Services</span>
              <textarea
                rows={4}
                required
                placeholder="we are best photographers in our surrounding"
                value={details.description}
                onChange={(e) => setDetails({ ...details, description: e.target.value })}
              />
              <small>Couples read this when viewing your public listing on VK Fest Hub.</small>
            </label>

            <div className="form-span">
              <div className="onboarding-note">
                <ShieldCheck size={18} />
                <span>
                  Profiles with complete business descriptions and locations receive 3.4x
                  more high-budget wedding enquiries.
                </span>
              </div>
            </div>

            <div className="form-span">
              <button type="submit" className="onboarding-btn-submit">
                Save & choose partner plan <ArrowUpRight size={17} />
              </button>
            </div>
          </form>
        </div>

        <p className="onboarding-footer-note">
          You can update these details anytime from your dashboard settings.
        </p>
      </div>
    </div>
  );
}

export default VendorDetails;
export { VendorDetails };
