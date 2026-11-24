import React, { useState } from 'react';
import '../../style/users/Booking_User.css';
import Navbar from './Navbar';
import Footer from './Footer';

// Import icons
import {
  BsCalendarCheck,
  BsShop,
  BsGeoAltFill,
  BsTelephoneFill,
  BsChatDotsFill,
  BsCheckCircleFill,
  BsClockFill,
  BsPatchCheckFill,
  BsSearch,
  BsFileEarmarkPdf,
  BsShare,
  BsArrowRight,
  BsCreditCard,
  BsExclamationCircle,
} from 'react-icons/bs';
import { FiX } from 'react-icons/fi';

// Import relevant wedding service images for booked items
import imgStageDecor from '../../assets/images/wedding_services/Stage Decoration.jpg';
import imgCatering from '../../assets/images/wedding_services/Catering Services.jpg';
import imgPhotography from '../../assets/images/wedding_services/Photography & Videography.jpg';
import imgCars from '../../assets/images/wedding_services/Wedding Cars (Groom & Bride).jpg';
import imgNadaswaram from '../../assets/images/wedding_services/Nadaswaram & Thavil.jpg';

const initialBookings = [
  {
    id: 'VK-BK-84219',
    serviceTitle: 'Royal Stage & Mandap Floral Decoration',
    serviceCategory: 'Stage & Mandap',
    image: imgStageDecor,
    status: 'Confirmed', // Confirmed, Pending, Completed
    bookingDate: '02 Nov 2026',
    marriageDate: '28 Dec 2026',
    marriageTime: 'Muhurtham Morning 06:00 AM - 11:30 AM',
    marriageVenue: 'Mayor Ramanathan Chettiar Hall, MRC Nagar, Chennai',
    vendorName: 'Sri Lakshmi Kalyana Decorators',
    vendorLocation: 'T. Nagar, Chennai',
    vendorContact: '+91 98401 23456',
    vendorRating: '4.9 ★ (180+ events)',
    packageDetails: 'Royal Traditional Floral Backdrop, Grand Entrance Floral Arch, Golden Royal Couple Sofa, and Ambient Stage Lights',
    inclusions: ['Fresh Jasmine & Rose Florals', 'Setup 8 Hrs Prior', 'On-site Supervisor Included'],
    totalAmount: '₹85,000',
    advancePaid: '₹30,000',
    balanceDue: '₹55,000',
    paymentStatus: 'Advance Paid',
  },
  {
    id: 'VK-BK-73104',
    serviceTitle: 'Grand South Indian Traditional Wedding Feast',
    serviceCategory: 'Catering Services',
    image: imgCatering,
    status: 'Confirmed',
    bookingDate: '04 Nov 2026',
    marriageDate: '28 Dec 2026',
    marriageTime: 'Breakfast (7:30 AM) & Muhurtham Lunch (12:00 PM)',
    marriageVenue: 'Mayor Ramanathan Chettiar Hall, MRC Nagar, Chennai',
    vendorName: 'Royal Feast Traditional Caterers',
    vendorLocation: 'Vadapalani, Chennai',
    vendorContact: '+91 94440 98765',
    vendorRating: '4.8 ★ (320+ weddings)',
    packageDetails: '32-Item Plantain Leaf Feast for 1,200 Guests + Filter Coffee Stall & Live Sweet Counter',
    inclusions: ['Pure Ghee Preparation', 'Uniformed Serving Staff', 'Disposable Waste Management'],
    totalAmount: '₹3,40,000',
    advancePaid: '₹1,00,000',
    balanceDue: '₹2,40,000',
    paymentStatus: 'Advance Paid',
  },
  {
    id: 'VK-BK-61922',
    serviceTitle: 'Candid Photography & 4K Cinematic Wedding Film',
    serviceCategory: 'Photography',
    image: imgPhotography,
    status: 'Confirmed',
    bookingDate: '06 Nov 2026',
    marriageDate: '27 & 28 Dec 2026',
    marriageTime: 'Reception (27th 6 PM) + Wedding (28th 6 AM)',
    marriageVenue: 'Mayor Ramanathan Chettiar Hall, MRC Nagar, Chennai',
    vendorName: 'Vivah Moments Photography Studio',
    vendorLocation: 'Alwarpet, Chennai',
    vendorContact: '+91 97910 11223',
    vendorRating: '5.0 ★ (95+ reviews)',
    packageDetails: '2 Traditional Cameras + 2 Candid Photographers + 4K Drone Coverage + 1 Traditional Video + Premium Leather Photo Album (40 Sheets)',
    inclusions: ['4K Drone Included', 'Teaser Reel within 72 hrs', 'Full RAW Deliverables on 1TB Drive'],
    totalAmount: '₹1,20,000',
    advancePaid: '₹50,000',
    balanceDue: '₹70,000',
    paymentStatus: 'Advance Paid',
  },
  {
    id: 'VK-BK-50811',
    serviceTitle: 'Luxury Mercedes-Benz E-Class Bridal Entry Car',
    serviceCategory: 'Luxury Transport',
    image: imgCars,
    status: 'Pending',
    bookingDate: '10 Nov 2026',
    marriageDate: '28 Dec 2026',
    marriageTime: 'Morning 05:00 AM - Evening 03:00 PM',
    marriageVenue: 'Pickup: Anna Nagar -> Venue: MRC Nagar, Chennai',
    vendorName: 'VK Royal Luxury Wheels',
    vendorLocation: 'Guindy, Chennai',
    vendorContact: '+91 98840 55443',
    vendorRating: '4.7 ★ (110+ bookings)',
    packageDetails: 'White Mercedes-Benz E-Class with Uniformed Chauffeur, White Satin Ribbons & Exotic Orchid Fresh Bonnet Bouquet',
    inclusions: ['100 KMs / 10 Hours Fuel', 'Uniformed Chauffeur', 'Complete Floral Car Decoration'],
    totalAmount: '₹22,000',
    advancePaid: '₹5,000',
    balanceDue: '₹17,000',
    paymentStatus: 'Vendor Confirmation Pending',
  },
];

const Booking_User = () => {
  const [bookings] = useState(initialBookings);
  const [filterTab, setFilterTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Filtering Logic
  const filteredBookings = bookings.filter((item) => {
    const matchesTab =
      filterTab === 'All'
        ? true
        : filterTab === 'Confirmed'
          ? item.status === 'Confirmed'
          : filterTab === 'Pending'
            ? item.status === 'Pending'
            : true;

    const matchesSearch =
      item.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.marriageVenue.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="vk-booking-page">
      {/* Standalone User Navbar */}
      <Navbar activeNav="booking" />

      {/* =========================================================================
          SECTION 2: BANNER & DASHBOARD TITLE
          ========================================================================= */}
      <section className="vk-book-banner">
        <div className="vk-book-banner-container">
          <div className="vk-book-badge">
            <BsCalendarCheck />
            <span>Services Management</span>
          </div>
          <h1 className="vk-book-title">Your Booked Services</h1>
          <p className="vk-book-subtitle">
            Track confirmed wedding vendors, event timings, marriage venue logistics, and balance payments all in one seamless place.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SUMMARY COUNTER CARDS
          ========================================================================= */}
      <section className="vk-book-counters-strip">
        <div className="vk-book-counters-container">
          <div className="vk-book-counter-card">
            <div className="vk-book-counter-icon">
              <BsShop />
            </div>
            <div className="vk-book-counter-text">
              <span className="vk-book-counter-num">{bookings.length} Services</span>
              <span className="vk-book-counter-label">Total Bookings</span>
            </div>
          </div>

          <div className="vk-book-counter-card">
            <div className="vk-book-counter-icon green">
              <BsCheckCircleFill />
            </div>
            <div className="vk-book-counter-text">
              <span className="vk-book-counter-num">3 Confirmed</span>
              <span className="vk-book-counter-label">Vendor Approved</span>
            </div>
          </div>

          <div className="vk-book-counter-card">
            <div className="vk-book-counter-icon gold">
              <BsClockFill />
            </div>
            <div className="vk-book-counter-text">
              <span className="vk-book-counter-num">1 Pending</span>
              <span className="vk-book-counter-label">Awaiting Confirmation</span>
            </div>
          </div>

          <div className="vk-book-counter-card">
            <div className="vk-book-counter-icon purple">
              <BsCreditCard />
            </div>
            <div className="vk-book-counter-text">
              <span className="vk-book-counter-num">₹5,67,000</span>
              <span className="vk-book-counter-label">Total Contract Value</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MAIN BOOKINGS LIST & CONTROLS
          ========================================================================= */}
      <main className="vk-book-main-wrap">
        {/* Controls: Filter Tabs + Search Input */}
        <div className="vk-book-controls">
          <div className="vk-book-filter-tabs">
            {['All', 'Confirmed', 'Pending'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`vk-book-tab ${filterTab === tab ? 'active' : ''}`}
                onClick={() => setFilterTab(tab)}
              >
                {tab} ({tab === 'All' ? bookings.length : bookings.filter((b) => b.status === tab).length})
              </button>
            ))}
          </div>

          <div className="vk-book-search-box">
            <BsSearch />
            <input
              type="text"
              placeholder="Search by vendor, service, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Bookings Card List */}
        {filteredBookings.length === 0 ? (
          <div className="vk-book-empty">
            <BsExclamationCircle className="vk-book-empty-icon" />
            <h3>No Bookings Found</h3>
            <p>No services match your current filter or search criteria.</p>
          </div>
        ) : (
          <div className="vk-book-list">
            {filteredBookings.map((item) => (
              <div key={item.id} className="vk-book-card">
                {/* Header Strip */}
                <div className="vk-book-card-header">
                  <div className="vk-book-id-group">
                    <span className="vk-book-ref-tag">{item.id}</span>
                    <span className="vk-book-date-meta">
                      <BsClockFill /> Booked on {item.bookingDate}
                    </span>
                  </div>

                  <span
                    className={`vk-book-status-pill ${item.status === 'Confirmed' ? 'confirmed' : 'pending'
                      }`}
                  >
                    <BsCheckCircleFill /> {item.status}
                  </span>
                </div>

                {/* Body: 3-column layout */}
                <div className="vk-book-card-body">
                  {/* Col 1: Thumbnail */}
                  <div className="vk-book-thumb-col">
                    <img src={item.image} alt={item.serviceTitle} className="vk-book-thumb-img" />
                    <span className="vk-book-category-tag">{item.serviceCategory}</span>
                  </div>

                  {/* Col 2: Service, Vendor & Marriage Details */}
                  <div className="vk-book-details-col">
                    <h2 className="vk-book-service-title">{item.serviceTitle}</h2>

                    {/* Vendor Name & Location */}
                    <div className="vk-book-vendor-row">
                      <span className="vk-book-vendor-name">
                        <BsShop /> {item.vendorName}
                        <BsPatchCheckFill title="Verified Vendor" style={{ color: '#10B981', fontSize: '13px' }} />
                      </span>
                      <span className="vk-book-vendor-loc">
                        <BsGeoAltFill /> {item.vendorLocation}
                      </span>
                    </div>

                    {/* Wedding Date & Venue Meta Grid */}
                    <div className="vk-book-meta-grid">
                      <div className="vk-book-meta-item">
                        <span className="vk-book-meta-lbl">
                          <BsCalendarCheck /> Marriage Date & Timing
                        </span>
                        <span className="vk-book-meta-val">{item.marriageDate}</span>
                        <span className="vk-book-meta-sub">{item.marriageTime}</span>
                      </div>

                      <div className="vk-book-meta-item">
                        <span className="vk-book-meta-lbl">
                          <BsGeoAltFill /> Marriage Hall / Location
                        </span>
                        <span className="vk-book-meta-val">{item.marriageVenue}</span>
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div className="vk-book-inclusions">
                      {item.inclusions.map((inc, i) => (
                        <span key={i} className="vk-book-inclusion-pill">
                          ✓ {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Commercial & Actions */}
                  <div className="vk-book-pricing-col">
                    <div className="vk-book-price-box">
                      <div className="vk-book-price-top">
                        <span className="vk-book-price-label">Agreed Cost</span>
                        <span className="vk-book-price-amount">{item.totalAmount}</span>
                      </div>
                      <div className="vk-book-payment-row">
                        <span className="vk-book-paid-text">Paid: {item.advancePaid}</span>
                        <span className="vk-book-due-text">Due: {item.balanceDue}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="vk-book-actions-group">
                      <a
                        href={`tel:${item.vendorContact}`}
                        className="vk-book-btn-primary"
                        title="Call Vendor"
                      >
                        <BsTelephoneFill /> Call Coordinator
                      </a>

                      <button
                        type="button"
                        className="vk-book-btn-secondary"
                        onClick={() => setSelectedReceipt(item)}
                      >
                        <BsFileEarmarkPdf /> View Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* =========================================================================
          SECTION 5: DETAILED RECEIPT / INVOICE MODAL
          ========================================================================= */}
      {selectedReceipt && (
        <div className="vk-receipt-overlay" onClick={() => setSelectedReceipt(null)}>
          <div className="vk-receipt-card" onClick={(e) => e.stopPropagation()}>
            <div className="vk-receipt-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>Official Booking Receipt</h3>
                <span style={{ fontSize: '12px', opacity: 0.85 }}>
                  Booking ID: {selectedReceipt.id}
                </span>
              </div>
              <button
                type="button"
                className="vk-receipt-close-btn"
                onClick={() => setSelectedReceipt(null)}
              >
                <FiX />
              </button>
            </div>

            <div className="vk-receipt-body">
              <div className="vk-receipt-row">
                <strong>Service Booked:</strong>
                <span>{selectedReceipt.serviceTitle}</span>
              </div>
              <div className="vk-receipt-row">
                <strong>Vendor Name:</strong>
                <span>{selectedReceipt.vendorName}</span>
              </div>
              <div className="vk-receipt-row">
                <strong>Vendor Location:</strong>
                <span>{selectedReceipt.vendorLocation}</span>
              </div>
              <div className="vk-receipt-row">
                <strong>Marriage Date:</strong>
                <span>{selectedReceipt.marriageDate}</span>
              </div>
              <div className="vk-receipt-row">
                <strong>Marriage Timing:</strong>
                <span>{selectedReceipt.marriageTime}</span>
              </div>
              <div className="vk-receipt-row">
                <strong>Marriage Venue:</strong>
                <span style={{ textAlign: 'right', maxWidth: '60%' }}>
                  {selectedReceipt.marriageVenue}
                </span>
              </div>
              <div className="vk-receipt-row">
                <strong>Coordinator Contact:</strong>
                <span>{selectedReceipt.vendorContact}</span>
              </div>
              <div className="vk-receipt-row">
                <strong>Package Scope:</strong>
                <span style={{ textAlign: 'right', maxWidth: '65%' }}>
                  {selectedReceipt.packageDetails}
                </span>
              </div>
              <div className="vk-receipt-row" style={{ marginTop: '10px', fontSize: '15px' }}>
                <strong>Total Amount:</strong>
                <strong style={{ color: 'var(--color-primary)' }}>
                  {selectedReceipt.totalAmount}
                </strong>
              </div>
              <div className="vk-receipt-row">
                <strong>Advance Paid:</strong>
                <span style={{ color: '#059669', fontWeight: 600 }}>
                  {selectedReceipt.advancePaid}
                </span>
              </div>
              <div className="vk-receipt-row">
                <strong>Balance Due on Event:</strong>
                <span style={{ color: '#B45309', fontWeight: 600 }}>
                  {selectedReceipt.balanceDue}
                </span>
              </div>
            </div>

            <div className="vk-receipt-footer">
              <button
                type="button"
                className="vk-book-btn-secondary"
                onClick={() => window.print()}
              >
                Print / Save PDF
              </button>
              <button
                type="button"
                className="vk-book-btn-primary"
                onClick={() => setSelectedReceipt(null)}
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Standalone User Footer */}
      <Footer />
    </div>
  );
};

export default Booking_User;


