import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/common/Main_Landing_Page.css';
import logoImg from '../../assets/images/common/Logo.jpeg';
import heroBg from '../../assets/images/common/hero_matrimony_services.jpg';
import {
  BsSearch,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsChevronDown,
  BsTelephoneFill,
  BsWhatsapp,
  BsInstagram,
  BsYoutube,
  BsFacebook,
  BsEnvelopeFill,
  BsShieldCheck,
  BsPersonHeart,
  BsPersonCheckFill,
  BsCheckCircleFill,
  BsShop,
  BsStars,
  BsPatchCheckFill,
  BsArrowRight,
  BsCalendarHeartFill,
  BsSliders,
  BsFillHouseHeartFill,
  BsCameraVideoFill,
} from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import {
  GiLinkedRings,
  GiEngagementRing,
  GiDrum,
  GiLotusFlower,
} from 'react-icons/gi';
import {
  FaChampagneGlasses,
  FaBabyCarriage,
  FaCakeCandles,
  FaInfinity,
  FaHandshake,
  FaGem,
  FaGraduationCap,
  FaHandsPraying,
  FaFire,
  FaBriefcase,
  FaMusic,
  FaAward,
  FaUsers,
} from 'react-icons/fa6';
import { MdCrib } from 'react-icons/md';

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
import vendorImg from '../../assets/images/common/Vendor_Team.png';





// Alphabetized Wedding Services Data
const weddingServices = [
  {
    id: 'bakery-sweets',
    title: 'Bakery & Sweets',
    image: imgBakerySweets,
    category: 'Food',
    description: 'Traditional wedding sweets, Ghee Mysore Pak, Paruppu Thengai Koodu, Kai Murukku, and gift packs.',
    highlights: ['Paruppu Thengai Koodu', 'Pure Ghee Sweets & Savories', 'Customized Gift Box Hampers'],
  },
  {
    id: 'banana-leaf-buffet',
    title: 'Banana Leaf, Buffet & Plates',
    image: imgBananaLeaf,
    category: 'Food & Dining',
    description: 'Traditional South Indian banana leaf seating virundhu, luxury buffet arrangements, and ceremonial brass plates.',
    highlights: ['Authentic Banana Leaf Kalyana Virundhu', 'Luxury Buffet Setup', 'Traditional Brass Dining Plates'],
  },
  {
    id: 'banners-printing',
    title: 'Banners & Printing',
    image: imgBanners,
    category: 'Signage & Print',
    description: 'Designer welcome standees, digital LED display boards, and floral wedding signage arches.',
    highlights: ['Custom Couple Portrait Boards', 'LED Backlit Frames', 'Floral Arch Displays'],
  },
  {
    id: 'beeda-stall',
    title: 'Beeda Stall',
    image: imgBeeda,
    category: 'Food & Dining',
    description: 'Traditional royal sweet paan (Beeda) counter with aromatic gulkand, silver foil, dates, and festive flavors for guests.',
    highlights: ['Royal Sweet Meetha Paan', 'Silver-Foiled Special Paan', 'Decorative Live Paan Counter'],
  },
  {
    id: 'birthday-halls',
    title: 'Birthday Halls',
    image: imgBirthdayHalls,
    category: 'Venues',
    description: 'Elegantly decorated AC banquet halls with themed backdrops, lighting, balloon decor, and dining setups for birthdays and family parties.',
    highlights: ['Themed Balloon & LED Decor', 'Banquet Catering & Seating', 'Integrated Sound & Light System'],
  },
  {
    id: 'bouquets',
    title: 'Bouquet',
    image: imgBouquets,
    category: 'Floral & Gifts',
    description: 'Exquisite bridal handheld bouquets, stage greeting bouquets, and luxury floral hampers crafted with fresh roses and exotic blooms.',
    highlights: ['Designer Bridal Bouquets', 'Fresh Exotic Roses & Orchids', 'Satin Ribbon Finishing'],
  },
  {
    id: 'boutique-tailoring',
    title: 'Boutique & Tailoring',
    image: imgBoutique,
    category: 'Fashion',
    description: 'Exclusive bridal silk sarees, designer Aari work blouses, custom stitching, groom sherwanis, and wedding lehengas.',
    highlights: ['Kanchipuram Silk Sarees', 'Custom Aari & Zardosi Blouses', 'Bespoke Tailoring & Alterations'],
  },
  {
    id: 'bridal-groom-clothing',
    title: 'Bridal & Groom Clothing',
    image: imgBridalClothing,
    category: 'Fashion',
    description: 'Royal bridal trousseau, silk dhotis, matching angavastram, sherwanis, turbans, and designer wedding gowns.',
    highlights: ['Bridal Silk Sarees & Lehengas', 'Groom Silk Dhoti & Sherwani Sets', 'Matching Accessories & Stoles'],
  },
  {
    id: 'bridal-groom-makeup',
    title: 'Bridal & Groom Makeup',
    image: imgBridalMakeup,
    category: 'Beauty',
    description: 'Certified bridal HD & airbrush makeup, professional grooming for the groom, and flawless long-lasting looks.',
    highlights: ['HD & Airbrush Waterproof Makeup', 'Groom Grooming & Hair Setting', 'Pre-Bridal Skincare Packages'],
  },
  {
    id: 'car-display',
    title: 'Car Show',
    image: imgCarDisplay,
    category: 'Logistics',
    description: 'Luxury automobile entrance displays, vintage car showcases, and exotic vehicles for photoshoots and guest arrival.',
    highlights: ['Exotic & Vintage Car Fleet', 'Decorated Photo Booth Vehicles', 'VIP Chauffeur Services'],
  },
  {
    id: 'catering',
    title: 'Catering Services',
    image: imgCatering,
    category: 'Food & Dining',
    description: 'Authentic traditional South Indian feast, multi-cuisine gourmet menus, live cooking counters, and hygienic banquet catering.',
    highlights: ['Traditional Kalyana Virundhu', 'Live Tiffin & Sweet Counters', 'Hygienic Catering & Service Staff'],
  },
  {
    id: 'ceremonial-gift-trays',
    title: 'Ceremonial Trays (Seeru Thattu)',
    image: imgCeremonialTrays,
    category: 'Traditional Decor',
    description: 'Artistically decorated traditional South Indian Seeru Thattu gift trays with silk sarees, dry fruits, sweets, coconuts, and auspicious motifs.',
    highlights: ['Custom Designer Seeru Platters', 'Silk Saree & Trousseau Trays', 'Auspicious Brass & Velvet Decor'],
  },
  {
    id: 'children-entertainment',
    title: "Children's Entertainment & Toy Show",
    image: imgToyShow,
    category: 'Entertainment',
    description: 'Engaging toy stalls, bouncy castles, carnival games, caricature artists, balloon sculptors, and kids fun zones.',
    highlights: ['Bouncy Castles & Play Area', 'Live Toy & Game Stalls', 'Balloon Sculpting & Face Painting'],
  },
  {
    id: 'coconut-entrance',
    title: 'Coconut and Coconut Tree',
    image: imgCoconut,
    category: 'Traditional Decor',
    description: 'Auspicious Thoranam, Vaazhai Maram (plantain trees), traditional coconut palm entrance pillars, and sacred mango leaf arches.',
    highlights: ['Traditional Vaazhai Maram & Thoranam', 'Coconut Tree Log Welcome Gateway', 'Sacred Mango Leaves & Floral Arches'],
  },
  {
    id: 'dance-troupe',
    title: 'Dancing',
    image: imgDanceTroupe,
    category: 'Entertainment',
    description: 'Energetic traditional, Bollywood, and fusion dance troupes for sangeet entries, bridal arrivals, and stage entertainment.',
    highlights: ['Sangeet Dance Choreography', 'Celebrity Style Stage Dancers', 'Vibrant Traditional Costumes'],
  },
  {
    id: 'dj-music',
    title: 'DJ',
    image: imgDjMusic,
    category: 'Entertainment',
    description: 'High-energy wedding DJs, concert-grade acoustic sound systems, dynamic intelligent lighting, and sangeet dance tracks.',
    highlights: ['High-Energy DJ & Lighting', 'Line Array Sound Systems', 'Sangeet & Baraat Playlist Curation'],
  },
  {
    id: 'drums-melam',
    title: 'Drums & Chenda Melam',
    image: imgDrums,
    category: 'Traditional Music',
    description: 'Authentic Kerala Chenda Melam, North Indian Punjabi Dhol, and energetic percussion troupes for grand celebratory entries.',
    highlights: ['Authentic Kerala Chenda Melam', 'Punjabi Dhol for Grand Baraat', 'Dynamic Percussion Troupe'],
  },
  {
    id: 'event-management',
    title: 'Event Management',
    image: imgEventManagement,
    category: 'Coordination',
    description: 'End-to-end wedding and event management, hospitality, vendor coordination, on-ground timing supervision, and guest concierge.',
    highlights: ['Full Wedding Coordination', 'Dedicated Event Managers', 'Seamless Vendor Management'],
  },
  {
    id: 'floral-decor',
    title: 'Flowers & Floral Decoration',
    image: imgFloralDecor,
    category: 'Floral',
    description: 'Exotic floral chandeliers, fragrant jasmine strings, fresh rose petal carpets, and opulent venue flower arrangements.',
    highlights: ['Fresh Exotic Flower Arrangements', 'Jasmine & Rose Petal Mandap Decor', 'Fragrant Floral Chandeliers'],
  },
  {
    id: 'fruit-stall',
    title: 'Fruit Stall',
    image: imgFruitStall,
    category: 'Food & Dining',
    description: 'Grand wedding fruit counters with artistic fruit carving, exotic imported fruits, fresh cut fruit salads, and chocolate fountains.',
    highlights: ['Artistic Watermelon & Melon Carving', 'Exotic Cut Fruits Display', 'Hygienic Live Serving Counter'],
  },
  {
    id: 'furniture',
    title: 'Furniture',
    image: imgFurniture,
    category: 'Rentals',
    description: 'Carved royal wooden diwans, wooden swing (Jhula) for Oonjal ceremony, banquet sofas, and VIP stage chairs.',
    highlights: ['Royal Carved Wooden Diwans', 'Traditional Oonjal Swings', 'Gold-Foiled Throne Chairs'],
  },
  {
    id: 'garlands-maalai',
    title: 'Plastic Garland',
    image: imgGarlands,
    category: 'Floral',
    description: 'Fresh rose petal wedding garlands (Maalai), jasmine strands, bridal hair veni, cardamom malai, and welcome flowers.',
    highlights: ['Rose Petal & Jasmine Malai', 'Bridal Floral Veni', 'Cardamom & Designer Garlands'],
  },
  {
    id: 'gifts-return-gifts',
    title: 'Gifts & Return Gifts',
    image: imgGifts,
    category: 'Gifts',
    description: 'Custom wedding return gifts, eco-friendly jute bags, silver coins, dry fruit hampers, and exotic flower bouquets.',
    highlights: ['Tamboolam Bags & Gifts', 'Dry Fruit & Sweet Hampers', 'Personalized Keepsakes'],
  },
  {
    id: 'hair-stylist',
    title: 'Hair Cut And Hair Stylist',
    image: imgHairStylist,
    category: 'Beauty',
    description: 'Bridal traditional plait poola jada, modern reception hairdos, extensions, and custom floral hair setting.',
    highlights: ['Traditional Poola Jada', 'Messy Buns & Braids', 'Hair Setting & Floral Accents'],
  },
  {
    id: 'hotels-accommodation',
    title: 'Hotels & Guest Accommodation',
    image: imgAccommodation,
    category: 'Hospitality',
    description: 'Premium hotel rooms, marriage guest houses, and AC executive suites for wedding guests.',
    highlights: ['AC & Non-AC Rooms', 'Near Marriage Halls', 'Group Booking Discounts'],
  },
  {
    id: 'ice-cream-stall',
    title: 'Ice Cream Stall',
    image: imgIceCreamStall,
    category: 'Live Counters',
    description: 'Exciting live counters: kulfi & rolled ice cream carts, Belgian waffles, candy floss, and fresh fruit dessert stalls.',
    highlights: ['Rolled Ice Cream & Traditional Kulfi', 'Assorted Sundaes & Toppings', 'Hygienic Live Counter Cart'],
  },
  {
    id: 'priests-rituals',
    title: 'Priests & Rituals',
    image: imgPriests,
    category: 'Rituals',
    description: 'Experienced Vedic purohits, Iyers, and Pandits for authentic rituals, muhurtham, and homams.',
    highlights: ['Tamil Brahmin (Iyer) Purohits', 'Telugu, Kannada & Vedic Priests', 'Homa Samagri & Pooja Arrangement'],
  },
  {
    id: 'jewellery',
    title: 'Jewellery',
    image: imgJewellery,
    category: 'Fashion',
    description: '22K antique temple gold jewellery, diamond necklaces, bridal chokers, and imitation rental sets.',
    highlights: ['Antique Temple Haarams', 'Bridal Chokers & Jhumkas', '1 Gram Gold Rental Sets'],
  },
  {
    id: 'marriage-halls',
    title: 'Marriage Halls',
    image: imgVenues,
    category: 'Venues',
    description: 'Grand AC Kalyana Mandapams, luxury marriage halls, open-air wedding lawns, and boutique resort venues.',
    highlights: ['Capacity 200 - 3000 Guests', 'Centralized Air Conditioning', 'Spacious Dining & Valet Parking'],
  },
  {
    id: 'mehndi-henna',
    title: 'Mehndi & Henna',
    image: imgMehendi,
    category: 'Beauty',
    description: 'Intricate bridal henna designs, Marwari, Arabic, portrait mehendi, and organic dark-stain cone sets.',
    highlights: ['Custom Bridal Portrait Art', 'Organic Herbal Henna', 'Guest Mehendi Artists Team'],
  },
  {
    id: 'nadaswaram',
    title: 'Nadaswaram & Thavil',
    image: imgTradMusic,
    category: 'Traditional Music',
    description: 'Renowned Nadaswaram, Thavil and Mangala Vadhyam vidwans for auspicious Muhurtham music.',
    highlights: ['Auspicious Mangala Vadhyam', 'Experienced Temple Vidwans', 'Reception Classical Fusion'],
  },
  {
    id: 'photography-videography',
    title: 'Photography & Videography',
    image: imgPhotography,
    category: 'Media',
    description: 'Candid wedding photography, cinematic 4K video teasers, drone footage, and luxury photobooks.',
    highlights: ['Cinematic 4K Wedding Films', 'Candid Moments & Portraits', 'Drone Aerial Coverage'],
  },
  {
    id: 'real-flower-garlands',
    title: 'Real Flower Garlands',
    image: imgFreshFlowers,
    category: 'Floral',
    description: 'Auspicious fresh Madurai jasmine strings, fragrant rose petals, lotus flowers, and traditional brass urli arrangements for wedding rituals.',
    highlights: ['Fragrant Fresh Jasmine Strings', 'Lotus & Traditional Urli Blooms', '100% Farm-Fresh Natural Flowers'],
  },
  {
    id: 'saree-draping',
    title: 'Saree Draping & Styling',
    image: imgSareeDraping,
    category: 'Fashion & Beauty',
    description: 'Professional bridal saree draping, pin-free pleat alignment, box folding, and traditional Madisar draping.',
    highlights: ['Flawless Bridal Draping', 'Traditional 9-Yards Madisar', 'Pre-Pleating & Iron Box Packing'],
  },
  {
    id: 'serial-lighting',
    title: 'Serial & Decorative Lighting',
    image: imgSerialLighting,
    category: 'Lighting',
    description: 'Brilliant LED serial string lights, tree illumination, grand entrance facade lighting, and ambient fairy lights.',
    highlights: ['LED Serial String Illumination', 'Grand Mandap Facade Lights', 'Pathway & Tree Fairy Glow'],
  },
  {
    id: 'live-singing',
    title: 'Singing',
    image: imgLiveSinging,
    category: 'Entertainment',
    description: 'Talented playback singers, classical vocalists, and live orchestra bands playing devotional hymns, popular melodies, and sangeet tracks.',
    highlights: ['Live Acoustic & Light Music Bands', 'Popular Male & Female Vocalists', 'High-Fidelity Stage Sound'],
  },
  {
    id: 'skincare-facial',
    title: 'Skin Care & Facial',
    image: imgSkincareFacial,
    category: 'Beauty & Wellness',
    description: 'Pre-bridal skincare therapies, HydraFacials, de-tan treatments, glowing gold facials, and skin relaxation packages.',
    highlights: ['HydraFacial & Gold Glow Treatments', 'Pre-Bridal Full Body Polishing', 'Certified Skin Therapists'],
  },
  {
    id: 'stage-decor',
    title: 'Stage Decoration',
    image: imgStageDecor,
    category: 'Decor',
    description: 'Grand royal floral mandaps, reception backdrop themes, crystal lighting, and pathway decor.',
    highlights: ['Traditional Temple Mandaps', 'Theme Reception Stages', 'Fairy Light Illumination'],
  },
  {
    id: 'rentals',
    title: 'Tent, Chairs, Vessels & Event Rentals',
    image: imgRentals,
    category: 'Rentals',
    description: 'German waterproof shamianas, banquet chairs, VIP sofas, and commercial cooking utensils (Pathram).',
    highlights: ['Shamianas & Pandal Setup', 'Banquet Chairs & Covers', 'Large Cooking Vessels (Pathram)'],
  },
  {
    id: 'travel',
    title: 'Travel (Bus & Car)',
    image: imgTravel,
    category: 'Logistics',
    description: 'AC luxury buses, tempo travellers, and sanitized cabs for smooth guest pickup and transit.',
    highlights: ['Luxury Tourist Buses', 'Tempo Travellers (12-24 Seater)', 'Railway & Airport Pickup Cabs'],
  },
  {
    id: 'water-supply',
    title: 'Water Supply',
    image: imgWaterSupply,
    category: 'Essential Supplies',
    description: 'Packaged RO drinking water cans, commercial water tankers for marriage hall facilities, and disposable drinking setups.',
    highlights: ['20L Sealed RO Water Cans', 'Commercial Water Tankers on Demand', 'Eco-Friendly Paper Cups & Dispensers'],
  },
  {
    id: 'wedding-cakes',
    title: 'Wedding Cakes',
    image: imgCakes,
    category: 'Bakery',
    description: 'Custom tiered wedding cakes, personalized floral themes, fondant art, and dessert tables.',
    highlights: ['Multi-Tiered Designer Cakes', 'Eggless & Gourmet Flavors', 'Venue Delivery & Table Setup'],
  },
  {
    id: 'wedding-cars',
    title: 'Wedding Cars',
    image: imgCars,
    category: 'Logistics',
    description: 'Decorated luxury wedding cars, Mercedes, BMW, Audi, vintage classics, and convertible groom entries.',
    highlights: ['Floral Car Decoration Included', 'Chauffeur-Driven Luxury Sedans', 'Vintage Cars for Grand Entry'],
  },
  {
    id: 'wedding-invitations',
    title: 'Wedding Invitations',
    image: imgInvitations,
    category: 'Media & Print',
    description: 'Traditional gold-embossed cards, luxury box hampers, laser-cut scrolls, and animated video invites.',
    highlights: ['Royal Gold-Foil Cards', 'Custom Box Invitations', 'Animated WhatsApp E-Invites'],
  },
];

// Functions & Celebrations Data (18 Occasions - Pure English)
const functionsData = [
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    icon: <FaBabyCarriage />,
    description: 'Traditional glass bangles setup, multi-variety rice banquet feast, floral swing decor & candid photography.',
  },
  {
    id: 'cradle-naming',
    title: 'Cradle & Naming Ceremony',
    icon: <MdCrib />,
    description: 'Auspicious baby cradle floral styling, traditional sweets hampers, grand breakfast catering & photography.',
  },
  {
    id: 'birthday',
    title: 'Birthday Parties',
    icon: <FaCakeCandles />,
    description: 'Themed balloon arches, custom designer cakes, kids entertainment shows, games & celebration catering.',
  },
  {
    id: 'puberty-ceremony',
    title: 'Puberty Ceremony',
    icon: <GiLotusFlower />,
    description: 'Traditional floral arch decor, elegant saree draping, grand celebration banquet feast, ceremonial gift trays & return gifts.',
  },
  {
    id: 'housewarming',
    title: 'Housewarming',
    icon: <BsFillHouseHeartFill />,
    description: 'Sacred house blessing rituals, auspicious floral hangings, traditional morning breakfast banquet & fresh flower decor.',
  },
  {
    id: 'engagement',
    title: 'Engagement',
    icon: <GiEngagementRing />,
    description: 'Sacred ring exchange, customized ceremonial gift platters, elegant floral stage decor & grand family banquet.',
  },
  {
    id: 'marriage',
    title: 'Marriage',
    icon: <GiLinkedRings />,
    description: 'Complete A-to-Z wedding stage & canopy setup, traditional multi-course feast catering, sacred priest rituals & bridal styling.',
  },
  {
    id: 'sangeet-mehendi',
    title: 'Sangeet & Mehendi',
    icon: <GiDrum />,
    description: 'High-energy dance choreography, professional bridal henna art, live sound systems & fairy lights.',
  },
  {
    id: 'reception',
    title: 'Reception',
    icon: <FaChampagneGlasses />,
    description: 'Grand floral stage backdrops, dynamic DJ, live orchestra & royal multi-cuisine buffet dining.',
  },
  {
    id: 'milestone-anniversaries',
    title: 'Milestone Anniversaries',
    icon: <FaInfinity />,
    description: 'Sacred 60th and 80th birthday milestones, wedding vow renewal rituals, grand family banquet feast & live music.',
  },
  {
    id: 'ear-piercing',
    title: 'Ear-Piercing Ceremony',
    icon: <FaGem />,
    description: 'Traditional gold ear-piercing arrangements, ceremonial family gift trays, sweets hampers & celebration lunch feast.',
  },
  {
    id: 'graduation',
    title: 'Graduation',
    icon: <FaGraduationCap />,
    description: 'Academic milestone celebrations, convocation photography, custom designer cakes & celebration dining.',
  },
  {
    id: 'religious-ceremonies',
    title: 'Religious Ceremonies',
    icon: <FaHandsPraying />,
    description: 'Sacred prayer rituals, divine homam arrangements, priest coordination, floral temple decor & feast catering.',
  },
  {
    id: 'festival-celebrations',
    title: 'Festival Celebrations',
    icon: <FaFire />,
    description: 'Grand festive lighting, seasonal special sweets & food catering, traditional welcome decor & cultural music.',
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    icon: <FaBriefcase />,
    description: 'Professional stage and audio-visual setups, keynote sound systems, corporate banquet dining & professional event hosts.',
  },
  {
    id: 'cultural-programs',
    title: 'Cultural Programs',
    icon: <FaMusic />,
    description: 'Classical dance and music stage decor, acoustic sound engineering, artistic lighting, green rooms & event refreshments.',
  },
  {
    id: 'farewell-functions',
    title: 'Farewell Functions',
    icon: <FaAward />,
    description: 'Honoring career milestones and lifetime achievements, felicitation mementos, memory slideshows & banquet lunch.',
  },
  {
    id: 'get-together',
    title: 'Get-Together',
    icon: <FaUsers />,
    description: 'Private party lawn rentals, barbecue and buffet counters, interactive games, acoustic live music & candid photography.',
  },
];

// How It Works Steps Data (6-Step Complete Journey)
const stepsData = [
  {
    number: '01',
    icon: <BsPersonCheckFill className="vk-step-icon" />,
    title: 'Create Verified Profile',
    description: 'Register with authentic family details, verified photos, and birth chart. Enjoy 100% privacy control and verified trust badges.',
  },
  {
    number: '02',
    icon: <GiLinkedRings className="vk-step-icon" />,
    title: 'Connect',
    description: 'Filter thousands of prospective brides and grooms by community, education, and profession with instant 10-Porutham horoscope compatibility.',
  },
  {
    number: '03',
    icon: <FaHandshake className="vk-step-icon" />,
    title: 'Direct Family Meetings',
    description: 'Express mutual interest, exchange horoscopes, and initiate respectful family conversations directly without middlemen or hidden charges.',
  },
  {
    number: '04',
    icon: <BsShop className="vk-step-icon" />,
    title: 'Explore Services',
    description: 'Browse certified marriage halls, luxury stage decorators, traditional virundhu caterers, bridal makeup artists, nadaswaram, and photographers.',
  },
  {
    number: '05',
    icon: <BsCameraVideoFill className="vk-step-icon" />,
    title: 'Compare Work & Packages',
    description: 'Watch authentic short video reels and photo portfolios of real weddings. Compare transparent pricing and tailor packages to your budget.',
  },
  {
    number: '06',
    icon: <FaChampagneGlasses className="vk-step-icon" />,
    title: 'Celebrate Stress-Free',
    description: 'Relax and cherish every sacred ritual with your family while our dedicated coordinators oversee vendor timelines for a seamless muhurtham.',
  },
];

// FAQ Accordion Data
const faqsData = [
  {
    question: 'How does VK Fest Hub authenticate matrimony profiles?',
    answer: 'Every matrimony profile undergoes a thorough 3-step screening process: Government ID validation (Aadhaar/Passport), mobile OTP authentication, and personal family background checks before profiles become active.',
  },
  {
    question: 'Can I book individual services or only complete packages?',
    answer: 'You have complete freedom. You can book a single service (such as Catering, Photography, or Bridal Makeup) or mix-and-match multiple services into a customized wedding package with exclusive bundle savings.',
  },
  {
    question: 'How do I request a quote or connect with wedding vendors?',
    answer: 'Simply browse any service category and submit your event date and location. Our team immediately connects you directly with top-rated vendors who provide custom quotes tailored to your budget.',
  },
  {
    question: 'Can services be customized according to our family traditions?',
    answer: 'Yes, absolutely. Every service — from traditional catering menus and ritual priests to floral themes and stage backdrops — can be customized to match your community rituals and specific cultural preferences.',
  },
  {
    question: 'Do you organize non-wedding events like Baby Showers or Housewarmings?',
    answer: 'Yes! We handle all family celebrations—including Baby Showers (Valakaapu), Cradle & Naming Ceremonies, Housewarmings (Grahapravesham), Birthday Parties, and 60th/80th Milestone Anniversaries.',
  },
];

const Main_Landing_Page = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Wedding Services View All / Collapse State
  const [showAllServices, setShowAllServices] = useState(false);

  // Occasions View All / Collapse State
  const [showAllOccasions, setShowAllOccasions] = useState(false);

  // Matrimony Match Finder States
  const [finderGender, setFinderGender] = useState('bride');
  const [finderAgeFrom, setFinderAgeFrom] = useState('21');
  const [finderAgeTo, setFinderAgeTo] = useState('28');
  const [finderMotherTongue, setFinderMotherTongue] = useState('Any');
  const [finderCommunity, setFinderCommunity] = useState('Any');
  const [finderLocation, setFinderLocation] = useState('Any');

  // Ensure the page always starts at the top on mount/refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(0);

  // Navbar scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  // Smooth scroll handler
  const scrollToSection = (sectionId, e) => {
    if (e) e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="vk-home-page">
      {/* =========================================================================
          NAVBAR COMPONENT (WITH INTEGRATED SEARCH & MOBILE SEARCH POPUP)
          ========================================================================= */}
      <header className={`vk-navbar ${isScrolled ? 'vk-navbar-scrolled' : ''}`}>
        <div className="vk-nav-container">
          {/* Left Spacer for Optical & Mathematical Center Alignment */}
          <div className="vk-nav-spacer" aria-hidden="true" />

          {/* Brand Logo & Title (Centered) */}
          <a href="#/" className="vk-brand">
            <img src={logoImg} alt="VK Fest Hub Logo" className="vk-brand-logo" />
            <div className="vk-brand-text">
              <span className="vk-brand-title">VK Fest Hub</span>
              <span className="vk-brand-tagline">Complete A to Z Services</span>
            </div>
          </a>

          {/* Utilities & CTA Actions (Right Side Corner) */}
          <div className="vk-nav-actions">
            <a
              href="#/login"
              className="vk-btn-primary"
            >
              <span>Login / Sign Up</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            DEDICATED SEARCH STRIP (BELOW NAVBAR - MATCHES UPLOADED REFERENCE)
            Visible across both Desktop and Mobile viewports
            ========================================================================= */}
        <div className="vk-subnav-search-strip">
          <div className="vk-subnav-search-container">
            <form className="vk-subnav-search-form" onSubmit={handleSearchSubmit}>
              <div className="vk-subnav-search-pill">
                <BsSearch className="vk-subnav-search-icon" />
                <input
                  type="text"
                  className="vk-subnav-search-input"
                  placeholder="Search for Matrimony or Services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search for Matrimony or Services"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="vk-subnav-search-clear"
                    onClick={() => setSearchQuery('')}
                    title="Clear text"
                    aria-label="Clear search query"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION (MATCHING MATRIMONY LANDING PAGE STYLE WITH MATRIMONY & SERVICES CONTENT)
          ========================================================================= */}
      <section
        className="vk-hero-section"
        style={{ backgroundImage: `url("${heroBg}")` }}
        aria-label="VK Fest Hub - Matrimony & Event Services"
      >
        <div className="vk-hero-overlay" />
        <div className="vk-hero-container">
          <div className="vk-hero-content">
            {/* Trust Pill / Badge */}
            <div className="vk-hero-badge">
              <BsStars style={{ color: '#dfb76c' }} />
              <span>VK Fest Hub • Unified Portal for Couples & Wedding Vendors</span>
            </div>

            {/* Main Headline */}
            <h1 className="vk-hero-title">
              Where Sacred Alliances Meet Grand Celebrations & Trusted Vendors
            </h1>

            {/* Subtitle with Matrimony, Services & Vendor Focus */}
            <p className="vk-hero-subtitle">
              Discover verified matrimonial matches and book 40+ premier wedding services, or register as a certified vendor to showcase your business to thousands of couples.
            </p>

            {/* Call to Actions - One for User, One for Vendor */}
            <div className="vk-hero-actions">
              <button
                type="button"
                className="vk-hero-btn-primary"
                onClick={() => navigate('/login-user')}
              >
                <BsPersonHeart />
                <span>User Login</span>
                <BsArrowRight />
              </button>
              <button
                type="button"
                className="vk-hero-btn-secondary"
                onClick={() => navigate('/login-vendor')}
              >
                <BsShop />
                <span>Vendor Login</span>
                <BsArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Container */}
      <main className="vk-main-content">
        {/* =========================================================================
            WEDDING SERVICES SECTION (ALPHABETICAL ORDER)
            Initial: 10 services in 2 rows. "View All" expands, "Collapse" reverts.
            ========================================================================= */}
        <section id="services" className="vk-services-section">
          <div className="vk-services-container">
            {/* Section Header Bar: Title to the left, View All button to the right */}
            <div className="vk-services-header-bar">
              <div className="vk-services-ribbon-title">
                <h2 className="vk-services-title-text">Services</h2>
              </div>
              {!showAllServices && (
                <button
                  type="button"
                  className="vk-services-view-all-btn"
                  onClick={() => setShowAllServices(true)}
                  aria-label="View all services"
                >
                  <span>View All</span>
                  <BsChevronRight className="vk-view-all-icon" />
                </button>
              )}
            </div>

            {/* Services Grid: 5 cols x 2 rows = 10 items initially */}
            <div className="vk-services-grid">
              {(showAllServices ? weddingServices : weddingServices.slice(0, 10)).map((service) => (
                <div
                  key={service.id}
                  className="vk-service-card"
                >
                  {/* Top: Related Image (Non-clickable) */}
                  <div className="vk-service-img-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="vk-service-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom: Only the Title pill is an interactive link */}
                  <a
                    href="#/login"
                    className="vk-service-info vk-service-info-link"
                    title={`Explore ${service.title}`}
                  >
                    <h3 className="vk-service-name">{service.title}</h3>
                  </a>
                </div>
              ))}
            </div>

            {/* Centered View All button below the 10 services cards */}
            {!showAllServices && (
              <div className="vk-services-bottom-action">
                <button
                  type="button"
                  className="vk-services-view-all-bottom-btn"
                  onClick={() => setShowAllServices(true)}
                  aria-label="View all services"
                >
                  <span>View All Services</span>
                  <BsChevronRight className="vk-view-all-icon" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            FUNCTIONS & CELEBRATIONS SECTION
            ========================================================================= */}
        <section id="occasions" className="vk-functions-section" aria-label="Functions and Occasions We Cover">
          <div className="vk-functions-container">
            <div className="vk-functions-header">
              <span className="vk-functions-pill">
                <BsStars /> Occasions Covered
              </span>
              <h2 className="vk-functions-title">All Your Family Celebrations Under One Roof</h2>
              <p className="vk-functions-subtitle">
                Explore all the auspicious functions and life events managed seamlessly by VK Fest Hub.
              </p>
            </div>

            <div className="vk-functions-grid">
              {(showAllOccasions ? functionsData : functionsData.slice(0, 10)).map((item) => (
                <div key={item.id} className="vk-function-card">
                  <div className="vk-function-icon-wrap">
                    {item.icon}
                  </div>
                  <h3 className="vk-function-title">{item.title}</h3>
                  <p className="vk-function-desc">{item.description}</p>
                </div>
              ))}
            </div>

            {/* View All Occasions Button */}
            <div className="vk-functions-bottom-action">
              <button
                type="button"
                className="vk-functions-view-all-btn"
                onClick={() => setShowAllOccasions(!showAllOccasions)}
                aria-label={showAllOccasions ? "Show fewer occasions" : "View all occasions"}
              >
                <span>{showAllOccasions ? 'Show Less' : 'View All Occasions'}</span>
                {showAllOccasions ? (
                  <BsChevronUp className="vk-view-all-icon" />
                ) : (
                  <BsChevronDown className="vk-view-all-icon" />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: QUICK MATRIMONY MATCH FINDER WIDGET
            ========================================================================= */}
        <section id="matrimony" className="vk-finder-section">
          <div className="vk-finder-container">
            <div className="vk-finder-card">
              <div className="vk-finder-header">
                <div className="vk-finder-title-group">
                  <span className="vk-finder-pill">
                    <BsPersonHeart /> Matrimony Search
                  </span>
                  <h2 className="vk-finder-title">Find Your Ideal Life Partner</h2>
                  <p className="vk-finder-subtitle">
                    Search thousands of profiles by mother tongue, community, age, and location.
                  </p>
                </div>
                <div className="vk-gender-toggle" role="group" aria-label="Looking for">
                  <button
                    type="button"
                    className={`vk-gender-btn ${finderGender === 'bride' ? 'active' : ''}`}
                    onClick={() => setFinderGender('bride')}
                  >
                    Looking for a Bride
                  </button>
                  <button
                    type="button"
                    className={`vk-gender-btn ${finderGender === 'groom' ? 'active' : ''}`}
                    onClick={() => setFinderGender('groom')}
                  >
                    Looking for a Groom
                  </button>
                </div>
              </div>

              <form
                className="vk-finder-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Ready for future matrimony search results page routing
                }}
              >
                <div className="vk-finder-grid">
                  <div className="vk-finder-field">
                    <label className="vk-field-label">Age From</label>
                    <select
                      value={finderAgeFrom}
                      onChange={(e) => setFinderAgeFrom(e.target.value)}
                      className="vk-field-select"
                    >
                      {[18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 35].map((age) => (
                        <option key={age} value={age}>{age} Years</option>
                      ))}
                    </select>
                  </div>

                  <div className="vk-finder-field">
                    <label className="vk-field-label">Age To</label>
                    <select
                      value={finderAgeTo}
                      onChange={(e) => setFinderAgeTo(e.target.value)}
                      className="vk-field-select"
                    >
                      {[22, 24, 26, 28, 30, 32, 35, 40, 45, 50].map((age) => (
                        <option key={age} value={age}>{age} Years</option>
                      ))}
                    </select>
                  </div>

                  <div className="vk-finder-field">
                    <label className="vk-field-label">Mother Tongue</label>
                    <select
                      value={finderMotherTongue}
                      onChange={(e) => setFinderMotherTongue(e.target.value)}
                      className="vk-field-select"
                    >
                      <option value="Any">All Mother Tongues</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Odia">Odia</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Marwari">Marwari</option>
                      <option value="Other">Other Languages</option>
                    </select>
                  </div>

                  <div className="vk-finder-field">
                    <label className="vk-field-label">Community / Caste</label>
                    <select
                      value={finderCommunity}
                      onChange={(e) => setFinderCommunity(e.target.value)}
                      className="vk-field-select"
                    >
                      <option value="Any">All Communities</option>
                      <option value="Brahmin">Brahmin (Iyer / Iyengar)</option>
                      <option value="Mudaliar">Mudaliar / Pillai</option>
                      <option value="Chettiar">Chettiar</option>
                      <option value="Nadar">Nadar</option>
                      <option value="Vanniyar">Vanniyar</option>
                      <option value="Naidu">Naidu</option>
                      <option value="Gounder">Gounder</option>
                      <option value="Reddy">Reddy</option>
                      <option value="Other">Other Communities</option>
                    </select>
                  </div>

                  <div className="vk-finder-field">
                    <label className="vk-field-label">Location / State</label>
                    <select
                      value={finderLocation}
                      onChange={(e) => setFinderLocation(e.target.value)}
                      className="vk-field-select"
                    >
                      <option value="Any">All India</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">New Delhi</option>
                    </select>
                  </div>
                </div>

                {/* Advanced Search Filter Option */}
                <div className="vk-finder-footer">
                  <div className="vk-finder-footer-hint">
                    <span className="vk-finder-hint-dot">✦</span>
                    <span>Looking for specific criteria like Education, Occupation, Star & Dosham?</span>
                  </div>
                  <a
                    href="#/login"
                    className="vk-finder-advanced-btn"
                    title="For Advanced Search Visit Matrimony Page"
                  >
                    <BsSliders className="vk-finder-advanced-icon" />
                    <span>For Advanced Search Visit Matrimony Page</span>
                    <BsArrowRight className="vk-finder-arrow-icon" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: HOW IT WORKS (3-STEP PROCESS)
            ========================================================================= */}
        <section id="how-it-works" className="vk-steps-section">
          <div className="vk-steps-container">
            <div className="vk-steps-header">
              <h2 className="vk-steps-title">How VK Fest Hub Works</h2>
              <p className="vk-steps-subtitle">
                Your seamless journey from discovering your life partner to orchestrating an unforgettable wedding celebration.
              </p>
            </div>

            <div className="vk-steps-grid">
              {stepsData.map((step) => (
                <div key={step.number} className="vk-step-card">
                  <div className="vk-step-top">
                    <span className="vk-step-number">{step.number}</span>
                    <div className="vk-step-icon-wrap">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="vk-step-card-title">{step.title}</h3>
                  <p className="vk-step-card-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VENDOR & VENUE PARTNER REGISTRATION BANNER
            ========================================================================= */}
        <section id="vendor-partner" className="vk-vendor-section">
          <div className="vk-vendor-container">
            <div className="vk-vendor-card">
              <div className="vk-vendor-content">
                <div className="vk-vendor-badge-wrap">
                  <span className="vk-vendor-badge">
                    <BsPatchCheckFill /> Vendor & Venue Partnership
                  </span>
                </div>
                <h2 className="vk-vendor-title">Are You a Wedding Vendor?</h2>
                <p className="vk-vendor-desc">
                  Partner with VK Fest Hub to connect with thousands of families planning their weddings across India. Grow your bookings with direct customer inquiries.
                </p>

                <div className="vk-vendor-perks">
                  <div className="vk-vendor-perk-item">
                    <BsCheckCircleFill className="vk-perk-icon" />
                    <span>Direct Qualified Customer Inquiries</span>
                  </div>
                  <div className="vk-vendor-perk-item">
                    <BsCheckCircleFill className="vk-perk-icon" />
                    <span>Guaranteed Timely Milestone Payments</span>
                  </div>
                </div>

                <div className="vk-vendor-actions">
                  <a href="#/login" className="vk-vendor-register-btn">
                    <span>Register as a Vendor</span>
                    <BsArrowRight className="vk-btn-arrow" />
                  </a>
                  <span className="vk-vendor-contact-note">
                    or Call Vendor Support: <strong>+91 63691 22716</strong>
                  </span>
                </div>
              </div>

              <div className="vk-vendor-image-wrap">
                <img
                  src={vendorImg}
                  alt="VK Fest Hub Wedding Vendors Team"
                  className="vk-vendor-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
            ========================================================================= */}
        <section id="faq" className="vk-faq-section">
          <div className="vk-faq-container">
            <div className="vk-faq-header">
              <span className="vk-faq-pill">
                <BsStars /> Got Questions?
              </span>
              <h2 className="vk-faq-title">Frequently Asked Questions</h2>
            </div>

            <div className="vk-faq-list">
              {faqsData.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} className={`vk-faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="vk-faq-question-btn"
                      onClick={() => setActiveFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="vk-faq-question-text">{faq.question}</span>
                      <span className="vk-faq-chevron-wrap">
                        {isOpen ? (
                          <BsChevronUp className="vk-faq-chevron" />
                        ) : (
                          <BsChevronDown className="vk-faq-chevron" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="vk-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          ASSISTANCE CTA CARD (SEPARATE STANDALONE CARD ABOVE FOOTER)
          ========================================================================= */}
      <section className="vk-assistance-card-section">
        <div className="vk-assistance-card">
          <div className="vk-assistance-text">
            <h3 className="vk-assistance-title">Planning a Wedding or Looking for Matrimony Assistance?</h3>
            <p className="vk-assistance-desc">Connect directly with our dedicated wedding coordinators and matrimony advisors.</p>
          </div>
          <div className="vk-assistance-actions">
            <a href="tel:+916369122716" className="vk-assistance-pill" title="Call Us Directly">
              <BsTelephoneFill className="vk-assistance-pill-icon" />
              <span>+91 63691 22716</span>
            </a>
            <a href="mailto:vkadmin0211@gmail.com" className="vk-assistance-pill" title="Send Us an Email">
              <BsEnvelopeFill className="vk-assistance-pill-icon" />
              <span>vkadmin0211@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER COMPONENT
          ========================================================================= */}
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
                  Empowering families across India to discover ideal life partners and orchestrate unforgettable wedding celebrations with trusted local vendors.
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
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="vk-social-link">
                    <BsWhatsapp />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="vk-social-link">
                    <BsInstagram />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="vk-social-link">
                    <BsYoutube />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="vk-social-link">
                    <BsFacebook />
                  </a>
                </div>
              </div>

              {/* Column 2: Popular Services */}
              <div className="vk-footer-col">
                <h4 className="vk-footer-heading">Services</h4>
                <ul className="vk-footer-links">
                  <li><a href="#/login">Marriage Halls</a></li>
                  <li><a href="#/login">Catering Services</a></li>
                  <li><a href="#/login">Photography & Videography</a></li>
                  <li><a href="#/login">Stage Decoration</a></li>
                  <li>
                    <a href="#/login" className="vk-footer-highlight-link">
                      View All Services <BsChevronRight className="vk-link-arrow" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Matrimony & Matchmaking */}
              <div className="vk-footer-col">
                <h4 className="vk-footer-heading">Matrimony</h4>
                <ul className="vk-footer-links">
                  <li><a href="#/login">Find Brides</a></li>
                  <li><a href="#/login">Find Grooms</a></li>
                  <li><a href="#/login">Horoscope Matching</a></li>
                  <li><a href="#/login">Membership Plans</a></li>
                </ul>
              </div>

              {/* Column 4: Quick Links & Support */}
              <div className="vk-footer-col">
                <h4 className="vk-footer-heading">Company & Help</h4>
                <ul className="vk-footer-links">
                  <li><a href="#home">About Us</a></li>
                  <li><a href="#home">How It Works</a></li>
                  <li><a href="#/login" className="vk-footer-vendor-cta">Register as a Vendor</a></li>
                  <li><a href="#faq">Customer Support & FAQs</a></li>
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
    </div>
  );
};

export default Main_Landing_Page;

