import React, { useState, useEffect } from 'react';
import preloaderImg from '../../assets/images/common/preloader.jpeg';
import '../../style/common/Preloader.css';

const Preloader = ({ duration = 2200, onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Timer to initiate smooth fade-out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration);

    // Timer to unmount and trigger the onFinish callback
    const finishTimer = setTimeout(() => {
      setIsMounted(false);
      if (typeof onFinish === 'function') {
        onFinish();
      }
    }, duration + 600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  if (!isMounted) return null;

  return (
    <div
      className={`preloader-overlay ${isFadingOut ? 'preloader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading VK Fest Hub"
    >
      <div className="preloader-content">
        <div className="preloader-image-wrapper">
          <img
            src={preloaderImg}
            alt="VK Fest Hub Preloader"
            className="preloader-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
