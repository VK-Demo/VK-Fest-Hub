import React, { useState, useEffect, useRef } from 'react';
import '../../style/users/Photos_Videos.css';
import Navbar from './Navbar';
import Footer from './Footer';

import {
  BsImages,
  BsChatDots,
  BsChatDotsFill,
  BsHeart,
  BsHeartFill,
  BsGeoAltFill,
  BsPatchCheckFill,
  BsArrowRight,
  BsVolumeUpFill,
  BsVolumeMuteFill,
  BsPlayFill,
  BsCameraVideoFill,
  BsSendFill,
  BsWhatsapp,
  BsCheckCircleFill,
} from 'react-icons/bs';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';

// Wedding Services Images
import imgStageDecor from '../../assets/images/wedding_services/Stage Decoration.jpg';
import imgPhotography from '../../assets/images/wedding_services/Photography & Videography.jpg';
import imgBridalMakeup from '../../assets/images/wedding_services/Bridal & Groom Makeup.jpg';
import imgCatering from '../../assets/images/wedding_services/Catering Services.jpg';
import imgCars from '../../assets/images/wedding_services/Wedding Cars (Groom & Bride).jpg';
import imgFlowers from '../../assets/images/wedding_services/Fresh Natural Flowers.jpg';
import imgDance from '../../assets/images/wedding_services/Dance Troupe & Choreography.jpg';
import imgTrays from '../../assets/images/wedding_services/Ceremonial Gift Trays.jpg';

// Initial Feed Data: 8 items (2 rows of 4 on laptop, 1 per row on mobile)
const initialReelsData = [
  {
    id: 'reel-1',
    type: 'photo',
    mediaUrl: imgStageDecor,
    category: 'Stage Decoration',
    title: 'Grand Royal Floral Mandap & Entrance Arch Setup',
    vendorName: 'Sri Lakshmi Kalyana Decorators',
    vendorLocation: 'T. Nagar, Chennai',
    likes: 1248,
    sharesCount: 78,
    commentsList: [
      { id: 1, user: 'Ananya S.', text: 'The floral arrangement looks breathtaking! So majestic.', time: '2h ago' },
      { id: 2, user: 'Karthik Raja', text: 'Can this setup be customized for an outdoor lawn wedding?', time: '4h ago' },
    ],
  },
  {
    id: 'reel-2',
    type: 'photo',
    mediaUrl: imgPhotography,
    category: 'Photography & Videography',
    title: 'Candid Muhurtham Moments & 4K Cinematic Highlights',
    vendorName: 'Vivah Moments Studio',
    vendorLocation: 'Alwarpet, Chennai',
    likes: 984,
    sharesCount: 45,
    commentsList: [
      { id: 1, user: 'Divya M.', text: 'Captured every traditional emotion so beautifully!', time: '1h ago' },
      { id: 2, user: 'Naveen Kumar', text: 'Loved the cinematic drone shots and album quality.', time: '3h ago' },
    ],
  },
  {
    id: 'reel-3',
    type: 'photo',
    mediaUrl: imgBridalMakeup,
    category: 'Bridal & Groom Makeup',
    title: 'Traditional South Indian Bridal HD & Airbrush Look',
    vendorName: 'Kalaignar Bridal Studio',
    vendorLocation: 'Anna Nagar, Chennai',
    likes: 1530,
    sharesCount: 112,
    commentsList: [
      { id: 1, user: 'Meera Krishnan', text: 'Stunning muhurtham glow and flawless eye makeup!', time: '3h ago' },
      { id: 2, user: 'Swetha P.', text: 'Booked them for my sister wedding, truly top tier!', time: '1d ago' },
    ],
  },
  {
    id: 'reel-4',
    type: 'photo',
    mediaUrl: imgCatering,
    category: 'Catering Services',
    title: '32-Item Authentic Banana Leaf Wedding Virundhu',
    vendorName: 'Royal Feast Traditional Caterers',
    vendorLocation: 'Vadapalani, Chennai',
    likes: 876,
    sharesCount: 62,
    commentsList: [
      { id: 1, user: 'Senthil Nathan', text: 'The Elaneer Payasam & sambar aroma was next level!', time: '5h ago' },
      { id: 2, user: 'Geetha V.', text: 'Punctual service and hot dishes served with great care.', time: '1d ago' },
    ],
  },
  {
    id: 'reel-5',
    type: 'photo',
    mediaUrl: imgCars,
    category: 'Wedding Cars',
    title: 'Luxury White Mercedes-Benz E-Class with Orchid Decor',
    vendorName: 'VK Royal Luxury Wheels',
    vendorLocation: 'Guindy, Chennai',
    likes: 642,
    sharesCount: 39,
    commentsList: [
      { id: 1, user: 'Gautham V.', text: 'Punctual chauffeur and pristine car condition!', time: '6h ago' },
    ],
  },
  {
    id: 'reel-6',
    type: 'photo',
    mediaUrl: imgFlowers,
    category: 'Fresh Flowers & Garlands',
    title: 'Fragrant Madurai Jasmine & Rose Garland Sets',
    vendorName: 'Madurai Malli & Floral Crafts',
    vendorLocation: 'Mylapore, Chennai',
    likes: 1120,
    sharesCount: 88,
    commentsList: [
      { id: 1, user: 'Revathi S.', text: 'The fragrance and fresh weave lasted throughout the day!', time: '3h ago' },
    ],
  },
  {
    id: 'reel-7',
    type: 'photo',
    mediaUrl: imgDance,
    category: 'Dance Troupe & Sangeet',
    title: 'Sangeet Choreography & Royal Classical Entry Troupe',
    vendorName: 'Nritya Sangam Event Dancers',
    vendorLocation: 'Velachery, Chennai',
    likes: 780,
    sharesCount: 51,
    commentsList: [
      { id: 1, user: 'Aravind K.', text: 'Energy on the stage was electrifying! Crowd enjoyed a lot.', time: '2h ago' },
    ],
  },
  {
    id: 'reel-8',
    type: 'photo',
    mediaUrl: imgTrays,
    category: 'Ceremonial Gift Trays',
    title: 'Decorative Handcrafted Seeru Thattu & Fruit Platters',
    vendorName: 'Mangala Seeru Designers',
    vendorLocation: 'Tambaram, Chennai',
    likes: 934,
    sharesCount: 67,
    commentsList: [
      { id: 1, user: 'Lakshmi N.', text: 'Elegant presentation and neatly arranged dry fruits & gifts.', time: '4h ago' },
    ],
  },
];

const Photos_Videos = () => {
  const [reels, setReels] = useState(
    initialReelsData.map((item) => ({ ...item, isLiked: false }))
  );
  const [isMuted, setIsMuted] = useState(true);
  const [pausedMap, setPausedMap] = useState({});

  // Comments Sheet State
  const [activeCommentsReel, setActiveCommentsReel] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Toast Notification State
  const [toastNotification, setToastNotification] = useState(null);

  const videoRefs = useRef({});
  const slideRefs = useRef([]);
  const toastTimerRef = useRef(null);

  // Autoplay visible video & pause off-screen videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.index);
          const item = reels[idx];
          const videoEl = videoRefs.current[item?.id];

          if (entry.isIntersecting) {
            if (videoEl && !pausedMap[item.id]) {
              videoEl.play().catch(() => { });
            }
          } else if (videoEl) {
            videoEl.pause();
          }
        });
      },
      { root: null, threshold: 0.6 }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reels, pausedMap]);

  // Show Toast
  const showToast = (message, shareUrl = null) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastNotification({ message, shareUrl });
    toastTimerRef.current = setTimeout(() => {
      setToastNotification(null);
    }, 3500);
  };

  // Like Toggle Handler
  const handleToggleLike = (id) => {
    setReels((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          }
          : item
      )
    );
  };

  // Play/Pause Video Toggle
  const handleTogglePlay = (id) => {
    const videoEl = videoRefs.current[id];
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play().catch(() => { });
      setPausedMap((prev) => ({ ...prev, [id]: false }));
    } else {
      videoEl.pause();
      setPausedMap((prev) => ({ ...prev, [id]: true }));
    }
  };

  // Open Comments Drawer
  const handleOpenComments = (reel) => {
    setActiveCommentsReel(reel);
    setNewCommentText('');
  };

  // Close Comments Drawer
  const handleCloseComments = () => {
    setActiveCommentsReel(null);
    setNewCommentText('');
  };

  // Add Comment Handler
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeCommentsReel) return;

    const newCommentObj = {
      id: Date.now(),
      user: 'You',
      text: newCommentText.trim(),
      time: 'Just now',
    };

    setReels((prev) =>
      prev.map((item) => {
        if (item.id === activeCommentsReel.id) {
          const updatedComments = [newCommentObj, ...(item.commentsList || [])];
          return {
            ...item,
            commentsList: updatedComments,
          };
        }
        return item;
      })
    );

    setActiveCommentsReel((prev) => ({
      ...prev,
      commentsList: [newCommentObj, ...(prev.commentsList || [])],
    }));

    setNewCommentText('');
    showToast('Comment posted successfully! ✨');
  };

  // Share Handler (Web Share API + Clipboard Fallback)
  const handleShare = async (reel) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/media?id=${reel.id}`;
    const shareTitle = `${reel.title} - VK Fest Hub`;
    const shareText = `Check out this wedding inspiration on VK Fest Hub: "${reel.title}" by ${reel.vendorName}!`;

    // Increment share counter in state
    setReels((prev) =>
      prev.map((item) =>
        item.id === reel.id
          ? { ...item, sharesCount: (item.sharesCount || 0) + 1 }
          : item
      )
    );

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        showToast('Shared successfully!');
        return;
      } catch (err) {
        // User cancelled or share dismissed
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      }
      showToast('Link copied to clipboard! Share with family & friends 📋', shareUrl);
    } catch {
      showToast('Link ready! Share with family & friends 📋', shareUrl);
    }
  };

  return (
    <div className="vk-reels-page">
      {/* Standalone User Navbar */}
      <Navbar activeNav="media" />

      {/* =========================================================================
          PHOTOS & VIDEOS FEED (4 CARDS PER ROW LAPTOP, 1 CARD PER ROW MOBILE)
          ========================================================================= */}
      <main className="vk-reels-stage">
        <div className="vk-reels-feed">
          {reels.map((item, idx) => (
            <section
              key={item.id}
              data-index={idx}
              ref={(el) => (slideRefs.current[idx] = el)}
              className="vk-reel-slide"
            >
              <div className="vk-reel-card">
                {item.type === 'video' ? (
                  <video
                    ref={(el) => (videoRefs.current[item.id] = el)}
                    src={item.mediaUrl}
                    className="vk-reel-media"
                    loop
                    playsInline
                    muted={isMuted}
                    onClick={() => handleTogglePlay(item.id)}
                  />
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="vk-reel-media"
                    loading="lazy"
                  />
                )}

                {/* Top Overlay: Category Pill + Mute Button (for Videos) */}
                <div className="vk-reel-top-overlay">
                  <span className="vk-reel-category-pill">
                    {item.type === 'video' ? <BsCameraVideoFill /> : <BsImages />}
                    <span>{item.category}</span>
                  </span>

                  {item.type === 'video' && (
                    <button
                      type="button"
                      className="vk-reel-mute-btn"
                      onClick={() => setIsMuted((prev) => !prev)}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <BsVolumeMuteFill /> : <BsVolumeUpFill />}
                    </button>
                  )}
                </div>

                {/* Center Pause Indicator */}
                {item.type === 'video' && pausedMap[item.id] && (
                  <div className="vk-reel-center-play">
                    <BsPlayFill />
                  </div>
                )}

                {/* Right Action Rail: Like, Comments & Share */}
                <div className="vk-reel-right-rail">
                  {/* 1. Like Button */}
                  <button
                    type="button"
                    className={`vk-reel-action-btn vk-reel-like-btn ${item.isLiked ? 'liked' : ''}`}
                    onClick={() => handleToggleLike(item.id)}
                    aria-label={item.isLiked ? 'Unlike photo' : 'Like photo'}
                    title={item.isLiked ? 'Unlike' : 'Like'}
                  >
                    <span className="vk-reel-action-circle">
                      {item.isLiked ? <BsHeartFill /> : <BsHeart />}
                    </span>
                    <span className="vk-reel-action-count">
                      {item.likes.toLocaleString()}
                    </span>
                  </button>

                  {/* 2. Comments Button */}
                  <button
                    type="button"
                    className="vk-reel-action-btn vk-reel-comment-btn"
                    onClick={() => handleOpenComments(item)}
                    aria-label="View and post comments"
                    title="Comments"
                  >
                    <span className="vk-reel-action-circle">
                      <BsChatDotsFill />
                    </span>
                    <span className="vk-reel-action-count">
                      {(item.commentsList ? item.commentsList.length : 0).toLocaleString()}
                    </span>
                  </button>

                  {/* 3. Share Button (Instagram-style Paper Plane) */}
                  <button
                    type="button"
                    className="vk-reel-action-btn vk-reel-share-btn"
                    onClick={() => handleShare(item)}
                    aria-label="Share photo with friends"
                    title="Share"
                  >
                    <span className="vk-reel-action-circle">
                      <IoPaperPlaneOutline className="vk-insta-share-icon" />
                    </span>
                    <span className="vk-reel-action-count">
                      {(item.sharesCount || 0).toLocaleString()}
                    </span>
                  </button>
                </div>

                {/* Bottom Overlay: Vendor Info & View Vendor Button */}
                <div className="vk-reel-bottom-overlay">
                  <div className="vk-reel-vendor-meta">
                    <div className="vk-reel-vendor-name">
                      <span>{item.vendorName}</span>
                      <BsPatchCheckFill style={{ color: '#10B981', fontSize: '14px' }} />
                    </div>
                    <p className="vk-reel-service-title">{item.title}</p>
                    <span className="vk-reel-vendor-loc">
                      <BsGeoAltFill /> {item.vendorLocation}
                    </span>
                  </div>

                  <a href="#/" className="vk-reel-vendor-btn">
                    <span>View Vendor</span>
                    <BsArrowRight />
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* =========================================================================
          INTERACTIVE COMMENTS MODAL / SHEET
          ========================================================================= */}
      {activeCommentsReel && (
        <div className="vk-comments-backdrop" onClick={handleCloseComments}>
          <div
            className="vk-comments-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Comments"
          >
            {/* Modal Header */}
            <div className="vk-comments-header">
              <div className="vk-comments-title-wrap">
                <h3 className="vk-comments-heading">
                  Comments{' '}
                  <span className="vk-comments-count-pill">
                    {activeCommentsReel.commentsList?.length || 0}
                  </span>
                </h3>
                <p className="vk-comments-subtitle">
                  {activeCommentsReel.title}
                </p>
              </div>
              <button
                type="button"
                className="vk-comments-close-btn"
                onClick={handleCloseComments}
                aria-label="Close comments"
              >
                <FiX />
              </button>
            </div>

            {/* Comments List */}
            <div className="vk-comments-list">
              {activeCommentsReel.commentsList && activeCommentsReel.commentsList.length > 0 ? (
                activeCommentsReel.commentsList.map((c) => (
                  <div key={c.id} className="vk-comment-item">
                    <div className="vk-comment-avatar">
                      {c.user.charAt(0).toUpperCase()}
                    </div>
                    <div className="vk-comment-body">
                      <div className="vk-comment-meta">
                        <span className="vk-comment-author">{c.user}</span>
                        <span className="vk-comment-time">{c.time}</span>
                      </div>
                      <p className="vk-comment-text">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="vk-comments-empty">
                  <BsChatDots className="vk-comments-empty-icon" />
                  <p>No comments yet. Be the first to share your wishes!</p>
                </div>
              )}
            </div>

            {/* Comment Form */}
            <form className="vk-comments-form" onSubmit={handleAddComment}>
              <input
                type="text"
                className="vk-comments-input"
                placeholder="Write a sweet wedding comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="vk-comments-send-btn"
                disabled={!newCommentText.trim()}
                aria-label="Post comment"
              >
                <BsSendFill />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOAST NOTIFICATION
          ========================================================================= */}
      {toastNotification && (
        <div className="vk-reels-toast" role="alert">
          <div className="vk-toast-content">
            <BsCheckCircleFill className="vk-toast-icon" />
            <span>{toastNotification.message}</span>
          </div>
          {toastNotification.shareUrl && (
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check this wedding service on VK Fest Hub: ${toastNotification.shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vk-toast-whatsapp-btn"
              title="Share on WhatsApp"
            >
              <BsWhatsapp />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      )}

      {/* Standalone User Footer */}
      <Footer />
    </div>
  );
};

export default Photos_Videos;
