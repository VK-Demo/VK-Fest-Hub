import React, { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Store,
  Edit3,
  Share2,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  Camera,
  Video,
  CalendarDays,
  Building2,
  Check,
  Tag,
  Images,
  ShieldCheck,
  ImagePlus,
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import { getInitials } from "../../utils/storage";
import "./PublicProfile.css";

function PublicProfile() {
  const {
    vendor,
    profile,
    posts,
    services,
    deletePost,
    openModal,
    notify
  } = useVendor();

  const [activeTab, setActiveTab] = useState("posts");

  const businessName = profile?.company || vendor?.company || "Sri Vari Wedding Creations";
  const category = (profile?.categories || vendor?.categories || ["Wedding Decor"])[0];
  const city = profile?.city || "Chennai";
  const address = profile?.address || "Mylapore, Chennai, Tamil Nadu";
  const description =
    profile?.description ||
    "We create beautiful wedding memories with thoughtful details, authentic cultural heritage, and timeless floral artistry.";
  const initials = getInitials(businessName);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    notify("Public profile link copied to clipboard!");
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR BRAND, OUT IN THE WORLD</span>
          <h1>Public Profile</h1>
          <p>This is how couples discover, browse, and book your business on VK Fest Hub.</p>
        </div>

        <button className="btn secondary" onClick={handleShare}>
          <Share2 size={16} /> Share Profile
        </button>
      </div>

      <div className="profile-preview">
        {/* Cover image banner */}
        <div className="profile-cover">
          <div className="cover-overlay">
            <span>VK FEST HUB VERIFIED WEDDING PARTNER</span>
          </div>
        </div>

        {/* Profile header with avatar, info, and actions */}
        <div className="profile-main">
          <div className="profile-avatar">{initials}</div>

          <div className="profile-info">
            <h2>
              {businessName} <ShieldCheck size={18} />
            </h2>
            <p>
              {category} · {city}, Tamil Nadu
            </p>
            <span>
              <MapPin size={14} /> {address}
            </span>
          </div>

          <div className="profile-actions">
            <button
              className="btn secondary"
              onClick={() => openModal("editProfile")}
            >
              <Edit3 size={15} /> Edit Profile
            </button>
            <button
              className="btn secondary"
              onClick={handleShare}
              title="Share"
              aria-label="Share"
            >
              <Share2 size={15} />
            </button>
            <button
              className="icon-btn"
              onClick={() => openModal("profileMore")}
              aria-label="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Bio description */}
        <div className="profile-bio">{description}</div>

        {/* Stats count bar */}
        <div className="profile-counts">
          <span>
            <b>{posts.length}</b> Posts & Media
          </span>
          <span>
            <b>{services.length}</b> Active Packages
          </span>
          {profile?.website && (
            <span>
              <a href={profile.website} target="_blank" rel="noreferrer">
                <b>Website ↗</b>
              </a>
            </span>
          )}
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          <span
            className={activeTab === "posts" ? "selected" : ""}
            onClick={() => setActiveTab("posts")}
          >
            <Images size={16} /> POSTS & GALLERY
          </span>
          <span
            className={activeTab === "reels" ? "selected" : ""}
            onClick={() => setActiveTab("reels")}
          >
            <Video size={16} /> REELS & FILMS
          </span>
          <span
            className={activeTab === "tagged" ? "selected" : ""}
            onClick={() => setActiveTab("tagged")}
          >
            <Tag size={16} /> COUPLE STORIES
          </span>
        </div>

        {/* Post Grid */}
        <div className="post-grid">
          <button
            className="add-post-tile"
            onClick={() => openModal("addPost")}
          >
            <ImagePlus size={28} />
            <b>Share your latest work</b>
            <small>Upload wedding photos or reels</small>
          </button>

          {posts.map((post) => (
            <div className="post-tile" key={post.id}>
              {post.src ? (
                post.type === "video" ? (
                  <video src={post.src} />
                ) : (
                  <img src={post.src} alt={post.caption} />
                )
              ) : (
                <div className="post-placeholder">
                  <Camera size={32} />
                </div>
              )}
              <div className="post-hover">
                <span>{post.caption}</span>
                <button
                  onClick={() => deletePost(post.id)}
                  title="Delete post"
                  aria-label="Delete post"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const SAMPLE_PROJECTS = [
  { id: "sample-1", title: "Kapaleeshwarar Temple Traditional Mandapam", category: "Temple Decor", artClass: "art-1" },
  { id: "sample-2", title: "ITC Grand Chola Luxury Floral Chandelier", category: "Floral Design", artClass: "art-2" },
  { id: "sample-3", title: "Mahabalipuram Beachside Muhurtham Canopy", category: "Outdoor Setup", artClass: "art-3" },
  { id: "sample-4", title: "Chettinad Brass Urli & Jasmine Walkway", category: "Traditional Art", artClass: "art-1" },
  { id: "sample-5", title: "Royal Golden Lotus Stage at Leela Palace", category: "Reception Stage", artClass: "art-2" },
  { id: "sample-6", title: "Contemporary Fairy Light Kinetic Wall", category: "Lighting", artClass: "art-3" },
  { id: "sample-7", title: "Madurai Malligai & Sevvanthi Backdrop", category: "Muhurtham Floral", artClass: "art-1" },
  { id: "sample-8", title: "Bridal Entry Floral Archway & Bells", category: "Entrance Styling", artClass: "art-2" }
];

export default PublicProfile;
export { PublicProfile };
