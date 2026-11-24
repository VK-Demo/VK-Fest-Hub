import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../style/users/Matrimony.css';
import logoImg from '../../assets/images/common/Logo.jpeg';
import heroBg from '../../assets/images/users/carousel 3.jpeg';
import brideAvatar from '../../assets/images/users/bride_avatar_indian.jpg';
import groomAvatar from '../../assets/images/users/groom_avatar_indian.jpg';
import {
  BsBell,
  BsChatDots,
  BsCalendarCheck,
  BsArrowRight,
  BsArrowLeft,
  BsStars,
  BsPersonBadge,
  BsSearchHeart,
  BsChatHeart,
  BsCloudUpload,
  BsCheckCircleFill,
  BsFileEarmarkPdf,
  BsTrash,
  BsCameraFill,
  BsShieldCheck,
  BsTelephoneFill,
  BsEnvelopeFill,
  BsWhatsapp,
  BsInstagram,
  BsYoutube,
  BsFacebook,
  BsChevronRight,
  BsPersonHeart,
  BsShop,
  BsImages,
} from 'react-icons/bs';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

const Matrimony = () => {
  const navigate = useNavigate();

  // Registration Multi-Step State
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState([1]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regId, setRegId] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Account & Profile
    lookingFor: 'Bride',
    accountCreatedFor: 'Myself',
    photos: [],
    aboutCandidate: '',
    partnerExpectations: '',

    // Step 2: Basic & Personal Details
    fullName: '',
    gender: 'Male',
    maritalStatus: 'Never Married',
    dob: '',
    age: '',
    height: '',
    weight: '',
    motherTongue: '',

    // Step 3: Religious & Astrological Details
    religion: '',
    community: '',
    caste: '',
    gothram: '',
    rasi: '',
    star: '',
    dosham: '',
    doshamType: '',
    doshamCustom: '',
    birthTime: '',
    birthPlace: '',
    horoscopeFile: null,

    // Step 4: Education & Career
    highestQualification: '',
    educationStream: '',
    occupation: '',
    companyName: '',
    annualIncome: '',
    workLocation: '',

    // Step 5: Family Details
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: '',
    familyType: 'Nuclear Family',
    nativePlace: '',

    // Step 6: Lifestyle & Habits
    eatingHabits: '',
    smokingHabits: '',
    drinkingHabits: '',

    // Step 7: Contact & Residential Details
    mobileNumber: '',
    secondaryContact: '',
    email: '',
    residentialAddress: '',
    city: '',
    state: 'Tamil Nadu',
    country: 'India',
    pincode: '',
  });

  const stepsList = [
    { num: 1, label: 'Profile Setup' },
    { num: 2, label: 'Personal' },
    { num: 3, label: 'Religion & Astro' },
    { num: 4, label: 'Education & Career' },
    { num: 5, label: 'Family' },
    { num: 6, label: 'Lifestyle' },
    { num: 7, label: 'Contact' },
  ];

  // Generic Field Change Handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Auto Age Calculation from DOB
  const handleDobChange = (e) => {
    const val = e.target.value;
    let calculatedAge = '';
    if (val) {
      const birthDate = new Date(val);
      const diff = Date.now() - birthDate.getTime();
      const ageDate = new Date(diff);
      calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    setFormData((prev) => ({ ...prev, dob: val, age: calculatedAge || '' }));
  };

  // Photo Upload Handler (Up to 5 images)
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const remainingSlots = 5 - formData.photos.length;
    if (remainingSlots <= 0) {
      alert('You can upload up to 5 photos.');
      return;
    }
    const validFiles = files.slice(0, remainingSlots);
    const newPhotos = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
    }));
  };

  const handleRemovePhoto = (index) => {
    setFormData((prev) => {
      const updated = [...prev.photos];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return { ...prev, photos: updated };
    });
  };

  // Horoscope File Upload Handler
  const handleHoroscopeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        horoscopeFile: {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
        },
      }));
    }
  };

  // Check if a step has actual data filled in
  const isStepFilled = (stepNum) => {
    switch (stepNum) {
      case 1:
        // Photos uploaded or About Candidate or Partner Expectations filled
        return (
          (formData.photos && formData.photos.length > 0) ||
          formData.aboutCandidate.trim().length > 0 ||
          formData.partnerExpectations.trim().length > 0
        );
      case 2:
        // Legal name and date of birth
        return formData.fullName.trim().length > 0 && formData.dob !== '';
      case 3:
        // Religion or Dosham or at least one astro/cultural detail
        return (
          formData.religion.trim().length > 0 ||
          formData.dosham !== '' ||
          formData.caste.trim().length > 0 ||
          formData.star.trim().length > 0 ||
          formData.rasi.trim().length > 0 ||
          formData.gothram.trim().length > 0 ||
          formData.birthPlace.trim().length > 0 ||
          formData.horoscopeFile !== null
        );
      case 4:
        // Highest qualification entered
        return formData.highestQualification.trim().length > 0;
      case 5:
        // Family background
        return (
          formData.fatherName.trim().length > 0 ||
          formData.motherName.trim().length > 0 ||
          formData.nativePlace.trim().length > 0 ||
          formData.siblings.trim().length > 0
        );
      case 6:
        // Lifestyle habits specified
        return formData.eatingHabits !== '';
      case 7:
        // Mobile number and email
        return formData.mobileNumber.trim().length > 0 && formData.email.trim().length > 0;
      default:
        return false;
    }
  };

  // Step Navigation
  const goToStep = (stepNum) => {
    setVisitedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
    setCurrentStep(stepNum);
    setVisitedSteps((prev) => (prev.includes(stepNum) ? prev : [...prev, stepNum]));
    const section = document.getElementById('registration-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const nextStep = () => {
    if (currentStep < 7) {
      const next = currentStep + 1;
      setVisitedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
      setCurrentStep(next);
      setVisitedSteps((prev) => (prev.includes(next) ? prev : [...prev, next]));
      const section = document.getElementById('registration-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prevStepNum = currentStep - 1;
      setVisitedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
      setCurrentStep(prevStepNum);
      const section = document.getElementById('registration-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form Submission
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    const generatedId = 'VK-' + Math.floor(10000 + Math.random() * 90000);
    setRegId(generatedId);
    setIsSubmitted(true);
  };

  // Smooth in-page section scrolling (prevents HashRouter hash override)
  const scrollToSection = (sectionId, e) => {
    if (e) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="vk-matrimony-page">
      {/* =========================================================================
          SECTION 1: NAVBAR
          ========================================================================= */}
      <Navbar activeNav="matrimony" />

      {/* =========================================================================
          SECTION 2: HERO SECTION
          Grand celebratory visual, refined gold/wine gradient, universal copy
          ========================================================================= */}
      <section
        className="vk-mat-hero"
        style={{ backgroundImage: `url("${heroBg}")` }}
      >
        <div className="vk-mat-hero-overlay" />
        <div className="vk-mat-hero-container">
          <div className="vk-mat-hero-content">
            {/* Trust Pill / Badge */}
            <div className="vk-mat-hero-badge">
              <BsStars style={{ color: '#dfb76c' }} />
              <span>VK Fest Hub Matrimony</span>
            </div>

            {/* Main Headline */}
            <h1 className="vk-mat-hero-title">
              Where Sacred Traditions Meet Meaningful Connections
            </h1>

            {/* Subtitle - Universal, no regional mentions */}
            <p className="vk-mat-hero-subtitle">
              Discover 100% verified brides and grooms with horoscope matching,
              verified family backgrounds, and shared values.
            </p>

            {/* Call to Actions */}
            <div className="vk-mat-hero-actions">
              <a
                href="#registration-section"
                className="vk-mat-btn-hero-primary"
                onClick={(e) => scrollToSection('registration-section', e)}
              >
                <span>Register Your Profile</span>
                <BsArrowRight />
              </a>
              <a
                href="#how-it-works"
                className="vk-mat-btn-hero-secondary"
                onClick={(e) => scrollToSection('how-it-works', e)}
              >
                <span>How It Works</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW VK MATRIMONY WORKS (OPTION A - 3 STEPS)
          ========================================================================= */}
      <section id="how-it-works" className="vk-mat-how-it-works">
        <div className="vk-mat-section-container">
          <div className="vk-mat-section-header">
            <h2 className="vk-mat-section-title">How VK Matrimony Works</h2>
            <p className="vk-mat-section-desc">
              Finding your life partner is a sacred, joyful journey. We make every step secure,
              respectful, and effortless for both candidates and families.
            </p>
          </div>

          <div className="vk-mat-steps-grid">
            {/* Step 1 */}
            <div className="vk-mat-step-card">
              <div className="vk-mat-step-top">
                <div className="vk-mat-step-icon-wrap">
                  <BsPersonBadge />
                </div>
                <span className="vk-mat-step-num">01</span>
              </div>
              <h3 className="vk-mat-step-title">Create Your Profile</h3>
              <p className="vk-mat-step-desc">
                Share candidate biodata, religious details, horoscope, education, and lifestyle
                preferences through our step-by-step guided registration.
              </p>
              <div className="vk-mat-step-pill">✦ Quick & Guided Setup</div>
            </div>

            {/* Step 2 */}
            <div className="vk-mat-step-card">
              <div className="vk-mat-step-top">
                <div className="vk-mat-step-icon-wrap">
                  <BsSearchHeart />
                </div>
                <span className="vk-mat-step-num">02</span>
              </div>
              <h3 className="vk-mat-step-title">Discover Matches</h3>
              <p className="vk-mat-step-desc">
                Browse 100% verified bride and groom profiles aligned with your community,
                profession, horoscope compatibility, and family values.
              </p>
              <div className="vk-mat-step-pill">✦ 100% Verified Profiles</div>
            </div>

            {/* Step 3 */}
            <div className="vk-mat-step-card">
              <div className="vk-mat-step-top">
                <div className="vk-mat-step-icon-wrap">
                  <BsChatHeart />
                </div>
                <span className="vk-mat-step-num">03</span>
              </div>
              <h3 className="vk-mat-step-title">Connect With Families</h3>
              <p className="vk-mat-step-desc">
                Express interest, exchange horoscopes securely, and initiate meaningful conversations
                with complete privacy and dedicated family coordination support.
              </p>
              <div className="vk-mat-step-pill">✦ Privacy & Safe Connect</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MULTI-STEP PROFILE REGISTRATION FORM
          7 Guided Steps covering all required profile fields
          ========================================================================= */}
      <section id="registration-section" className="vk-mat-reg-section">
        <div className="vk-mat-section-container">
          <div className="vk-mat-section-header">
            <h2 className="vk-mat-section-title">Register Candidate Profile</h2>
            <p className="vk-mat-section-desc">
              Complete your profile in 7 simple steps to begin connecting with verified matches.
            </p>
          </div>

          <div className="vk-mat-reg-card">
            {/* Stepper Header with Progress Pills */}
            <div className="vk-mat-stepper-header">
              <div className="vk-mat-stepper-title-row">
                <h3 className="vk-mat-stepper-main-title">
                  {stepsList[currentStep - 1].label}
                </h3>
                <span className="vk-mat-stepper-counter">
                  Step {currentStep} of 7
                </span>
              </div>

              {/* Step Navigation Bar */}
              <div className="vk-mat-stepper-nav">
                {stepsList.map((step) => (
                  <button
                    key={step.num}
                    type="button"
                    className={`vk-mat-step-tab ${currentStep === step.num ? 'active' : ''}`}
                    onClick={() => goToStep(step.num)}
                  >
                    <span>{step.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content Area */}
            <form className="vk-mat-form-body" onSubmit={handleSubmitProfile}>
              {/* -------------------------------------------------------------
                  STEP 1: ACCOUNT & PROFILE SETUP
                  ------------------------------------------------------------- */}
              {currentStep === 1 && (
                <div className="vk-mat-step-panel">
                  <div className="vk-mat-step-panel-header">
                    <h4 className="vk-mat-step-panel-title">Account & Profile Setup</h4>
                    <p className="vk-mat-step-panel-subtitle">
                      Set up candidate ownership and upload recent photographs.
                    </p>
                  </div>

                  <div className="vk-mat-form-grid">
                    {/* Looking For: Groom or Bride */}
                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">
                        Looking For <span className="vk-mat-required">*</span>
                      </label>
                      <div className="vk-mat-looking-options" role="radiogroup" aria-label="Looking For">
                        {/* Option 1: Groom */}
                        <label className={`vk-mat-looking-card ${formData.lookingFor === 'Groom' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="lookingFor"
                            value="Groom"
                            checked={formData.lookingFor === 'Groom'}
                            onChange={() => handleChange('lookingFor', 'Groom')}
                            className="vk-mat-radio-input"
                          />
                          <div className="vk-mat-looking-avatar-wrap">
                            <img src={groomAvatar} alt="Groom" className="vk-mat-looking-avatar" />
                          </div>
                          <span className="vk-mat-looking-label">Groom</span>
                        </label>

                        {/* Option 2: Bride */}
                        <label className={`vk-mat-looking-card ${formData.lookingFor === 'Bride' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="lookingFor"
                            value="Bride"
                            checked={formData.lookingFor === 'Bride'}
                            onChange={() => handleChange('lookingFor', 'Bride')}
                            className="vk-mat-radio-input"
                          />
                          <div className="vk-mat-looking-avatar-wrap">
                            <img src={brideAvatar} alt="Bride" className="vk-mat-looking-avatar" />
                          </div>
                          <span className="vk-mat-looking-label">Bride</span>
                        </label>
                      </div>
                    </div>

                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">
                        Account Created For <span className="vk-mat-required">*</span>
                      </label>
                      <select
                        className="vk-mat-select"
                        value={formData.accountCreatedFor}
                        onChange={(e) => handleChange('accountCreatedFor', e.target.value)}
                        required
                      >
                        <option value="Myself">Myself</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Relative/Friend">Relative / Friend</option>
                      </select>
                    </div>

                    {/* Photo Uploader */}
                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">
                        Candidate Photographs (Upload up to 5 images)
                      </label>
                      <label className="vk-mat-upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoUpload}
                          style={{ display: 'none' }}
                          disabled={formData.photos.length >= 5}
                        />
                        <BsCloudUpload className="vk-mat-upload-icon" />
                        <div className="vk-mat-upload-text">
                          {formData.photos.length >= 5
                            ? 'Maximum 5 photos selected'
                            : 'Click or Drag photos here to upload'}
                        </div>
                        <div className="vk-mat-upload-subtext">
                          Supports JPG, PNG (Max 5MB each). {formData.photos.length}/5 uploaded.
                        </div>
                      </label>

                      {/* Photo Previews */}
                      {formData.photos.length > 0 && (
                        <div className="vk-mat-photo-grid">
                          {formData.photos.map((item, idx) => (
                            <div key={idx} className="vk-mat-photo-item">
                              <img
                                src={item.url}
                                alt={`Candidate photo ${idx + 1}`}
                                className="vk-mat-photo-img"
                              />
                              <button
                                type="button"
                                className="vk-mat-photo-remove"
                                onClick={() => handleRemovePhoto(idx)}
                                title="Remove photo"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Profile Description */}
                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">About Bride/Groom</label>
                      <textarea
                        className="vk-mat-textarea"
                        placeholder="Tell 2 to 3 lines about Bride/Groom"
                        value={formData.aboutCandidate}
                        onChange={(e) => handleChange('aboutCandidate', e.target.value)}
                      />
                      <span className="vk-mat-hint">
                        Profiles with genuine descriptions receive 3x more interest from compatible families.
                      </span>
                    </div>

                    {/* Partner Expectations */}
                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">Partner Expectations</label>
                      <textarea
                        className="vk-mat-textarea"
                        placeholder="Describe what you are looking for in a partner (e.g., educational qualification, profession, values, location, and family background)..."
                        value={formData.partnerExpectations}
                        onChange={(e) => handleChange('partnerExpectations', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 2: BASIC & PERSONAL DETAILS
                  ------------------------------------------------------------- */}
              {currentStep === 2 && (
                <div className="vk-mat-step-panel">
                  <div className="vk-mat-step-panel-header">
                    <h4 className="vk-mat-step-panel-title">Basic & Personal Details</h4>
                    <p className="vk-mat-step-panel-subtitle">
                      Personal demographic information of the candidate.
                    </p>
                  </div>

                  <div className="vk-mat-form-grid">
                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Full Name <span className="vk-mat-required">*</span>
                      </label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Full Name"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Gender <span className="vk-mat-required">*</span>
                      </label>
                      <select
                        className="vk-mat-select"
                        value={formData.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Marital Status <span className="vk-mat-required">*</span>
                      </label>
                      <select
                        className="vk-mat-select"
                        value={formData.maritalStatus}
                        onChange={(e) => handleChange('maritalStatus', e.target.value)}
                        required
                      >
                        <option value="Never Married">Never Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Awaiting Divorce">Awaiting Divorce</option>
                      </select>
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Date of Birth (DOB) <span className="vk-mat-required">*</span>
                      </label>
                      <input
                        type="date"
                        className="vk-mat-input"
                        value={formData.dob}
                        onChange={handleDobChange}
                        required
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Age</label>
                      <input
                        type="number"
                        className="vk-mat-input"
                        placeholder="Age in years"
                        value={formData.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Mother Tongue</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Your Mother Tongue"
                        value={formData.motherTongue}
                        onChange={(e) => handleChange('motherTongue', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Height</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="5 ft 8 in / 172 cm"
                        value={formData.height}
                        onChange={(e) => handleChange('height', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Weight</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="77 kg"
                        value={formData.weight}
                        onChange={(e) => handleChange('weight', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 3: RELIGIOUS & ASTROLOGICAL DETAILS
                  ------------------------------------------------------------- */}
              {currentStep === 3 && (
                <div className="vk-mat-step-panel">
                  <div className="vk-mat-step-panel-header">
                    <h4 className="vk-mat-step-panel-title">Religious & Astrological Details</h4>
                    <p className="vk-mat-step-panel-subtitle">
                      Jathagam and horoscope matching details for family alignment.
                    </p>
                  </div>

                  <div className="vk-mat-form-grid">
                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Religion</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Your Religion"
                        value={formData.religion}
                        onChange={(e) => handleChange('religion', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Community</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Community / Category"
                        value={formData.community}
                        onChange={(e) => handleChange('community', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Caste / Sub-caste</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="e.g. Mudaliar, Pillai, Iyer, Nadar, etc."
                        value={formData.caste}
                        onChange={(e) => handleChange('caste', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Gothram</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="e.g. Siva, Kashyapa, Bharadwaja"
                        value={formData.gothram}
                        onChange={(e) => handleChange('gothram', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Raasi (Moon Sign)</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="e.g. Mesham, Rishabam, Mithunam, Kadagam..."
                        value={formData.rasi}
                        onChange={(e) => handleChange('rasi', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Natchathiram (Star)</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="e.g. Ashwini, Rohini, Uthiram, Revathi..."
                        value={formData.star}
                        onChange={(e) => handleChange('star', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Dosham <span className="vk-mat-required">*</span>
                      </label>
                      <select
                        className="vk-mat-select"
                        value={formData.dosham}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            dosham: val,
                            doshamType: val === 'No' ? '' : prev.doshamType,
                            doshamCustom: val === 'No' ? '' : prev.doshamCustom,
                          }));
                        }}
                        required
                      >
                        <option value="">Select Dosham (Yes / No)</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Dosham Details {formData.dosham === 'Yes' && <span className="vk-mat-required">*</span>}
                      </label>
                      {formData.dosham === 'Yes' ? (
                        formData.doshamType === 'Write Yourself' ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <select
                              className="vk-mat-select"
                              style={{ width: '42%', minWidth: '130px' }}
                              value={formData.doshamType}
                              onChange={(e) => handleChange('doshamType', e.target.value)}
                              required
                            >
                              <option value="Chevvai">Chevvai</option>
                              <option value="Ragu-Kethu">Ragu-Kethu</option>
                              <option value="Write Yourself">Write Yourself</option>
                            </select>
                            <input
                              type="text"
                              className="vk-mat-input"
                              style={{ flex: 1 }}
                              placeholder="Write Dosham Details"
                              value={formData.doshamCustom}
                              onChange={(e) => handleChange('doshamCustom', e.target.value)}
                              required
                              autoFocus
                            />
                          </div>
                        ) : (
                          <select
                            className="vk-mat-select"
                            value={formData.doshamType}
                            onChange={(e) => handleChange('doshamType', e.target.value)}
                            required
                          >
                            <option value="">Select Dosham Type</option>
                            <option value="Chevvai">Chevvai</option>
                            <option value="Ragu-Kethu">Ragu-Kethu</option>
                            <option value="Write Yourself">Write Yourself</option>
                          </select>
                        )
                      ) : (
                        <input
                          type="text"
                          className="vk-mat-input"
                          value={formData.dosham === 'No' ? 'No Dosham (Not Applicable)' : 'Select Dosham (Yes / No)'}
                          disabled
                          style={{
                            backgroundColor: '#f5f5f5',
                            color: '#8c8c8c',
                            cursor: 'not-allowed',
                            border: '1px solid #e0e0e0',
                          }}
                        />
                      )}
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Birth Time</label>
                      <input
                        type="time"
                        className="vk-mat-input"
                        value={formData.birthTime}
                        onChange={(e) => handleChange('birthTime', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Birth Place</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Birth Place"
                        value={formData.birthPlace}
                        onChange={(e) => handleChange('birthPlace', e.target.value)}
                      />
                    </div>

                    {/* Horoscope File Upload */}
                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">
                        Horoscope File Upload (PDF / Image)
                      </label>
                      <label className="vk-mat-upload-box" style={{ padding: '16px' }}>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={handleHoroscopeUpload}
                          style={{ display: 'none' }}
                        />
                        <BsFileEarmarkPdf className="vk-mat-upload-icon" style={{ fontSize: '26px' }} />
                        <div className="vk-mat-upload-text">
                          Upload Horoscope / Jathagam Copy
                        </div>
                        <div className="vk-mat-upload-subtext">PDF, JPG, PNG up to 10MB</div>
                      </label>

                      {formData.horoscopeFile && (
                        <div className="vk-mat-file-pill">
                          <div className="vk-mat-file-pill-left">
                            <BsFileEarmarkPdf />
                            <span>
                              {formData.horoscopeFile.name} ({formData.horoscopeFile.size})
                            </span>
                          </div>
                          <button
                            type="button"
                            className="vk-mat-photo-remove"
                            style={{ position: 'static' }}
                            onClick={() => handleChange('horoscopeFile', null)}
                            title="Remove file"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 4: EDUCATION & CAREER
                  ------------------------------------------------------------- */}
              {currentStep === 4 && (
                <div className="vk-mat-step-panel">
                  <div className="vk-mat-step-panel-header">
                    <h4 className="vk-mat-step-panel-title">Education & Career</h4>
                    <p className="vk-mat-step-panel-subtitle">
                      Professional credentials and occupational background.
                    </p>
                  </div>

                  <div className="vk-mat-form-grid">
                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Highest Qualification <span className="vk-mat-required">*</span>
                      </label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Your Highest Qualification"
                        value={formData.highestQualification}
                        onChange={(e) => handleChange('highestQualification', e.target.value)}
                        required
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">College / University</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Your University Name"
                        value={formData.educationStream}
                        onChange={(e) => handleChange('educationStream', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Occupation</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Your Job Role"
                        value={formData.occupation}
                        onChange={(e) => handleChange('occupation', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Company / Organization</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Your Organization Name"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Annual Income / Salary</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="₹12 - ₹15 Lakhs p.a "
                        value={formData.annualIncome}
                        onChange={(e) => handleChange('annualIncome', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Work Location</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="City, State, Country"
                        value={formData.workLocation}
                        onChange={(e) => handleChange('workLocation', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 5: FAMILY DETAILS
                  ------------------------------------------------------------- */}
              {currentStep === 5 && (
                <div className="vk-mat-step-panel">
                  <div className="vk-mat-step-panel-header">
                    <h4 className="vk-mat-step-panel-title">Family Details</h4>
                    <p className="vk-mat-step-panel-subtitle">
                      Family structure, ancestral origin, and parents' details.
                    </p>
                  </div>

                  <div className="vk-mat-form-grid">
                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Father's Name</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Father's Full Name"
                        value={formData.fatherName}
                        onChange={(e) => handleChange('fatherName', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Father's Occupation</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Father's Occupation"
                        value={formData.fatherOccupation}
                        onChange={(e) => handleChange('fatherOccupation', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Mother's Name</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Mother's Full Name"
                        value={formData.motherName}
                        onChange={(e) => handleChange('motherName', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Mother's Occupation</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Mother's Occupation"
                        value={formData.motherOccupation}
                        onChange={(e) => handleChange('motherOccupation', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Siblings</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="e.g. 1 Elder Brother (Married), 1 Younger Sister"
                        value={formData.siblings}
                        onChange={(e) => handleChange('siblings', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Family Status / Type</label>
                      <select
                        className="vk-mat-select"
                        value={formData.familyType}
                        onChange={(e) => handleChange('familyType', e.target.value)}
                      >
                        <option value="Nuclear Family">Nuclear Family</option>
                        <option value="Joint Family">Joint Family</option>
                      </select>
                    </div>

                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">Native Place / Ancestral</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Your Native Place"
                        value={formData.nativePlace}
                        onChange={(e) => handleChange('nativePlace', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 6: LIFESTYLE & HABITS
                  ------------------------------------------------------------- */}
              {currentStep === 6 && (
                <div className="vk-mat-step-panel">
                  <div className="vk-mat-step-panel-header">
                    <h4 className="vk-mat-step-panel-title">Lifestyle & Habits</h4>
                    <p className="vk-mat-step-panel-subtitle">
                      Personal dietary choices and daily living habits.
                    </p>
                  </div>

                  <div className="vk-mat-form-grid">
                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Eating Habits</label>
                      <select
                        className="vk-mat-select"
                        value={formData.eatingHabits}
                        onChange={(e) => handleChange('eatingHabits', e.target.value)}
                      >
                        <option value="">Select Eating Habits</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Eggetarian">Eggetarian</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Smoking Habits</label>
                      <select
                        className="vk-mat-select"
                        value={formData.smokingHabits}
                        onChange={(e) => handleChange('smokingHabits', e.target.value)}
                      >
                        <option value="">Select Smoking Habits</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Occasionally">Occasionally</option>
                      </select>
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Drinking Habits</label>
                      <select
                        className="vk-mat-select"
                        value={formData.drinkingHabits}
                        onChange={(e) => handleChange('drinkingHabits', e.target.value)}
                      >
                        <option value="">Select Drinking Habits</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Occasionally">Occasionally</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 7: CONTACT & RESIDENTIAL DETAILS
                  ------------------------------------------------------------- */}
              {currentStep === 7 && (
                <div className="vk-mat-step-panel">
                  <div className="vk-mat-step-panel-header">
                    <h4 className="vk-mat-step-panel-title">Contact & Residential Details</h4>
                    <p className="vk-mat-step-panel-subtitle">
                      Secure contact and address details. Strictly protected by privacy settings.
                    </p>
                  </div>

                  <div className="vk-mat-form-grid">
                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Mobile Number <span className="vk-mat-required">*</span>
                      </label>
                      <input
                        type="tel"
                        className="vk-mat-input"
                        placeholder="+91 98765 43210"
                        value={formData.mobileNumber}
                        onChange={(e) => handleChange('mobileNumber', e.target.value)}
                        required
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Alternate Contact Number
                      </label>
                      <input
                        type="tel"
                        className="vk-mat-input"
                        placeholder="+91 94440 12345"
                        value={formData.secondaryContact}
                        onChange={(e) => handleChange('secondaryContact', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">
                        Email Address <span className="vk-mat-required">*</span>
                      </label>
                      <input
                        type="email"
                        className="vk-mat-input"
                        placeholder="Your Email-Id"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">City / District</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Your City"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group vk-mat-form-col-full">
                      <label className="vk-mat-label">Residential Address</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Your Address"
                        value={formData.residentialAddress}
                        onChange={(e) => handleChange('residentialAddress', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">State</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Your State"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Country</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Your Country"
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                      />
                    </div>

                    <div className="vk-mat-form-group">
                      <label className="vk-mat-label">Pincode / Zip Code</label>
                      <input
                        type="text"
                        className="vk-mat-input"
                        placeholder="Enter Pincode"
                        value={formData.pincode}
                        onChange={(e) => handleChange('pincode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Actions */}
              <div className="vk-mat-form-actions">
                <button
                  type="button"
                  className="vk-mat-btn-back"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <BsArrowLeft />
                  <span>Previous</span>
                </button>

                {currentStep < 7 ? (
                  <button type="button" className="vk-mat-btn-next" onClick={nextStep}>
                    <span>Continue to {stepsList[currentStep].label}</span>
                    <BsArrowRight />
                  </button>
                ) : (
                  <button type="submit" className="vk-mat-btn-submit">
                    <BsCheckCircleFill />
                    <span>Submit & Register Profile</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Profile Submission Success Confirmation Modal */}
      {isSubmitted && (
        <div className="vk-mat-modal-overlay">
          <div className="vk-mat-modal-card">
            <div className="vk-mat-modal-icon">
              <BsCheckCircleFill />
            </div>
            <h3 className="vk-mat-modal-title">Registration Successful!</h3>
            <p className="vk-mat-modal-desc">
              Your candidate profile has been created successfully. Our matrimony verification team
              will verify your credentials within 24 hours.
            </p>
            <div className="vk-mat-id-badge">
              <div className="vk-mat-id-label">Your Matrimony ID</div>
              <div className="vk-mat-id-val">{regId}</div>
            </div>
            <div>
              <button
                type="button"
                className="vk-mat-btn-next"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ASSISTANCE CTA CARD (SEPARATE STANDALONE CARD ABOVE FOOTER)
          ========================================================================= */}
      <section className="vk-assistance-card-section">
        <div className="vk-assistance-card">
          <div className="vk-assistance-text">
            <h3 className="vk-assistance-title">
              Need Guidance with Profile Registration or Horoscope Matching?
            </h3>
            <p className="vk-assistance-desc">
              Our experienced matrimony advisors and wedding coordinators are here to assist your
              family.
            </p>
          </div>
          <div className="vk-assistance-actions">
            <a href="tel:+916369122716" className="vk-assistance-pill" title="Call Us Directly">
              <BsTelephoneFill className="vk-assistance-pill-icon" />
              <span>+91 63691 22716</span>
            </a>
            <a
              href="mailto:vkadmin0211@gmail.com"
              className="vk-assistance-pill"
              title="Send Us an Email"
            >
              <BsEnvelopeFill className="vk-assistance-pill-icon" />
              <span>vkadmin0211@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER COMPONENT
          ========================================================================= */}
      <Footer />
    </div>
  );
};

export default Matrimony;


