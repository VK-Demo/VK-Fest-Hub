import React from "react";
import {
  TrendingUp,
  Eye,
  Users,
  MessageSquareText,
  ChartNoAxesCombined,
  ArrowUpRight,
  Wallet,
  Download
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import "./Analytics.css";

function Analytics() {
  const { notify } = useVendor();

  const handleExport = () => {
    notify("Exporting performance summary report (PDF/CSV)...");
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">MEASURE WHAT MATTERS</span>
          <h1>Performance & Analytics</h1>
          <p>
            Understand your profile reach, inbound couple enquiries, and seasonal wedding momentum.
          </p>
        </div>

        <button className="btn secondary" onClick={handleExport}>
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* Analytics Stats Cards */}
      <div className="stats-grid analytics-stats">
        <div className="stat-card">
          <div className="stat-top">
            <span>Profile Impressions</span>
            <i>
              <Eye size={18} />
            </i>
          </div>
          <strong>34,520</strong>
          <small className="positive">
            <TrendingUp size={13} /> +28.4% vs previous month
          </small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Direct Inquiries</span>
            <i>
              <Users size={18} />
            </i>
          </div>
          <strong>142</strong>
          <small className="positive">
            <TrendingUp size={13} /> +34.0% lead growth
          </small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Lead Conversion Rate</span>
            <i>
              <TrendingUp size={18} />
            </i>
          </div>
          <strong>24.6%</strong>
          <small className="positive">
            Ranked #1 in Chennai Decorators
          </small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Revenue Pipeline</span>
            <i>
              <Wallet size={18} />
            </i>
          </div>
          <strong>₹XXXX</strong>
          <small className="positive">
            <TrendingUp size={13} /> Peak season momentum
          </small>
        </div>
      </div>

      {/* Grid: Bar Chart & Donut Chart */}
      <div className="analytics-grid">
        {/* Monthly Leads Bar Chart */}
        <div className="chart-card">
          <div className="chart-title">
            <div>
              <h3>Monthly Leads & Customer Inquiries</h3>
              <p>Track inquiry volume through VK Fest Hub across 2026</p>
            </div>
            <span className="chart-legend">
              <i /> Inquiries
            </span>
          </div>

          <div className="bar-chart">
            {MONTHLY_LEADS.map((item, idx) => {
              const heightPercent = Math.round((item.count / 142) * 100);
              return (
                <div className="bar-col" key={idx}>
                  <div
                    className="bar"
                    style={{ height: `${heightPercent}%` }}
                    title={`${item.month}: ${item.count} leads`}
                  />
                  <small>{item.month}</small>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Breakdown Donut */}
        <div className="chart-card revenue-card">
          <div className="chart-title">
            <div>
              <h3>Revenue by Service Category</h3>
              <p>November 2026 Wedding Season</p>
            </div>
          </div>

          <div className="donut-wrap">
            <div className="donut">
              <div>
                <b>₹XXXX</b>
                <small>Total Revenue</small>
              </div>
            </div>
          </div>

          <div className="revenue-legend">
            <div>
              <i className="dot one" />
              <span>Traditional Mandapam Decor</span>
              <b>54% · ₹XXXX</b>
            </div>
            <div>
              <i className="dot two" />
              <span>Fresh Jasmine & Lotus Floral Art</span>
              <b>26% · ₹XXXX</b>
            </div>
            <div>
              <i className="dot three" />
              <span>Stage & Ambient Lighting</span>
              <b>20% · ₹XXXX</b>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords Card */}
      <div className="chart-card keyword-card">
        <div className="chart-title">
          <div>
            <h3>Top Couple Search Terms</h3>
            <p>Popular Tamil Nadu wedding searches that led couples to your profile</p>
          </div>
        </div>

        <div className="keywords">
          {TOP_KEYWORDS.map((kw, idx) => (
            <div className="keyword" key={idx}>
              <span>{kw.term}</span>
              <b>{kw.searches} inquiries</b>
              <i style={{ width: kw.width }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const MONTHLY_LEADS = [
  { month: "Jan", count: 32 },
  { month: "Feb", count: 46 },
  { month: "Mar", count: 39 },
  { month: "Apr", count: 61 },
  { month: "May", count: 50 },
  { month: "Jun", count: 72 },
  { month: "Jul", count: 59 },
  { month: "Aug", count: 84 },
  { month: "Sep", count: 68 },
  { month: "Oct", count: 91 },
  { month: "Nov", count: 124 },
  { month: "Dec", count: 142 }
];

const TOP_KEYWORDS = [
  { term: "Traditional Muhurtham Mandapam Chennai", searches: 842, width: "100%" },
  { term: "Madurai Jasmine & Lotus Floral Decor", searches: 724, width: "86%" },
  { term: "South Indian Wedding Stage Lighting", searches: 612, width: "73%" },
  { term: "Temple Style Kalyana Mandapam Decorators", searches: 498, width: "59%" },
  { term: "Mylapore Wedding Floral Stage Setup", searches: 376, width: "45%" }
];

export default Analytics;
export { Analytics };
