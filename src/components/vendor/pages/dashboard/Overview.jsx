import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  MessageSquareText,
  CalendarCheck,
  Star,
  ShieldCheck,
  ArrowUpRight,
  Eye,
  CalendarDays,
  MapPin,
  IndianRupee,
  CheckCircle2,
  Clock,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  Plus,
  Images,
  Video,
  Camera,
  MoreHorizontal,
  Edit3,
  Trash2
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import { money as storageMoney } from "../../utils/storage";
import "./Overview.css";

const money = (val) => {
  if (typeof storageMoney === "function") {
    return storageMoney(val);
  }
  return "₹XXXX";
};

function Overview() {
  const {
    vendor,
    profile,
    services,
    enquiries,
    openModal,
    subscription,
    notify,
    deleteService
  } = useVendor();
  const navigate = useNavigate();

  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".service-menu-wrap")) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const ownerFirstName = (profile?.owner || vendor?.owner || "Partner").split(" ")[0];
  const profileHealth = profile ? 92 : 60;

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">WEDDING VENDOR HUB · 2026</span>
          <h1>
            Good afternoon, {ownerFirstName} <span>✦</span>
          </h1>
          <p>Here is what is happening with your wedding business today.</p>
        </div>

        <button
          className="btn secondary"
          onClick={() => navigate("/dashboard/profile")}
        >
          <Eye size={16} /> View public storefront
        </button>
      </div>

      {/* Profile Health Card */}
      <section className="health-card">
        <div className="health-left">
          <div className="health-icon">
            <ShieldCheck size={24} />
          </div>
          <div className="health-body">
            <span className="eyebrow">PROFILE VISIBILITY SCORE</span>
            <h3>Super Verified Wedding Partner</h3>
            <p>
              Your profile is verified and active across Chennai & Tamil Nadu couples searches.
            </p>
            <div className="progress">
              <i style={{ width: `${profileHealth}%` }} />
            </div>
            <small>{profileHealth}% completed · Excellent visibility</small>
          </div>
        </div>

        <div className="health-right">
          <div className="health-score">{profileHealth}%</div>
          <button
            className="btn light"
            onClick={() => navigate("/dashboard/profile")}
          >
            Enhance profile <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      {/* 4 Key Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Direct Leads</span>
            <i>
              <Users size={18} />
            </i>
          </div>
          <strong>142</strong>
          <small className="positive">
            <TrendingUp size={13} /> +24.8% vs last month
          </small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Active Discussions</span>
            <i>
              <MessageSquareText size={18} />
            </i>
          </div>
          <strong>18</strong>
          <small className="positive">
            <TrendingUp size={13} /> 6 new this week
          </small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Confirmed Bookings</span>
            <i>
              <CalendarCheck size={18} />
            </i>
          </div>
          <strong>12</strong>
          <small className="positive">
            <TrendingUp size={13} /> Season peak (Nov - Dec)
          </small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Client Rating</span>
            <i>
              <Star size={18} />
            </i>
          </div>
          <strong>4.9 / 5</strong>
          <small className="positive">
            <TrendingUp size={13} /> Based on 86 couple reviews
          </small>
        </div>
      </div>

      {/* Active Services Section */}
      <div className="section-row">
        <div>
          <h2>Active Services & Packages</h2>
          <p>Manage the service offerings and packages couples can enquire about.</p>
        </div>
        <button
          className="btn primary"
          onClick={() => openModal("addService")}
        >
          <Plus size={16} /> Add Service Package
        </button>
      </div>

      {services.length === 0 ? (
        <div className="empty-services-card">
          <Camera size={36} className="empty-services-icon" />
          <h3>No Active Service Packages</h3>
          <p>Add your first service package so couples can view your pricing and packages.</p>
          <button className="btn primary" onClick={() => openModal("addService")}>
            <Plus size={16} /> Add Service Package
          </button>
        </div>
      ) : (
        <div className="service-grid">
          {services.map((srv) => (
            <div className="service-card" key={srv.id}>
              <div className="service-thumb">
                <Camera />
                <span>ACTIVE</span>
              </div>
              <div className="service-card-body">
                <div className="service-title">
                  <b>{srv.name}</b>
                  <div className="service-menu-wrap">
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId((prev) => (prev === srv.id ? null : srv.id));
                      }}
                      aria-label="Service actions"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {activeMenuId === srv.id && (
                      <div className="service-dropdown-menu">
                        <button
                          type="button"
                          className="service-dropdown-item"
                          onClick={() => {
                            setActiveMenuId(null);
                            openModal("editService", srv);
                          }}
                        >
                          <Edit3 size={14} /> Edit Package
                        </button>
                        <button
                          type="button"
                          className="service-dropdown-item danger"
                          onClick={() => {
                            setActiveMenuId(null);
                            deleteService(srv.id);
                          }}
                        >
                          <Trash2 size={14} /> Remove Package
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p>{srv.description || "Comprehensive wedding service package."}</p>
                <div className="service-meta">
                  {srv.photos && (
                    <span>
                      <Images size={13} /> {srv.photos} Photos
                    </span>
                  )}
                  {srv.videos && (
                    <span>
                      <Video size={13} /> {srv.videos} Video edits
                    </span>
                  )}
                </div>
                <div className="service-price">
                  {money(srv.price)} <small>/ package</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Enquiries Section */}
      <div className="section-row recent-head">
        <div>
          <h2>Recent Enquiries & Leads</h2>
          <p>Direct wedding requests from couples looking for your dates.</p>
        </div>
        <button
          className="link-button"
          onClick={() => navigate("/dashboard/enquiries")}
        >
          View All Enquiries ({enquiries.length}) <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="table-card">
        <div className="table-head">
          <b>Latest Inbound Requests</b>
          <span>Live wedding leads</span>
        </div>

        {enquiries.slice(0, 3).map((enq) => (
          <div className="enquiry-row" key={enq.id}>
            <div className="couple-avatar">{enq.initial}</div>
            <div className="enquiry-person">
              <b>{enq.name}</b>
              <small>
                {enq.id} · {enq.time}
              </small>
            </div>
            <div className="enquiry-service">{enq.service}</div>
            <span
              className={`status status-${enq.status.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {enq.status}
            </span>
            <button
              className="icon-btn"
              onClick={() => openModal("enquiryDetail", enq)}
              aria-label="View enquiry details"
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Overview;
export { Overview };
