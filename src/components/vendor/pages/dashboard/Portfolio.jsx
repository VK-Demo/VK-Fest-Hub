import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  ImagePlus,
  Trash2,
  Eye,
  Camera,
  Video,
  Images
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import "./Portfolio.css";

function Portfolio() {
  const { posts, deletePost, openModal, notify } = useVendor();
  const navigate = useNavigate();

  const totalCount = posts.length + SAMPLE_PROJECTS.length;

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">SHOWCASE YOUR FINEST CRAFT</span>
          <h1>Portfolio Gallery</h1>
          <p>
            Build trust and inspire prospective couples with real wedding ceremonies and decorations.
          </p>
        </div>

        <button className="btn primary" onClick={() => openModal("addPost")}>
          <Upload size={16} /> Upload New Work
        </button>
      </div>

      <div className="portfolio-toolbar">
        <div>
          <b>{totalCount} Curated Wedding Projects</b>
          <small>Organized to showcase your creative breadth and craftsmanship</small>
        </div>

        <button
          className="btn secondary"
          onClick={() => navigate("/dashboard/profile")}
        >
          <Images size={16} /> View Storefront View
        </button>
      </div>

      <div className="portfolio-grid">
        {posts.map((post) => (
          <div className="portfolio-item" key={post.id}>
            {post.src ? (
              <img src={post.src} alt={post.caption} />
            ) : (
              <div className="portfolio-art art-1">
                <Camera size={32} />
                <span>{post.caption}</span>
              </div>
            )}
            <div className="portfolio-caption">
              <b>{post.caption}</b>
              <button
                className="icon-btn"
                onClick={() => deletePost(post.id)}
                title="Remove project"
                aria-label="Remove project"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        {SAMPLE_PROJECTS.map((sample) => (
          <div className="portfolio-item" key={sample.id}>
            <div className={`portfolio-art ${sample.artClass}`}>
              <Camera size={34} />
              <span>{sample.title}</span>
            </div>
            <div className="portfolio-caption">
              <b>{sample.title}</b>
              <button
                className="icon-btn"
                onClick={() => notify("Sample project portfolio item.")}
                title="Sample project"
                aria-label="Sample project"
              >
                <Images size={15} />
              </button>
            </div>
          </div>
        ))}
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

export default Portfolio;
export { Portfolio };
