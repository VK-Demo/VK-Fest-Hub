import React from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  Images,
  MessageSquareText,
  CalendarDays,
  ChartNoAxesCombined,
  Star,
  CircleHelp,
  Settings,
  LogOut,
  X,
  Menu,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import { getInitials } from "../../utils/storage";
import "./DashboardLayout.css";

const NAV_ITEMS = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Public Profile", path: "/dashboard/profile", icon: Store },
  { label: "Portfolio Gallery", path: "/dashboard/portfolio", icon: Images },
  { label: "Enquiries & Leads", path: "/dashboard/enquiries", icon: MessageSquareText },
  { label: "Booking Calendar", path: "/dashboard/calendar", icon: CalendarDays },
  { label: "Analytics", path: "/dashboard/analytics", icon: ChartNoAxesCombined },
  { label: "Reviews", path: "/dashboard/reviews", icon: Star }
];

function Sidebar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    vendor,
    profile,
    enquiries,
    logout,
    openModal,
    notify
  } = useVendor();
  const navigate = useNavigate();

  const businessName = profile?.company || vendor?.company || "Sri Vari Weddings";
  const ownerName = profile?.owner || vendor?.owner || "Vendor Owner";
  const initials = getInitials(businessName);
  const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-head">
          <NavLink
            to="/dashboard"
            className="brand-mark"
            onClick={() => setSidebarOpen(false)}
          >
            <img src="/logo/Logo.jpg" alt="VK Fest Hub Logo" className="brand-logo-img" />
            <div>
              <b>VK Fest Hub</b>
              <small>VENDOR PARTNER</small>
            </div>
          </NavLink>
          <button
            className="icon-btn mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="side-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.label === "Enquiries & Leads" && newEnquiriesCount > 0 && (
                  <em>{newEnquiriesCount}</em>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <CircleHelp size={20} />
            </div>
            <b>Need a hand?</b>
            <p>Our partner growth team is available 24/7 to support you.</p>
            <button
              onClick={() => notify("Support reached: partner-desk@vkfesthub.in")}
            >
              Contact support <ArrowUpRight size={13} />
            </button>
          </div>

          <button
            className="side-settings"
            onClick={() => openModal("settings")}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <div className="user-mini">
            <div className="avatar">{initials}</div>
            <div>
              <b>{ownerName}</b>
              <small>{businessName}</small>
            </div>
            <button
              className="icon-btn"
              onClick={handleLogout}
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-scrim"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

const ROUTE_LABELS = {
  "/dashboard": "Overview",
  "/dashboard/profile": "Public Profile",
  "/dashboard/portfolio": "Portfolio Gallery",
  "/dashboard/enquiries": "Customer Enquiries",
  "/dashboard/calendar": "Booking Calendar",
  "/dashboard/analytics": "Performance & Analytics",
  "/dashboard/reviews": "Customer Ratings & Reviews"
};

function Navbar() {
  const {
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    vendor,
    profile,
    notify,
    openModal
  } = useVendor();

  const location = useLocation();
  const currentLabel = ROUTE_LABELS[location.pathname] || "Dashboard";

  const businessName = profile?.company || vendor?.company || "Sri Vari Weddings";
  const ownerName = profile?.owner || vendor?.owner || "Vendor Partner";
  const initials = getInitials(businessName);

  return (
    <header className="topbar">
      <button
        className="icon-btn menu-trigger"
        onClick={toggleSidebar}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="breadcrumb">
        <span>Vendor Portal</span>
        <span>/</span>
        <b>{currentLabel}</b>
      </div>

      <div className="top-actions">
        <div className="search-top">
          <Search size={16} />
          <input
            placeholder="Search leads, services, dates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd>⌘ K</kbd>
        </div>

        <button
          className="icon-btn notification"
          onClick={() => notify("You're all caught up with new notifications!")}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <i />
        </button>

        <div className="top-divider" />

        <div
          className="top-user"
          style={{ cursor: "pointer" }}
          onClick={() => openModal("settings")}
        >
          <div className="avatar">{initials}</div>
          <div>
            <b>{ownerName}</b>
            <small>Verified Partner</small>
          </div>
          <ChevronDown size={15} color="#8a8075" />
        </div>
      </div>
    </header>
  );
}

function DashboardLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <Navbar />
        <div className="page-content">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
export { DashboardLayout, Sidebar, Navbar, NAV_ITEMS };
