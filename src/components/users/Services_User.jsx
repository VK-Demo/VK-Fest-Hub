import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiChevronDown,
  FiSearch,
  FiSliders,
  FiCheckCircle,
} from 'react-icons/fi';
import { BsChatDotsFill, BsTelephoneFill, BsEnvelopeFill } from 'react-icons/bs';
import '../../style/users/Services_User.css';

// Brand Advertisement Carousel Banners (Kalyan Jewellers, Malabar Gold & Diamonds, Tanishq Rivaah)
import adKalyanJewellers from '../../assets/images/users/kalyan_jewellers_ad.jpg';
import adMalabarGold from '../../assets/images/users/malabar_gold_ad.jpg';
import adTanishqRivaah from '../../assets/images/users/tanishq_rivaah_ad.jpg';

// Wedding Services Images (Alphabetical)
import imgBakerySweets from '../../assets/images/wedding_services/Bakery & Sweets.jpg';
import imgBananaLeaf from '../../assets/images/wedding_services/Banana Leaf, Buffet & Plates.jpg';
import imgBanners from '../../assets/images/wedding_services/Banners & Printing.jpg';
import imgBeeda from '../../assets/images/wedding_services/Beeda Stall.jpg';
import imgBirthdayHalls from '../../assets/images/wedding_services/Birthday & Party Halls.jpg';
import imgBouquets from '../../assets/images/wedding_services/Bouquets.jpg';
import imgBoutique from '../../assets/images/wedding_services/Boutique & Tailoring.jpg';
import imgBridalClothing from '../../assets/images/wedding_services/Bridal & Groom Clothing.jpg';
import imgBridalMakeup from '../../assets/images/wedding_services/Bridal & Groom Makeup.jpg';
import imgCarDisplay from '../../assets/images/wedding_services/Car Show & Vehicle Display.jpg';
import imgCatering from '../../assets/images/wedding_services/Catering Services.jpg';
import imgCeremonialTrays from '../../assets/images/wedding_services/Ceremonial Gift Trays.jpg';
import imgToyShow from "../../assets/images/wedding_services/Children's Entertainment & Toy Show.jpg";
import imgCoconut from '../../assets/images/wedding_services/Coconut.jpeg';
import imgDanceTroupe from '../../assets/images/wedding_services/Dance Troupe & Choreography.jpg';
import imgDjMusic from '../../assets/images/wedding_services/DJ Music & Sound.jpg';
import imgDrums from '../../assets/images/wedding_services/Drums & Chenda Melam.jpg';
import imgEventManagement from '../../assets/images/wedding_services/Event Management & Planning.jpg';
import imgFloralDecor from '../../assets/images/wedding_services/Flowers & Floral Decoration.jpg';
import imgFreshFlowers from '../../assets/images/wedding_services/Fresh Natural Flowers.jpg';
import imgFruitStall from '../../assets/images/wedding_services/Fruit Stall & Fruit Carving.jpg';
import imgFurniture from '../../assets/images/wedding_services/Furniture (Wooden & Event Furniture).jpg';
import imgGarlands from '../../assets/images/wedding_services/Garlands & Maalai.jpg';
import imgGifts from '../../assets/images/wedding_services/Gifts & Return Gifts.jpg';
import imgHairStylist from '../../assets/images/wedding_services/Hair Stylist.jpg';
import imgAccommodation from '../../assets/images/wedding_services/Hotels & Guest Accommodation.jpg';
import imgIceCreamStall from '../../assets/images/wedding_services/Ice Cream Stall.jpg';
import imgJewellery from '../../assets/images/wedding_services/Jewellery.jpg';
import imgLiveSinging from '../../assets/images/wedding_services/Live Singing & Orchestra.jpg';
import imgVenues from '../../assets/images/wedding_services/Marriage Halls.jpg';
import imgMehendi from '../../assets/images/wedding_services/Mehndi & Henna.jpg';
import imgTradMusic from '../../assets/images/wedding_services/Nadaswaram & Thavil.jpg';
import imgPhotography from '../../assets/images/wedding_services/Photography & Videography.jpg';
import imgPriests from '../../assets/images/wedding_services/Priests & Rituals.jpg';
import imgSareeDraping from '../../assets/images/wedding_services/Saree Draping & Styling.jpg';
import imgSerialLighting from '../../assets/images/wedding_services/Serial & Decorative Lighting.jpg';
import imgSkincareFacial from '../../assets/images/wedding_services/Skin Care & Facial.jpg';
import imgStageDecor from '../../assets/images/wedding_services/Stage Decoration.jpg';
import imgRentals from '../../assets/images/wedding_services/Tent, Chairs, Vessels & Event Rentals.jpg';
import imgTravel from '../../assets/images/wedding_services/Travel (Bus & Car).jpg';
import imgWaterSupply from '../../assets/images/wedding_services/water supply.jpg';
import imgCakes from '../../assets/images/wedding_services/wedding cakes.jpg';
import imgCars from '../../assets/images/wedding_services/Wedding Cars (Groom & Bride).jpg';
import imgInvitations from '../../assets/images/wedding_services/Wedding Invitations.jpg';

// Promo Carousel Slides Array (Brand Advertisements with embedded typography and wedding offers)
const promoSlides = [
  { id: 1, image: adKalyanJewellers, alt: 'Kalyan Jewellers Muhurat Wedding Collection - Flat 25% Off Making Charges' },
  { id: 2, image: adMalabarGold, alt: 'Malabar Gold & Diamonds Brides of India - 0% Deduction Gold Exchange' },
  { id: 3, image: adTanishqRivaah, alt: 'Tanishq Rivaah Wedding Jewellery - Up to 20% Off Gold & Diamond Making Charges' }
];

// Complete Alphabetical Wedding Services Catalog (44 Services)
const servicesCatalog = [
  {
    id: 'bakery-sweets',
    title: 'Bakery & Sweets',
    category: 'Food & Sweets',
    description: 'Traditional wedding sweets, Ghee Mysore Pak, Paruppu Thengai Koodu & gift boxes.',
    image: imgBakerySweets
  },
  {
    id: 'banana-leaf-buffet',
    title: 'Banana Leaf, Buffet & Plates',
    category: 'Food & Dining',
    description: 'Authentic South Indian banana leaf seating virundhu & luxury buffet setups.',
    image: imgBananaLeaf
  },
  {
    id: 'banners-printing',
    title: 'Banners & Printing',
    category: 'Signage & Print',
    description: 'Designer welcome standees, digital LED display boards & customized signage.',
    image: imgBanners
  },
  {
    id: 'beeda-stall',
    title: 'Beeda Stall',
    category: 'Food & Dining',
    description: 'Royal meetha paan counter with aromatic gulkand, silver foil, dates & festive flavors.',
    image: imgBeeda
  },
  {
    id: 'birthday-halls',
    title: 'Birthday & Party Halls',
    category: 'Venues & Halls',
    description: 'Elegantly decorated AC banquet halls with themed backdrops & dining setups.',
    image: imgBirthdayHalls
  },
  {
    id: 'bouquets',
    title: 'Bouquets',
    category: 'Floral & Gifts',
    description: 'Exquisite bridal handheld bouquets, stage greeting bouquets & exotic blooms.',
    image: imgBouquets
  },
  {
    id: 'boutique-tailoring',
    title: 'Boutique & Tailoring',
    category: 'Fashion & Attire',
    description: 'Exclusive bridal silk sarees, designer Aari work blouses & bespoke stitching.',
    image: imgBoutique
  },
  {
    id: 'bridal-groom-clothing',
    title: 'Bridal & Groom Clothing',
    category: 'Fashion & Attire',
    description: 'Royal bridal trousseau, pure silk dhotis, matching angavastram & sherwanis.',
    image: imgBridalClothing
  },
  {
    id: 'bridal-groom-makeup',
    title: 'Bridal & Groom Makeup',
    category: 'Beauty & Grooming',
    description: 'Certified bridal HD & airbrush makeup, grooming & long-lasting festive looks.',
    image: imgBridalMakeup
  },
  {
    id: 'car-display',
    title: 'Car Show & Vehicle Display',
    category: 'Logistics & Display',
    description: 'Luxury automobile entrance displays, vintage car showcases & VIP vehicles.',
    image: imgCarDisplay
  },
  {
    id: 'catering',
    title: 'Catering Services',
    category: 'Food & Catering',
    description: 'Authentic South Indian virundhu, multi-cuisine gourmet menus & live counters.',
    image: imgCatering
  },
  {
    id: 'ceremonial-gift-trays',
    title: 'Ceremonial Gift Trays (Seeru Thattu)',
    category: 'Traditional Decor',
    description: 'Artistically decorated traditional South Indian Seeru Thattu gift trays & platters.',
    image: imgCeremonialTrays
  },
  {
    id: 'children-entertainment',
    title: "Children's Entertainment & Toy Show",
    category: 'Entertainment',
    description: 'Bouncy castles, carnival games, caricature artists & kids fun zones.',
    image: imgToyShow
  },
  {
    id: 'coconut',
    title: 'Coconut & Entrance Arch',
    category: 'Traditional Decor',
    description: 'Auspicious Thoranam, Vaazhai Maram (plantain trees) & sacred palm gateways.',
    image: imgCoconut
  },
  {
    id: 'dance-troupe',
    title: 'Dance Troupe & Choreography',
    category: 'Entertainment',
    description: 'Energetic traditional, classical, and Bollywood dance troupes for sangeet & entries.',
    image: imgDanceTroupe
  },
  {
    id: 'dj-music',
    title: 'DJ Music & Sound',
    category: 'Entertainment & Audio',
    description: 'High-energy wedding DJs, concert-grade acoustic sound systems & stage lighting.',
    image: imgDjMusic
  },
  {
    id: 'drums-melam',
    title: 'Drums & Chenda Melam',
    category: 'Traditional Music',
    description: 'Authentic Kerala Chenda Melam, Punjabi Dhol & royal celebratory percussion.',
    image: imgDrums
  },
  {
    id: 'event-management',
    title: 'Event Management & Planning',
    category: 'Planning & Coordination',
    description: 'End-to-end wedding coordination, vendor supervision, timing & guest hospitality.',
    image: imgEventManagement
  },
  {
    id: 'floral-decor',
    title: 'Flowers & Floral Decoration',
    category: 'Floral & Decor',
    description: 'Exotic floral chandeliers, fragrant jasmine strings, and petal carpets.',
    image: imgFloralDecor
  },
  {
    id: 'fresh-flowers',
    title: 'Fresh Natural Flowers',
    category: 'Floral & Decor',
    description: 'Farm-fresh Madurai jasmine strings, rose petals, lotus blooms & brass urli decor.',
    image: imgFreshFlowers
  },
  {
    id: 'fruit-stall',
    title: 'Fruit Stall & Fruit Carving',
    category: 'Food & Live Counters',
    description: 'Grand wedding fruit counters with artistic carvings & exotic cut fruit spreads.',
    image: imgFruitStall
  },
  {
    id: 'furniture',
    title: 'Furniture (Wooden & Event)',
    category: 'Furniture Rentals',
    description: 'Royal carved wooden diwans, traditional Oonjal swings & VIP banquet sofa chairs.',
    image: imgFurniture
  },
  {
    id: 'garlands-maalai',
    title: 'Garlands & Maalai',
    category: 'Floral & Rituals',
    description: 'Fresh rose petal wedding garlands (Maalai), cardamom malai & bridal veni.',
    image: imgGarlands
  },
  {
    id: 'gifts-return-gifts',
    title: 'Gifts & Return Gifts',
    category: 'Gifts & Favors',
    description: 'Custom wedding return gifts, eco-friendly jute bags, silver coins & hampers.',
    image: imgGifts
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist',
    category: 'Beauty & Styling',
    description: 'Bridal traditional plait poola jada, modern reception hairdos & floral accents.',
    image: imgHairStylist
  },
  {
    id: 'hotels-accommodation',
    title: 'Hotels & Accommodation',
    category: 'Hospitality',
    description: 'Premium hotel rooms, marriage guest houses & AC executive suites for guests.',
    image: imgAccommodation
  },
  {
    id: 'ice-cream-stall',
    title: 'Ice Cream Stall',
    category: 'Live Food Counters',
    description: 'Live kulfi & rolled ice cream carts, waffle stations & dessert spreads.',
    image: imgIceCreamStall
  },
  {
    id: 'jewellery',
    title: 'Jewellery',
    category: 'Bridal Jewellery',
    description: '22K antique temple gold jewellery, diamond sets, bridal chokers & rentals.',
    image: imgJewellery
  },
  {
    id: 'live-singing',
    title: 'Live Singing & Orchestra',
    category: 'Live Music & Shows',
    description: 'Talented playback singers, classical vocalists & live acoustic orchestra bands.',
    image: imgLiveSinging
  },
  {
    id: 'marriage-halls',
    title: 'Marriage Halls',
    category: 'Halls & Venues',
    description: 'Grand AC Kalyana Mandapams, luxury marriage halls, lawn venues & resort spaces.',
    image: imgVenues
  },
  {
    id: 'mehnde-henna',
    title: 'Mehndi & Henna',
    category: 'Beauty & Art',
    description: 'Intricate bridal henna designs, Marwari, Arabic, portrait mehndi & organic cones.',
    image: imgMehendi
  },
  {
    id: 'nadaswaram',
    title: 'Nadaswaram & Thavil',
    category: 'Traditional Music',
    description: 'Renowned temple Vidwans playing auspicious Mangala Vadhyam for Muhurtham rituals.',
    image: imgTradMusic
  },
  {
    id: 'photography-videography',
    title: 'Photography & Videography',
    category: 'Photo & Video Services',
    description: 'Candid wedding photography, cinematic 4K video teasers, drone coverage & albums.',
    image: imgPhotography
  },
  {
    id: 'priests-rituals',
    title: 'Priests & Rituals',
    category: 'Pooja & Rituals',
    description: 'Experienced Vedic purohits, Iyers & Pandits for authentic rituals, muhurtham & homams.',
    image: imgPriests
  },
  {
    id: 'saree-draping',
    title: 'Saree Draping & Styling',
    category: 'Fashion & Styling',
    description: 'Professional bridal saree draping, pin-free pleat alignment & 9-yards Madisar.',
    image: imgSareeDraping
  },
  {
    id: 'serial-lighting',
    title: 'Serial & Decorative Lighting',
    category: 'Lighting & Ambiance',
    description: 'Brilliant LED serial string lights, tree illumination & grand entrance facade glow.',
    image: imgSerialLighting
  },
  {
    id: 'skincare-facial',
    title: 'Skin Care & Facial',
    category: 'Wellness & Skincare',
    description: 'Pre-bridal skincare therapies, HydraFacials, de-tan treatments & gold glow facials.',
    image: imgSkincareFacial
  },
  {
    id: 'stage-decor',
    title: 'Stage Decoration',
    category: 'Stage & Mandap Decor',
    description: 'Grand royal floral mandaps, reception backdrop themes & crystal stage lighting.',
    image: imgStageDecor
  },
  {
    id: 'rentals',
    title: 'Tent, Chairs & Event Rentals',
    category: 'Rentals & Infrastructure',
    description: 'German waterproof shamianas, banquet chairs, VIP sofas & commercial vessels.',
    image: imgRentals
  },
  {
    id: 'travel',
    title: 'Travel (Bus & Car)',
    category: 'Transport & Logistics',
    description: 'AC luxury buses, tempo travellers & sanitized cabs for smooth guest transit.',
    image: imgTravel
  },
  {
    id: 'water-supply',
    title: 'Water Supply',
    category: 'Essential Utilities',
    description: 'Packaged RO drinking water cans & commercial water tankers on demand.',
    image: imgWaterSupply
  },
  {
    id: 'wedding-cakes',
    title: 'Wedding Cakes',
    category: 'Cakes & Bakery',
    description: 'Multi-tiered customized wedding cakes, floral themes & artisan dessert tables.',
    image: imgCakes
  },
  {
    id: 'wedding-cars',
    title: 'Wedding Cars',
    category: 'Luxury Transport',
    description: 'Decorated luxury wedding cars, Mercedes, BMW, Audi & convertible groom entries.',
    image: imgCars
  },
  {
    id: 'wedding-invitations',
    title: 'Wedding Invitations',
    category: 'Invitations & Media',
    description: 'Traditional gold-embossed cards, luxury box hampers & animated video e-invites.',
    image: imgInvitations
  }
];

// 4-Step "How It Works" Data
const howItWorksSteps = [
  {
    step: '01',
    title: 'Explore & Select',
    description: 'Browse 40+ certified wedding categories, review portfolios, and pick your services.',
    icon: <FiSearch />
  },
  {
    step: '02',
    title: 'Select Wedding Date',
    description: 'Verify real-time availability for your wedding and reception dates.',
    icon: <FiCalendar />
  },
  {
    step: '03',
    title: 'Customize Package',
    description: 'Tailor menus, decor themes, and event timings with clear, transparent quotations.',
    icon: <FiSliders />
  },
  {
    step: '04',
    title: 'Stress-Free Celebration',
    description: 'Sit back and enjoy your auspicious celebration with complete peace of mind.',
    icon: <FiCheckCircle />
  }
];

const Services_User = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Auto-advance hero carousel every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  };

  const handleBookNow = (serviceTitle) => {
    navigate('/booking', { state: { selectedService: serviceTitle } });
  };

  // Show only first 9 cards initially; show all when "View All" is clicked
  const displayedServices = showAll ? servicesCatalog : servicesCatalog.slice(0, 9);

  return (
    <div className="vk-services-user-page">
      <Navbar activeNav="services" />

      {/* SECTION 1: HERO PROMOTIONAL BANNER CAROUSEL (Image-only, Viewport height, 3-sec auto slide) */}
      <section className="vk-services-user-hero" aria-label="Promotional Wedding Showcase">
        <div className="vk-services-user-hero-slides">
          {promoSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`vk-services-user-hero-slide ${index === currentSlide ? 'active' : ''}`}
              aria-hidden={index !== currentSlide}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="vk-services-user-hero-img"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Carousel Arrow Controls */}
        <button
          type="button"
          className="vk-services-user-hero-arrow prev"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <FiChevronLeft />
        </button>
        <button
          type="button"
          className="vk-services-user-hero-arrow next"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <FiChevronRight />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="vk-services-user-hero-dots">
          {promoSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`vk-services-user-hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (4 Visual Steps with Gold Icons) */}
      <section className="vk-services-user-how-section" aria-label="How It Works">
        <div className="vk-services-user-how-container">
          <header className="vk-services-user-how-header">
            <h2 className="vk-services-user-how-title">How It Works</h2>
            <p className="vk-services-user-how-subtitle">
              Book your dream wedding specialists in 4 simple, stress-free steps.
            </p>
          </header>

          <div className="vk-services-user-how-grid">
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="vk-services-user-how-card">
                <div className="vk-services-user-how-icon-wrap">
                  <span className="vk-services-user-how-step-badge">{item.step}</span>
                  <div className="vk-services-user-how-icon">{item.icon}</div>
                </div>
                <h3 className="vk-services-user-how-card-title">{item.title}</h3>
                <p className="vk-services-user-how-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES CATALOG (Horizontal Split Cards: Left Image, Right Text + Book Now Button) */}
      <section className="vk-services-user-catalog-section">
        <div className="vk-services-user-catalog-container">
          <header className="vk-services-user-catalog-header">
            <h2 className="vk-services-user-catalog-title">Services Catalog</h2>
          </header>

          <div className="vk-services-user-grid">
            {displayedServices.map((service) => (
              <div key={service.id} className="vk-services-user-card">
                {/* Left Side: Thumbnail Image */}
                <div className="vk-services-user-card-img-wrap">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="vk-services-user-card-img"
                    loading="lazy"
                  />
                </div>

                {/* Right Side: Service Name, Description & Book Now Button */}
                <div className="vk-services-user-card-body">
                  <h3 className="vk-services-user-card-title" title={service.title}>
                    {service.title}
                  </h3>
                  <p className="vk-services-user-card-desc">{service.description}</p>
                  <div className="vk-services-user-card-action">
                    <button
                      type="button"
                      className="vk-services-user-book-btn"
                      onClick={() => handleBookNow(service.title)}
                    >
                      <FiCalendar className="vk-services-user-book-icon" />
                      <span>Book Now</span>
                    </button>
                    <FiChevronRight className="vk-services-user-chevron" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button (visible initially, hidden when all cards are shown) */}
          {!showAll && (
            <div className="vk-services-user-view-all-wrap">
              <button
                type="button"
                className="vk-services-user-view-all-btn"
                onClick={() => setShowAll(true)}
              >
                <span>View All Services</span>
                <FiChevronDown className="vk-services-user-view-all-icon" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: DEDICATED CONCIERGE CTA BANNER (Direct Contact Info) */}
      <section className="vk-services-user-concierge-section" aria-label="Dedicated Wedding Concierge">
        <div className="vk-services-user-concierge-container">
          <div className="vk-services-user-concierge-card">
            <div className="vk-services-user-concierge-content">
              <h2 className="vk-services-user-concierge-title">
                Planning a Grand Wedding? Talk to Our Concierge
              </h2>
              <p className="vk-services-user-concierge-desc">
                Get personalized vendor recommendations and dedicated guidance for your auspicious celebration.
              </p>

              <div className="vk-services-user-concierge-actions">
                <button
                  type="button"
                  className="vk-services-user-concierge-btn"
                  onClick={() => navigate('/chats')}
                >
                  <BsChatDotsFill />
                  <span>Chat with Concierge</span>
                </button>
              </div>

              {/* Official VK Contact Information */}
              <div className="vk-services-user-concierge-contact">
                <a href="tel:+916369122716" className="vk-services-user-contact-link">
                  <BsTelephoneFill className="vk-services-user-contact-icon" />
                  <span>+91 63691 22716</span>
                </a>
                <span className="vk-services-user-contact-divider">•</span>
                <a href="mailto:vkadmin0211@gmail.com" className="vk-services-user-contact-link">
                  <BsEnvelopeFill className="vk-services-user-contact-icon" />
                  <span>vkadmin0211@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services_User;
