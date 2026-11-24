/* ==========================================================================
   VK FEST HUB - VENDOR STORAGE & CONSTANTS UTILITY
   ========================================================================== */

export const STORAGE_KEY = "vk_vendor_portal_v1";

export const CATEGORIES = [
  "Bakery & Sweets",
  "Banana Leaf, Buffet & Plates",
  "Banners & Printing",
  "Beeda Stall",
  "Birthday Halls",
  "Bouquet",
  "Boutique & Tailoring",
  "Bridal & Groom Clothing",
  "Bridal & Groom Makeup",
  "Car Show & Vehicle Display",
  "Catering Services",
  "Ceremonial Trays (Seeru Thattu)",
  "Children's Entertainment & Toy Show",
  "Coconut and Coconut Tree",
  "Dancing & Choreography",
  "DJ & Sound Systems",
  "Drums & Chenda Melam",
  "Event Management & Planning",
  "Flowers & Floral Decoration",
  "Fruit Stall & Fruit Carving",
  "Furniture & Rentals",
  "Gifts & Return Gifts",
  "Hair Cut And Hair Stylist",
  "Hotels & Guest Accommodation",
  "Ice Cream Stall",
  "Jewellery",
  "Marriage Halls",
  "Mehndi & Henna",
  "Nadaswaram & Thavil",
  "Photography & Videography",
  "Plastic Garland",
  "Priests & Rituals",
  "Real Flower Garlands",
  "Saree Draping & Styling",
  "Serial & Decorative Lighting",
  "Singing & Orchestra",
  "Skin Care & Facial",
  "Stage Decoration",
  "Tent, Chairs, Vessels & Event Rentals",
  "Travel (Bus & Car)",
  "Water Supply",
  "Wedding Cakes",
  "Wedding Cars",
  "Wedding Invitations"
];

export const CATEGORY_SERVICE_PRESETS = {
  "Photography & Videography": [
    { id: "candid_photo", label: "Candid Wedding Photography", desc: "Artistic, unposed emotional moments & couple portraits", defaultPhotos: "300+", defaultVideos: "1", defaultPrice: "₹XXXX" },
    { id: "traditional_photo_video", label: "Traditional Photography & HD Videography", desc: "Complete stage coverage, family groups & muhurtham rituals", defaultPhotos: "500+", defaultVideos: "2", defaultPrice: "₹XXXX" },
    { id: "cinematic_teaser", label: "Cinematic 4K Wedding Teaser & Film", desc: "4K cinematic teaser, highlight trailer & full documentary film", defaultPhotos: "150+", defaultVideos: "2", defaultPrice: "₹XXXX" },
    { id: "pre_post_wedding", label: "Pre-Wedding & Post-Wedding Couple Shoot", desc: "Scenic outdoor couple shoots with creative concepts", defaultPhotos: "100+", defaultVideos: "1", defaultPrice: "₹XXXX" },
    { id: "drone_cinematography", label: "Drone Aerial 4K Cinematography", desc: "Grand venue aerial perspectives & entrance procession drone coverage", defaultPhotos: "50+", defaultVideos: "1", defaultPrice: "₹XXXX" },
    { id: "photobook_album", label: "Premium Flush-Mount Leather Photobook", desc: "Handcrafted Italian leather & silk albums with waterproof UV coating", defaultPhotos: "200 Sheets", defaultVideos: "0", defaultPrice: "₹XXXX" },
    { id: "live_streaming", label: "Live Web Streaming & LED Display Wall", desc: "Multi-camera live broadcast for overseas relatives & mandap screens", defaultPhotos: "0", defaultVideos: "Live Stream", defaultPrice: "₹XXXX" },
    { id: "events_coverage", label: "Haldi, Mehndi & Sangeet Coverage", desc: "Candid fun captures of festive family pre-wedding celebrations", defaultPhotos: "250+", defaultVideos: "1", defaultPrice: "₹XXXX" },
    { id: "photo_booth", label: "Instant Photo Booth & Magnet Prints", desc: "Fun guest photo counter with custom frame props & instant prints", defaultPhotos: "Unlimited Prints", defaultVideos: "0", defaultPrice: "₹XXXX" }
  ],
  "Stage Decoration": [
    { id: "temple_mandap", label: "Traditional Muhurtham Mandapam", desc: "Carved wooden pillars, brass vilakku & auspicious thoranam", defaultPhotos: "Mandapam", defaultVideos: "Walkthrough", defaultPrice: "₹XXXX" },
    { id: "floral_backdrop", label: "Exotic Fresh Floral Backdrops", desc: "Imported orchids, fragrant Madurai jasmine & lotus installations", defaultPhotos: "Stage", defaultVideos: "Timelapase", defaultPrice: "₹XXXX" },
    { id: "led_modern_stage", label: "Contemporary LED Ambient Staging", desc: "Geometric crystal arches, ambient chandeliers & dynamic stage lighting", defaultPhotos: "LED Arch", defaultVideos: "Lighting Run", defaultPrice: "₹XXXX" },
    { id: "entrance_arch", label: "Grand Royal Entrance Arch", desc: "Auspicious banana trees, floral cascades & welcoming bell arches", defaultPhotos: "Entrance", defaultVideos: "Aerial", defaultPrice: "₹XXXX" }
  ],
  "Catering Services": [
    { id: "banana_leaf_feast", label: "Traditional South Indian Virundhu", desc: "Authentic 24-item pure veg feast served on fresh banana leaves", defaultPhotos: "24 Items", defaultVideos: "Kitchen Prep", defaultPrice: "₹XXXX / plate" },
    { id: "multi_cuisine_buffet", label: "Royal Multi-Cuisine Wedding Buffet", desc: "North Indian, South Indian, Tandoori & Chinese live counters", defaultPhotos: "Live Counter", defaultVideos: "Buffet Setup", defaultPrice: "₹XXXX / plate" },
    { id: "live_chaat_sweets", label: "Live Chaat & Traditional Sweet Counter", desc: "Hot jalebi, kulfi, rasamalai & gourmet dessert stations", defaultPhotos: "Dessert Cart", defaultVideos: "Chef Live", defaultPrice: "₹XXXX / plate" },
    { id: "welcome_drinks", label: "Tender Coconut & Mocktail Bar", desc: "Refreshing tender coconut water, fruit juices & signature coolers", defaultPhotos: "Beverage Bar", defaultVideos: "Drink Prep", defaultPrice: "₹XXXX / plate" }
  ],
  "Bridal & Groom Makeup": [
    { id: "hd_bridal_makeup", label: "HD Bridal Makeup & Hair Styling", desc: "Flawless camera-ready finish with premium cosmetics", defaultPhotos: "Bridal Album", defaultVideos: "Transformation", defaultPrice: "₹XXXX" },
    { id: "airbrush_makeup", label: "Airbrush HD Long-Wear Makeup", desc: "Waterproof, sweat-resistant 18-hour radiant finish", defaultPhotos: "Airbrush Look", defaultVideos: "Prep Video", defaultPrice: "₹XXXX" },
    { id: "saree_draping", label: "Professional Saree Draping & Madisar", desc: "Pin-free crisp pleat alignment & jewelry setting", defaultPhotos: "Pleat Detail", defaultVideos: "Draping Reel", defaultPrice: "₹XXXX" },
    { id: "groom_styling", label: "Groom Grooming & Hair Styling", desc: "Skin prep, beard styling & turban/dhoti alignment", defaultPhotos: "Groom Look", defaultVideos: "Groom Reel", defaultPrice: "₹XXXX" }
  ]
};

export const DEFAULT_PRESETS = [
  { id: "core_service", label: "Primary Event Service Package", desc: "Full wedding day execution and dedicated service staff", defaultPhotos: "Full Setup", defaultVideos: "Event Recap", defaultPrice: "₹XXXX" },
  { id: "premium_materials", label: "Premium Materials & Equipment Setup", desc: "High-grade equipment, commercial infrastructure and materials", defaultPhotos: "Equipment", defaultVideos: "Demo", defaultPrice: "₹XXXX" },
  { id: "on_site_coordination", label: "Dedicated On-Site Coordination", desc: "Supervisor and coordinator present during all wedding rituals", defaultPhotos: "Coordination", defaultVideos: "Live Support", defaultPrice: "₹XXXX" },
  { id: "custom_themes", label: "Customized Wedding Theme Options", desc: "Personalized color schemes and client custom specifications", defaultPhotos: "Theme Catalog", defaultVideos: "Walkthrough", defaultPrice: "₹XXXX" }
];

export const PLANS = [
  {
    name: "Basic",
    price: "₹XXXX",
    rawPrice: "XXXX",
    desc: "For solo professionals offering a single wedding service package",
    features: [
      "Verified business profile listing",
      "Only 1 active service package",
      "Basic enquiry messaging",
      "Calendar date management"
    ]
  },
  {
    name: "Growth",
    price: "₹XXXX",
    rawPrice: "XXXX",
    desc: "For established wedding studios looking to scale multiple packages",
    popular: true,
    features: [
      "Everything in Basic",
      "Multiple service packages (Up to 5)",
      "Portfolio gallery & video showcase",
      "Direct chat with couples",
      "Priority listing in your city",
      "Monthly performance analytics"
    ]
  },
  {
    name: "Premium",
    price: "₹XXXX",
    rawPrice: "XXXX",
    desc: "For high-volume wedding firms & luxury event teams",
    features: [
      "Everything in Growth",
      "Unlimited service packages",
      "Featured #1 position across categories",
      "Dedicated partner relationship manager",
      "Custom branded contract generator",
      "Instant SMS & WhatsApp lead alerts",
      "Zero commission on client bookings"
    ]
  }
];

export const initialSeed = {
  vendor: {
    company: "Sri Vari Wedding Creations",
    owner: "Karthikeyan Natarajan",
    username: "srivari_weddings",
    mobile: "+91 98401 23456",
    email: "contact@srivariweddings.in",
    categories: ["Wedding Stage Decoration"]
  },
  profile: {
    company: "Sri Vari Wedding Creations",
    owner: "Karthikeyan Natarajan",
    categories: ["Wedding Stage Decoration"],
    city: "Chennai",
    address: "No. 42, North Mada Street, Mylapore, Chennai, Tamil Nadu 600004",
    experience: "12",
    website: "https://srivariweddings.in",
    instagram: "@srivari_weddings",
    description: "Specialists in traditional South Indian Muhurtham mandapams, fragrant Madurai jasmine & lotus floral styling, royal temple sets, and contemporary wedding ambient lighting across Tamil Nadu."
  },
  services: [
    {
      id: "srv-1",
      name: "Candid Wedding Photography",
      price: "XXXX",
      description: "Artistic, unposed emotional moments & couple portraits with complete muhurtham coverage.",
      photos: "300+",
      videos: "1",
      duration: "Full wedding day"
    }
  ],
  posts: [
    {
      id: 170010001,
      caption: "Temple wedding details at Mylapore Kapaleeshwarar Kalyana Mandapam with fresh golden marigold & tuberose garlands.",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      type: "image",
      date: "2 days ago"
    },
    {
      id: 170010002,
      caption: "Royal lotus mandapam designed for Priya & Karthik's sunrise muhurtham ceremony.",
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      type: "image",
      date: "4 days ago"
    },
    {
      id: 170010003,
      caption: "Candid smiles under our custom brass bell entrance arch at ITC Grand Chola.",
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
      type: "image",
      date: "1 week ago"
    }
  ],
  enquiries: [
    {
      id: "ENQ-8901",
      name: "Priya & Karthik Ramanathan",
      initial: "P",
      time: "15 mins ago",
      status: "New",
      service: "Traditional Muhurtham Mandapam & Floral Decor",
      date: "14 Nov 2026",
      timeSlot: "6:00 AM – 7:30 AM",
      venue: "Sri Vari Kalyana Mandapam, T. Nagar, Chennai",
      budget: "₹XXXX",
      guests: "600 Guests",
      note: "Hello, we loved your temple mandapam setup! Looking for a similar design with fresh jasmine and lotus flowers for our wedding in November."
    },
    {
      id: "ENQ-8897",
      name: "Ananya & Vivek",
      initial: "A",
      time: "2 hours ago",
      status: "In Discussion",
      service: "Wedding Photography & Cinematic Film",
      date: "21 Nov 2026",
      timeSlot: "Full day",
      venue: "Mahabalipuram, Chennai",
      budget: "₹XXXX",
      guests: "350 Guests",
      note: "Please share your candid photography packages and sample albums."
    },
    {
      id: "ENQ-8872",
      name: "Meera & Arjun",
      initial: "M",
      time: "Yesterday",
      status: "Confirmed",
      service: "Engagement Photography & Backdrop",
      date: "28 Nov 2026",
      timeSlot: "6:00 PM – 10:00 PM",
      venue: "ITC Grand Chola, Chennai",
      budget: "₹XXXX",
      guests: "250 Guests",
      note: "We would like to confirm the engagement coverage and backdrop decoration."
    },
    {
      id: "ENQ-8840",
      name: "Siddharth & Deepika",
      initial: "S",
      time: "3 days ago",
      status: "New",
      service: "Complete Sangeet & Reception Staging",
      date: "05 Dec 2026",
      timeSlot: "7:00 PM – 11:30 PM",
      venue: "Leela Palace, Chennai",
      budget: "₹XXXX",
      guests: "450 Guests",
      note: "Need contemporary lighting and botanical floral walls for our reception stage."
    }
  ],
  reviews: [
    {
      name: "Divya & Sundar",
      rating: 5,
      date: "12 Nov 2026",
      text: "The mandapam was breathtaking! Every guest commented on how fragrant the jasmine and lotus decoration was. Sri Vari team was punctual and made our muhurtham unforgettable."
    },
    {
      name: "Rahul & Sneha",
      rating: 5,
      date: "08 Nov 2026",
      text: "Amazing experience from the first consultation to wedding day execution. Professional, respectful, and delivered beyond our expectations."
    },
    {
      name: "Kavitha Rajagopal",
      rating: 4,
      date: "02 Nov 2026",
      text: "Creative designs and excellent coordination throughout the wedding. The entrance walkway lighting was a huge hit among our guests."
    }
  ],
  subscription: {
    plan: "Growth",
    amount: "₹XXXX",
    cycle: "Monthly",
    status: "Active",
    renewsOn: "20 Dec 2026"
  },
  payment: {
    method: "UPI",
    app: "Google Pay",
    paidAt: "2026-11-20T10:30:00.000Z",
    reference: "VK849201"
  },
  calendarEvents: {
    "2026-11-06": "Booked",
    "2026-11-14": "Booked",
    "2026-11-20": "Auspicious",
    "2026-11-21": "Auspicious",
    "2026-11-28": "Booked",
    "2026-12-05": "Booked",
    "2026-12-12": "Auspicious"
  }
};

export function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialSeed;
    const parsed = JSON.parse(raw);
    const result = { ...initialSeed, ...parsed };
    // If services has legacy 4 preset services from old form, keep only 1 active package unless added manually
    if (Array.isArray(result.services) && result.services.length > 1 && !result.services.some((s) => s.isManual)) {
      result.services = [result.services[0]];
    }
    if (result.subscription) {
      result.subscription.amount = "₹XXXX";
    }
    return result;
  } catch (err) {
    console.error("Error reading from storage:", err);
    return initialSeed;
  }
}

export function saveStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error writing to storage:", err);
  }
}

export function money(n) {
  return "₹XXXX";
}

export function getInitials(name) {
  if (!name) return "VK";
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
