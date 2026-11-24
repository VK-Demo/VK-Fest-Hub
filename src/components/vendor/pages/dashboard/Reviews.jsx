import React from "react";
import {
  Star,
  MessageSquareText,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import "./Reviews.css";

function Reviews() {
  const { reviews, notify } = useVendor();

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">TRUST BUILT ONE CELEBRATION AT A TIME</span>
          <h1>Customer Ratings & Reviews</h1>
          <p>
            Hear direct feedback from couples and continue establishing your trusted wedding reputation.
          </p>
        </div>
      </div>

      {/* Overall Score & Rating Bars */}
      <div className="review-summary">
        <div>
          <strong>4.9</strong>
          <div className="stars">★★★★★</div>
          <small>Based on 86 verified couple reviews</small>
        </div>

        <div className="rating-bars">
          {RATING_BREAKDOWN.map((row) => (
            <div key={row.stars}>
              <span>{row.stars} stars</span>
              <i>
                <b style={{ width: row.percent }} />
              </i>
              <small>{row.count}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="review-list">
        {reviews.map((rev, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-top">
              <div className="couple-avatar">{rev.name[0]}</div>
              <div>
                <b>{rev.name}</b>
                <small>{rev.date} · Verified VK Fest Hub Couple</small>
              </div>
              <span className="stars">
                {"★".repeat(rev.rating)}
                {"☆".repeat(5 - rev.rating)}
              </span>
            </div>

            <p>{rev.text}</p>

            <button
              className="text-button"
              onClick={() => notify(`Reply composer opened for review from ${rev.name}`)}
            >
              Reply to couple <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

const RATING_BREAKDOWN = [
  { stars: 5, percent: "88%", count: 76 },
  { stars: 4, percent: "9%", count: 8 },
  { stars: 3, percent: "2%", count: 1 },
  { stars: 2, percent: "1%", count: 1 },
  { stars: 1, percent: "0%", count: 0 }
];

export default Reviews;
export { Reviews };
