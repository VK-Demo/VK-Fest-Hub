import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/users/Navbar.css';
import logoImg from '../../assets/images/common/Logo.jpeg';
import {
  BsPersonHeart,
  BsShop,
  BsImages,
  BsCalendarCheck,
  BsChatDots,
  BsBell,
  BsPersonCircle,
  BsPersonGear,
  BsGear,
  BsChevronDown,
} from 'react-icons/bs';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { logoutSession, getCurrentSession } from '../../services/authStorage';

const navItems = [
  { id: 'services', label: 'Services', href: '#/services', icon: <BsShop /> },
  { id: 'matrimony', label: 'Matrimony', href: '#/matrimony', icon: <BsPersonHeart /> },
  { id: 'media', label: 'Photos & Videos', href: '#/media', icon: <BsImages /> },
  { id: 'booking', label: 'Booking', href: '#/booking', icon: <BsCalendarCheck /> },
  { id: 'chats', label: 'Chats', href: '#/chats', icon: <BsChatDots /> },
];

const Navbar = ({ activeNav: initialActiveNav }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinksToRender = navItems;

  // Auto-detect active nav from hash if not explicitly provided
  const detectActiveNav = () => {
    if (initialActiveNav) return initialActiveNav;
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('matrimony')) return 'matrimony';
    if (hash.includes('media')) return 'media';
    if (hash.includes('booking')) return 'booking';
    if (hash.includes('chats')) return 'chats';
    if (hash.includes('services')) return 'services';
    return 'services';
  };

  const [activeNav, setActiveNav] = useState(detectActiveNav);

  useEffect(() => {
    setActiveNav(detectActiveNav());
  }, [initialActiveNav]);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const currentSession = getCurrentSession();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleEditProfile = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    const regSection = document.getElementById('registration-section');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/matrimony');
      setTimeout(() => {
        const el = document.getElementById('registration-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSettings = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/settings');
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    logoutSession();
    navigate('/');
  };

  return (
    <header className={`vk-user-navbar ${isScrolled ? 'vk-navbar-scrolled' : ''}`}>
      <div className="vk-user-nav-container">
        {/* Brand Logo & Title */}
        <a href="#/" className="vk-user-brand" title="VK Fest Hub - Back to Home">
          <img src={logoImg} alt="VK Fest Hub Logo" className="vk-user-brand-logo" />
          <div className="vk-user-brand-text">
            <span className="vk-user-brand-title">VK Fest Hub</span>
            <span className="vk-user-brand-tagline">Complete A to Z Services</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="vk-user-nav-links" aria-label="User Navigation">
          {navLinksToRender.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`vk-user-nav-link ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Utilities & CTA Actions */}
        <div className="vk-user-nav-actions">
          {/* Notification Bell Icon */}
          <a
            href="#/notifications"
            className="vk-user-icon-btn"
            title="Notifications"
            aria-label="View notifications"
          >
            <BsBell />
            <span className="vk-user-badge-dot" />
          </a>

          {/* Profile Dropdown Menu */}
          <div className="vk-user-profile-dropdown-wrap" ref={profileDropdownRef}>
            <button
              type="button"
              className={`vk-user-profile-btn ${isProfileDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              title={currentSession?.fullName || currentSession?.username || 'Profile & Settings'}
              aria-label="User Profile Menu"
              aria-expanded={isProfileDropdownOpen}
              aria-haspopup="true"
            >
              <BsPersonCircle className="vk-user-profile-icon" />
            </button>

            {isProfileDropdownOpen && (
              <div className="vk-user-profile-menu" role="menu">
                {currentSession && (
                  <>
                    <div className="vk-user-profile-header">
                      <span className="vk-user-profile-name">
                        {currentSession.fullName || currentSession.username || 'User Profile'}
                      </span>
                      <span className="vk-user-profile-sub">
                        {currentSession.email || 'Member Account'}
                      </span>
                    </div>
                    <div className="vk-user-profile-divider" />
                  </>
                )}

                <button
                  type="button"
                  className="vk-user-profile-item"
                  onClick={handleEditProfile}
                  role="menuitem"
                >
                  <BsPersonGear className="vk-profile-item-icon" />
                  <span>Edit Profile</span>
                </button>

                <button
                  type="button"
                  className="vk-user-profile-item"
                  onClick={handleSettings}
                  role="menuitem"
                >
                  <BsGear className="vk-profile-item-icon" />
                  <span>Settings</span>
                </button>

                <div className="vk-user-profile-divider" />

                <button
                  type="button"
                  className="vk-user-profile-item logout"
                  onClick={handleLogout}
                  role="menuitem"
                >
                  <FiLogOut className="vk-profile-item-icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="vk-user-mobile-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="vk-user-mobile-drawer">
            {navLinksToRender.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={activeNav === item.id ? 'active' : ''}
                onClick={() => {
                  setActiveNav(item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
