import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/common/Login_Preloader.css';
import logoImg from '../../assets/images/common/Logo.jpeg';
import servicesBg from '../../assets/images/common/services_showcase_bg.jpg';
import {
  BsPersonHeart,
  BsShop,
  BsArrowRight,
  BsArrowLeft,
} from 'react-icons/bs';

const Login_Preloader = () => {
  const navigate = useNavigate();

  return (
    <div
      className="vk-login-preloader-page"
      style={{ backgroundImage: `url(${servicesBg})` }}
    >
      {/* Dark & Gold Ambient Overlay */}
      <div className="vk-login-preloader-overlay" />

      {/* Top Header Navigation */}
      <header className="vk-login-preloader-header">
        <a href="#/" className="vk-login-preloader-brand">
          <img src={logoImg} alt="VK Fest Hub Logo" className="vk-login-preloader-logo" />
          <div className="vk-login-preloader-brand-text">
            <span className="vk-login-preloader-brand-title">VK Fest Hub</span>
            <span className="vk-login-preloader-brand-subtitle">Matrimony & Services</span>
          </div>
        </a>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="vk-login-preloader-back-btn"
          aria-label="Back to Home"
        >
          <BsArrowLeft className="vk-login-preloader-back-icon" />
          <span>Back to Home</span>
        </button>
      </header>

      {/* Main Selection Area */}
      <main className="vk-login-preloader-main">
        <div className="vk-login-preloader-container">
          {/* Header Title Section */}
          <div className="vk-login-preloader-intro">
            <h1 className="vk-login-preloader-heading">Choose Your Login Portal</h1>
          </div>

          {/* Dual Selection Cards */}
          <div className="vk-login-preloader-cards">
            {/* Left Card: User Login */}
            <div
              className="vk-login-preloader-card vk-card-user"
              onClick={() => navigate('/login-user')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/login-user')}
            >
              <div className="vk-login-card-badge">Couples & Families</div>
              <div className="vk-login-card-icon-wrap user-icon">
                <BsPersonHeart className="vk-login-card-icon" />
              </div>
              <h2 className="vk-login-card-title">User Login</h2>
              <p className="vk-login-card-desc">
                Find your perfect life partner through verified matrimony profiles and book premier services all in one place.
              </p>
              <button
                type="button"
                className="vk-login-card-btn user-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login-user');
                }}
              >
                <span>Continue as User</span>
                <BsArrowRight className="vk-btn-arrow" />
              </button>
            </div>

            {/* Right Card: Vendor Login */}
            <div
              className="vk-login-preloader-card vk-card-vendor"
              onClick={() => navigate('/login-vendor')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/login-vendor')}
            >
              <div className="vk-login-card-badge vendor-badge">Service Providers & Vendors</div>
              <div className="vk-login-card-icon-wrap vendor-icon">
                <BsShop className="vk-login-card-icon" />
              </div>
              <h2 className="vk-login-card-title">Vendor Login</h2>
              <p className="vk-login-card-desc">
                Grow your wedding business, showcase portfolios, manage client inquiries, and confirm event bookings effortlessly.
              </p>
              <button
                type="button"
                className="vk-login-card-btn vendor-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login-vendor');
                }}
              >
                <span>Continue as Vendor</span>
                <BsArrowRight className="vk-btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login_Preloader;
