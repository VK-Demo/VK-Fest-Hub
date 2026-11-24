import React from 'react';
import '../../style/users/Footer.css';
import logoImg from '../../assets/images/common/Logo.jpeg';
import {
  BsEnvelopeFill,
  BsTelephoneFill,
  BsWhatsapp,
  BsInstagram,
  BsYoutube,
  BsFacebook,
  BsChevronRight,
  BsShieldCheck,
} from 'react-icons/bs';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="vk-footer">
      {/* Main 4-Column Footer */}
      <div className="vk-footer-main">
        <div className="vk-footer-container">
          <div className="vk-footer-grid">
            {/* Column 1: Brand & Contact */}
            <div className="vk-footer-col vk-footer-brand-col">
              <div className="vk-footer-logo-wrap">
                <img src={logoImg} alt="VK Fest Hub Logo" className="vk-footer-logo" />
                <div className="vk-footer-brand-text">
                  <span className="vk-footer-brand-name">VK Fest Hub</span>
                  <span className="vk-footer-brand-tag">Complete A to Z Services</span>
                </div>
              </div>
              <p className="vk-footer-about">
                Connecting brides, grooms, and respected families across communities with 100%
                verified credentials, horoscope matching, and complete privacy.
              </p>
              <div className="vk-footer-contact-info">
                <a href="mailto:vkadmin0211@gmail.com" className="vk-footer-contact-item">
                  <BsEnvelopeFill className="vk-footer-contact-icon" />
                  <span>vkadmin0211@gmail.com</span>
                </a>
                <a href="tel:+916369122716" className="vk-footer-contact-item">
                  <BsTelephoneFill className="vk-footer-contact-icon" />
                  <span>+91 63691 22716 (Toll-Free 9 AM - 9 PM)</span>
                </a>
              </div>
              <div className="vk-footer-social">
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="vk-social-link"
                >
                  <BsWhatsapp />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="vk-social-link"
                >
                  <BsInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="vk-social-link"
                >
                  <BsYoutube />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="vk-social-link"
                >
                  <BsFacebook />
                </a>
              </div>
            </div>

            {/* Column 2: Matrimony Services */}
            <div className="vk-footer-col">
              <h4 className="vk-footer-heading">Matrimony Services</h4>
              <ul className="vk-footer-links">
                <li>
                  <a href="#/matrimony" onClick={scrollToTop}>
                    Register Candidate Profile
                  </a>
                </li>
                <li>
                  <a href="#/matrimony" onClick={scrollToTop}>
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#/matrimony">Horoscope & Porutham Matching</a>
                </li>
                <li>
                  <a href="#/matrimony">Assisted Matchmaking Plans</a>
                </li>
                <li>
                  <a href="#/matrimony">Success Stories</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="vk-footer-col">
              <h4 className="vk-footer-heading">Services</h4>
              <ul className="vk-footer-links">
                <li>
                  <a href="#/services">Marriage Halls</a>
                </li>
                <li>
                  <a href="#/services">Catering Services</a>
                </li>
                <li>
                  <a href="#/services">Photography & Videography</a>
                </li>
                <li>
                  <a href="#/services">Stage Decoration</a>
                </li>
                <li>
                  <a href="#/services" className="vk-footer-highlight-link">
                    View All Services <BsChevronRight className="vk-link-arrow" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Help & Policies */}
            <div className="vk-footer-col">
              <h4 className="vk-footer-heading">Company & Help</h4>
              <ul className="vk-footer-links">
                <li>
                  <a href="#/">About VK Fest Hub</a>
                </li>
                <li>
                  <a href="#/login-vendor" className="vk-footer-vendor-cta">
                    Register as a Vendor
                  </a>
                </li>
                <li>
                  <a href="#/">Privacy & Photo Protection</a>
                </li>
                <li>
                  <a href="#/">Customer Support & FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Trust Strip */}
      <div className="vk-footer-bottom">
        <div className="vk-footer-container vk-footer-bottom-flex">
          <p className="vk-footer-copyright">
            © 2026 VK Fest Hub (Vasudeva Krishnar Fest Hub Services). All rights reserved.
          </p>
          <div className="vk-footer-trust-badges">
            <span className="vk-trust-badge">
              <BsShieldCheck className="vk-trust-icon" /> Trusted Wedding Vendors
            </span>
            <span className="vk-trust-badge">
              <BsShieldCheck className="vk-trust-icon" /> Authentic Matrimony Profiles
            </span>
            <span className="vk-trust-badge">
              <BsShieldCheck className="vk-trust-icon" /> Privacy Guaranteed
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
