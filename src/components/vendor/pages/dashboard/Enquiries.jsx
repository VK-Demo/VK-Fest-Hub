import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquareText,
  CalendarDays,
  MapPin,
  IndianRupee,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  X,
  MessageCircle,
  ChevronDown,
  Wallet,
  Search,
  CalendarCheck,
  MoreHorizontal
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import "./Enquiries.css";

function Enquiries() {
  const {
    enquiries,
    updateEnquiryStatus,
    openModal,
    notify,
    searchQuery
  } = useVendor();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      `${e.name} ${e.id} ${e.service} ${e.venue}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">BUILD RELATIONSHIPS THAT LAST</span>
          <h1>Customer Enquiries & Leads</h1>
          <p>
            Every enquiry is an opportunity to create a memorable wedding celebration.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="lead-tabs">
        {["All", "New", "In Discussion", "Confirmed"].map((status) => {
          const count =
            status === "All"
              ? enquiries.length
              : enquiries.filter((e) => e.status === status).length;
          return (
            <button
              key={status}
              className={statusFilter === status ? "active" : ""}
              onClick={() => setStatusFilter(status)}
            >
              {status}
              <b>{count}</b>
            </button>
          );
        })}
      </div>

      {/* Lead Cards List */}
      <div className="lead-list">
        {filtered.map((enq) => (
          <div className="lead-card" key={enq.id}>
            <div className="lead-card-top">
              <div className="couple-avatar large">{enq.initial}</div>
              <div className="lead-person">
                <h3>{enq.name}</h3>
                <small>
                  Reference: {enq.id} · Received {enq.time}
                </small>
              </div>

              <span
                className={`status status-${enq.status.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {enq.status}
              </span>

              <button
                className="icon-btn"
                onClick={() => openModal("enquiryDetail", enq)}
                aria-label="Enquiry options"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="lead-service">
              <span>REQUESTED WEDDING SERVICE</span>
              <b>{enq.service}</b>
            </div>

            <div className="lead-details">
              <div>
                <CalendarDays />
                <span>
                  <small>Muhurtham date & time</small>
                  <b>✨ {enq.date} · {enq.timeSlot}</b>
                </span>
              </div>

              <div>
                <MapPin />
                <span>
                  <small>Wedding Venue</small>
                  <b>{enq.venue}</b>
                </span>
              </div>

              <div>
                <Wallet />
                <span>
                  <small>Estimated Budget & Guests</small>
                  <b>{enq.budget} · {enq.guests}</b>
                </span>
              </div>
            </div>

            <div className="couple-note">
              <b>Couple's note</b>
              <p>"{enq.note}"</p>
            </div>

            <div className="lead-actions">
              <button
                className="btn secondary"
                onClick={() => openModal("chat", enq)}
              >
                <MessageCircle size={15} /> Reply via VK Fest Hub Chat
              </button>

              <button
                className="btn secondary"
                onClick={() => {
                  navigate("/dashboard/calendar");
                  notify(`Calendar opened for checking availability on ${enq.date}`);
                }}
              >
                <CalendarCheck size={15} /> Check calendar date
              </button>

              <div className="lead-status-select">
                <select
                  value={enq.status}
                  onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                >
                  <option value="New">Status: New</option>
                  <option value="In Discussion">Status: In Discussion</option>
                  <option value="Confirmed">Status: Confirmed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={32} />
          <b>No wedding enquiries match your filters</b>
          <p>Try clearing your search query or selecting a different status filter.</p>
        </div>
      )}
    </>
  );
}

const UPCOMING_SCHEDULE = [
  {
    date: "06 Nov",
    client: "Priya & Karthik Ramanathan",
    venue: "Sri Vari Kalyana Mandapam, Chennai",
    status: "Booked"
  },
  {
    date: "14 Nov",
    client: "Ananya & Vivek",
    venue: "ITC Grand Chola, Chennai",
    status: "Booked"
  },
  {
    date: "20 Nov",
    client: "Auspicious Muhurtham Day",
    venue: "High enquiry volume date",
    status: "Auspicious"
  },
  {
    date: "28 Nov",
    client: "Meera & Arjun",
    venue: "Mahabalipuram Beach Resort",
    status: "Booked"
  },
  {
    date: "05 Dec",
    client: "Siddharth & Deepika",
    venue: "Leela Palace, Chennai",
    status: "Booked"
  }
];

export default Enquiries;
export { Enquiries };
