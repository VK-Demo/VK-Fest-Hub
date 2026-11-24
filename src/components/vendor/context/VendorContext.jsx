import React, {
  useState,
  useEffect,
  useContext,
  createContext
} from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Building2,
  CalendarCheck,
  IndianRupee,
  Clock,
  Send,
  MessageCircle,
  Plus,
  Trash2,
  Camera,
  Video,
  LogOut,
  ArrowUpRight,
  ChartNoAxesCombined,
  Eye,
  Upload,
  Share2,
  Check,
  MapPin,
  Edit3
} from "lucide-react";
import {
  readStore,
  saveStore,
  initialSeed,
  getInitials,
  money,
  STORAGE_KEY
} from "../utils/storage";
import logoImg from "../../../assets/images/common/Logo.jpeg";
import "./VendorContext.css";
import "../../../style/vendor/Vendor_Dashboard.css";

/* ==========================================================================
   BRAND LOGO COMPONENT
   ========================================================================== */

export function Logo() {
  return (
    <div className="brand-mark">
      <img src={logoImg} alt="VK Fest Hub Logo" className="brand-logo-img" />
      <div>
        <b>VK Fest Hub</b>
        <small>VENDOR PARTNER</small>
      </div>
    </div>
  );
}

const VendorContext = createContext(null);

function VendorProvider({ children }) {
  const [data, setData] = useState(readStore);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    saveStore(data);
  }, [data]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (msg) => {
    setToast(msg);
  };

  const update = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const openModal = (type, payload = null) => {
    setActiveModal({ type, payload });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const registerVendor = (vendorDetails) => {
    update("vendor", vendorDetails);
    try {
      localStorage.setItem(
        "vk_current_session",
        JSON.stringify({
          role: "vendor",
          user: {
            id: "vendor_portal",
            username: vendorDetails.username,
            businessName: vendorDetails.company,
            ownerName: vendorDetails.owner,
            email: vendorDetails.email,
            mobileNo: vendorDetails.mobile,
            serviceCategory:
              (vendorDetails.categories && vendorDetails.categories[0]) ||
              vendorDetails.category ||
              "Wedding Services"
          },
          loggedInAt: new Date().toISOString()
        })
      );
      window.dispatchEvent(new Event("vk_auth_change"));
    } catch (err) {
      console.error(err);
    }
    notify("Account created successfully. Welcome!");
    return true;
  };

  const loginVendor = (username, password) => {
    if (!data.vendor && username !== "vis" && username !== "srivari_weddings") {
      notify("No registered vendor found. Please create an account.");
      return { success: false, reason: "no_vendor" };
    }
    if (
      (data.vendor && data.vendor.username === username) ||
      username === "vis" ||
      username === "srivari_weddings"
    ) {
      const activeVendor = data.vendor || initialSeed.vendor;
      if (!data.vendor) {
        update("vendor", activeVendor);
      }
      if (!data.profile) {
        update("profile", initialSeed.profile);
      }
      try {
        localStorage.setItem(
          "vk_current_session",
          JSON.stringify({
            role: "vendor",
            user: {
              id: "vendor_portal",
              username: activeVendor.username,
              businessName: activeVendor.company,
              ownerName: activeVendor.owner,
              email: activeVendor.email,
              mobileNo: activeVendor.mobile,
              serviceCategory:
                (activeVendor.categories && activeVendor.categories[0]) ||
                "Wedding Stage Decoration"
            },
            loggedInAt: new Date().toISOString()
          })
        );
        window.dispatchEvent(new Event("vk_auth_change"));
      } catch (err) {
        console.error(err);
      }
      notify(`Welcome back, ${activeVendor.owner || activeVendor.username}!`);
      return { success: true };
    }
    notify("Invalid username or password.");
    return { success: false, reason: "invalid_credentials" };
  };

  const logout = () => {
    try {
      localStorage.removeItem("vk_current_session");
      window.dispatchEvent(new Event("vk_auth_change"));
    } catch (err) {
      console.error(err);
    }
    setSidebarOpen(false);
    notify("You have been signed out.");
  };

  const saveProfile = (profileData) => {
    const updated = {
      ...profileData,
      company: profileData.company || data.vendor?.company || "",
      owner: profileData.owner || data.vendor?.owner || "",
      categories: profileData.categories || data.vendor?.categories || []
    };
    update("profile", updated);
    notify("Business profile saved successfully!");
  };

  const saveServices = (servicesList) => {
    update("services", servicesList);
    notify("Services & packages saved successfully!");
  };

  const selectSubscription = (plan) => {
    const subscription = {
      plan,
      amount: "₹XXXX",
      cycle: "Monthly",
      status: "Active",
      renewsOn: "20 Dec 2026"
    };
    update("subscription", subscription);
  };

  const processPayment = ({ method, app }) => {
    const plan = data.subscription?.plan || "Basic";

    update("subscription", {
      plan,
      amount: "₹XXXX",
      cycle: "Monthly",
      status: "Active",
      renewsOn: "20 Dec 2026"
    });

    const payment = {
      method,
      app: method === "UPI" ? app : "",
      paidAt: new Date().toISOString(),
      reference: "VK" + Math.floor(100000 + Math.random() * 900000)
    };
    update("payment", payment);
    notify("Payment verified! Your vendor partner dashboard is now live.");
  };

  const addService = (service) => {
    const newService = {
      ...service,
      id: "srv-" + Date.now(),
      name: service.name || "Custom Wedding Package",
      price: service.price || "XXXX",
      description: service.description || "Comprehensive wedding service package tailored for couples.",
      photos: service.photos || "300+",
      videos: service.videos || "1",
      duration: service.duration || "Full wedding day",
      isManual: true
    };
    update("services", [newService, ...(data.services || [])]);
    notify(`"${newService.name}" added successfully.`);
    return true;
  };

  const updateService = (updatedService) => {
    update(
      "services",
      (data.services || []).map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    notify(`"${updatedService.name}" updated successfully.`);
    return true;
  };

  const deleteService = (id) => {
    update("services", (data.services || []).filter((s) => s.id !== id));
    notify("Service package removed.");
  };

  const addPost = ({ caption, file, src, type }) => {
    const newPost = {
      id: Date.now(),
      caption,
      src: src || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      type: type || (file?.type?.startsWith("video") ? "video" : "image"),
      date: "Just now"
    };
    update("posts", [newPost, ...data.posts]);
    notify("Your work has been published to your profile!");
  };

  const deletePost = (id) => {
    update("posts", data.posts.filter((p) => p.id !== id));
    notify("Post removed from gallery.");
  };

  const updateEnquiryStatus = (id, status) => {
    update(
      "enquiries",
      data.enquiries.map((e) => (e.id === id ? { ...e, status } : e))
    );
    notify(`Enquiry marked as "${status}".`);
  };

  const updateCalendarEvent = (dateStr, status) => {
    const updated = { ...data.calendarEvents };
    if (!status || status === "Available") {
      delete updated[dateStr];
    } else {
      updated[dateStr] = status;
    }
    update("calendarEvents", updated);
    notify(`Calendar date updated to "${status}".`);
  };

  const value = {
    data,
    vendor: data.vendor,
    profile: data.profile,
    services: data.services || [],
    posts: data.posts || [],
    enquiries: data.enquiries || [],
    reviews: data.reviews || [],
    subscription: data.subscription,
    payment: data.payment,
    calendarEvents: data.calendarEvents || {},

    isAuthenticated: Boolean(data.vendor),
    hasProfile: Boolean(data.profile),
    hasSubscription: Boolean(data.subscription),
    hasPayment: Boolean(data.payment),

    toast,
    notify,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar: () => setSidebarOpen((prev) => !prev),
    searchQuery,
    setSearchQuery,

    activeModal,
    openModal,
    closeModal,

    registerVendor,
    loginVendor,
    logout,
    saveProfile,
    saveServices,
    selectSubscription,
    processPayment,
    addService,
    updateService,
    deleteService,
    addPost,
    deletePost,
    updateEnquiryStatus,
    updateCalendarEvent,
    money
  };

  return <VendorContext.Provider value={value}>{children}</VendorContext.Provider>;
}

function useVendor() {
  const context = useContext(VendorContext);
  if (!context) {
    const store = readStore();
    return {
      store,
      data: store,
      vendor: store.vendor,
      profile: store.profile,
      services: store.services || [],
      posts: store.posts || [],
      enquiries: store.enquiries || [],
      calendarEvents: store.calendarEvents || {},
      reviews: store.reviews || [],
      subscription: store.subscription,
      payment: store.payment,
      isAuthenticated: Boolean(store.vendor),
      hasProfile: Boolean(store.profile),
      hasSubscription: Boolean(store.subscription),
      hasPayment: Boolean(store.payment),
      toast: "",
      notify: (msg) => console.log(msg),
      sidebarOpen: false,
      setSidebarOpen: () => {},
      toggleSidebar: () => {},
      searchQuery: "",
      setSearchQuery: () => {},
      activeModal: null,
      openModal: () => {},
      closeModal: () => {},
      registerVendor: () => true,
      loginVendor: () => ({ success: true }),
      logout: () => {},
      saveProfile: () => {},
      saveServices: () => {},
      selectSubscription: () => {},
      processPayment: () => {},
      addService: () => {},
      updateService: () => {},
      deleteService: () => {},
      addPost: () => {},
      deletePost: () => {},
      updateEnquiryStatus: () => {},
      updateCalendarEvent: () => {},
      money
    };
  }
  return context;
}

/* ==========================================================================
   MODAL COMPONENT
   ========================================================================== */

function Modal({ title, close, onClose, children }) {
  const handleClose = onClose || close;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && handleClose) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && handleClose) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal">
        <div className="modal-head">
          <h3>{title}</h3>
          {handleClose && (
            <button
              className="icon-btn"
              onClick={handleClose}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PROTECTED ROUTE
   ========================================================================== */

function ProtectedRoute({ children }) {
  const { vendor } = useVendor();

  if (!vendor) {
    return <Navigate to="/login-vendor" replace />;
  }

  return children ? children : <Outlet />;
}

function EditServiceModal({ service, onClose, onUpdate, onDelete }) {
  const [form, setForm] = useState({
    id: service.id,
    name: service.name || "",
    price: service.price || "",
    description: service.description || "",
    photos: service.photos || "",
    videos: service.videos || "",
    duration: service.duration || "Full wedding day",
    isManual: service.isManual ?? true
  });

  return (
    <Modal title="Edit Service Package" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onUpdate(form);
          onClose();
        }}
        className="stack-form"
      >
        <label className="field">
          <span>Service Name</span>
          <div className="input-wrap">
            <input
              required
              placeholder="e.g. Candid Wedding Photography"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </label>

        <label className="field">
          <span>Package Description</span>
          <textarea
            rows={3}
            placeholder="Describe what is included in this wedding package..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <div className="form-grid">
          <label className="field">
            <span>Package Price (₹)</span>
            <div className="input-wrap">
              <input
                type="text"
                required
                placeholder="XXXX"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </label>

          <label className="field">
            <span>Coverage Duration</span>
            <div className="input-wrap">
              <input
                placeholder="e.g. 8 hours or Full Day"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </div>
          </label>

          <label className="field">
            <span>Photos Included</span>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="300+"
                value={form.photos}
                onChange={(e) => setForm({ ...form, photos: e.target.value })}
              />
            </div>
          </label>

          <label className="field">
            <span>Videos Included</span>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="1"
                value={form.videos}
                onChange={(e) => setForm({ ...form, videos: e.target.value })}
              />
            </div>
          </label>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button type="submit" className="btn primary" style={{ flex: 1 }}>
            <Check size={16} /> Save Changes
          </button>
          <button
            type="button"
            className="btn danger"
            onClick={() => {
              onDelete(service.id);
              onClose();
            }}
          >
            <Trash2 size={16} /> Remove Package
          </button>
        </div>
      </form>
    </Modal>
  );
}

function GlobalModals() {
  const {
    activeModal,
    closeModal,
    notify,
    addService,
    updateService,
    deleteService,
    addPost,
    saveProfile,
    profile,
    vendor,
    subscription,
    payment,
    logout,
    updateCalendarEvent
  } = useVendor();

  const navigate = useNavigate();

  // Add Service Form State
  const [serviceForm, setServiceForm] = useState({
    name: "Traditional Muhurtham Mandapam Decor",
    price: "XXXX",
    description: "Authentic temple-style mandapam with brass lamps and floral pillars.",
    photos: "200",
    videos: "2",
    duration: "Full wedding day"
  });

  // Add Post / Portfolio Form State
  const [postCaption, setPostCaption] = useState("");
  const [postFile, setPostFile] = useState(null);

  // Edit Profile Form State
  const [editProfileForm, setEditProfileForm] = useState({
    company: profile?.company || vendor?.company || "",
    city: profile?.city || "Chennai",
    address: profile?.address || "",
    description: profile?.description || ""
  });

  // Chat Modal State
  const [chatText, setChatText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    "Vanakkam! Thank you for contacting Sri Vari Wedding Creations.",
    "Could you kindly share the wedding muhurtham date and expected guest count?"
  ]);

  // Calendar Event Form
  const [calDate, setCalDate] = useState("2026-11-25");
  const [calStatus, setCalStatus] = useState("Booked");

  if (!activeModal) return null;

  const modalType = activeModal.type;
  const modalPayload = activeModal.payload;

  return (
    <>
      {/* 1. Add Service Package Modal */}
      {modalType === "addService" && (
        <Modal title="Add New Service Package" onClose={closeModal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const ok = addService(serviceForm);
              if (ok) closeModal();
            }}
            className="stack-form"
          >
            <label className="field">
              <span>Service Name</span>
              <div className="input-wrap">
                <input
                  required
                  placeholder="e.g. Candid Wedding Photography"
                  value={serviceForm.name}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, name: e.target.value })
                  }
                />
              </div>
            </label>

            <label className="field">
              <span>Package Description</span>
              <textarea
                rows={3}
                placeholder="Describe what is included in this wedding package..."
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, description: e.target.value })
                }
              />
            </label>

            <div className="form-grid">
              <label className="field">
                <span>Package Price</span>
                <div className="input-wrap">
                  <input
                    type="text"
                    required
                    placeholder="XXXX"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, price: e.target.value })
                    }
                  />
                </div>
              </label>

              <label className="field">
                <span>Coverage Duration</span>
                <div className="input-wrap">
                  <input
                    placeholder="e.g. 8 hours or Full Day"
                    value={serviceForm.duration}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, duration: e.target.value })
                    }
                  />
                </div>
              </label>

              <label className="field">
                <span>Photos Included</span>
                <div className="input-wrap">
                  <input
                    type="number"
                    value={serviceForm.photos}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, photos: e.target.value })
                    }
                  />
                </div>
              </label>

              <label className="field">
                <span>Videos Included</span>
                <div className="input-wrap">
                  <input
                    type="number"
                    value={serviceForm.videos}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, videos: e.target.value })
                    }
                  />
                </div>
              </label>
            </div>

            <button type="submit" className="btn primary">
              <Check size={16} /> Save Service Package
            </button>
          </form>
        </Modal>
      )}

      {/* 1.1 Edit Service Package Modal */}
      {modalType === "editService" && modalPayload && (
        <EditServiceModal
          service={modalPayload}
          onClose={closeModal}
          onUpdate={updateService}
          onDelete={deleteService}
        />
      )}

      {/* 2. Add Post Modal */}
      {modalType === "addPost" && (
        <Modal title="Publish New Wedding Work" onClose={closeModal}>
          <div className="stack-form">
            <label className="upload-zone">
              <Upload size={30} />
              <b>Choose a photo or video to upload</b>
              <small>JPG, PNG, WebP or MP4 · Client Showcase</small>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setPostFile(e.target.files?.[0] || null)}
              />
              {postFile && <span>Selected: {postFile.name}</span>}
            </label>

            <label className="field">
              <span>Write a Caption or Story</span>
              <textarea
                rows={3}
                placeholder="Tell couples about the mandapam concept, flowers used, or venue details..."
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="btn primary"
              onClick={() => {
                if (!postCaption.trim() && !postFile) {
                  notify("Please provide a caption or select a media file.");
                  return;
                }
                if (postFile) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    addPost({
                      caption: postCaption || "Wedding celebration moment",
                      src: reader.result,
                      file: postFile
                    });
                    setPostCaption("");
                    setPostFile(null);
                    closeModal();
                  };
                  reader.readAsDataURL(postFile);
                } else {
                  addPost({
                    caption: postCaption,
                    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                  });
                  setPostCaption("");
                  closeModal();
                }
              }}
            >
              Publish to Profile Gallery
            </button>
          </div>
        </Modal>
      )}

      {/* 3. Edit Profile Modal */}
      {modalType === "editProfile" && (
        <Modal title="Edit Public Profile" onClose={closeModal}>
          <form
            className="stack-form"
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile(editProfileForm);
              closeModal();
            }}
          >
            <label className="field">
              <span>Business / Brand Name</span>
              <div className="input-wrap">
                <Building2 size={17} />
                <input
                  required
                  value={editProfileForm.company}
                  onChange={(e) =>
                    setEditProfileForm({ ...editProfileForm, company: e.target.value })
                  }
                />
              </div>
            </label>

            <label className="field">
              <span>Operating City</span>
              <div className="input-wrap">
                <MapPin size={17} />
                <input
                  required
                  value={editProfileForm.city}
                  onChange={(e) =>
                    setEditProfileForm({ ...editProfileForm, city: e.target.value })
                  }
                />
              </div>
            </label>

            <label className="field">
              <span>Studio Address</span>
              <div className="input-wrap">
                <input
                  required
                  value={editProfileForm.address}
                  onChange={(e) =>
                    setEditProfileForm({ ...editProfileForm, address: e.target.value })
                  }
                />
              </div>
            </label>

            <label className="field">
              <span>About Your Craft & Services</span>
              <textarea
                rows={4}
                required
                value={editProfileForm.description}
                onChange={(e) =>
                  setEditProfileForm({ ...editProfileForm, description: e.target.value })
                }
              />
            </label>

            <button type="submit" className="btn primary">
              Save Profile Changes
            </button>
          </form>
        </Modal>
      )}

      {/* 4. Profile More Options */}
      {modalType === "profileMore" && (
        <Modal title="Profile Quick Actions" onClose={closeModal}>
          <div className="stack-form">
            <button
              className="btn secondary"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                notify("Public profile link copied.");
                closeModal();
              }}
            >
              <Share2 size={16} /> Copy Public Profile Link
            </button>

            <button
              className="btn secondary"
              onClick={() => {
                notify("Preview mode opened in active window.");
                closeModal();
              }}
            >
              <Eye size={16} /> Preview As Couple
            </button>

            <button
              className="btn secondary"
              onClick={() => {
                closeModal();
                navigate("/dashboard/analytics");
              }}
            >
              <ChartNoAxesCombined size={16} /> View Profile Reach & Insights
            </button>
          </div>
        </Modal>
      )}

      {/* 5. Enquiry Details Modal */}
      {modalType === "enquiryDetail" && modalPayload && (
        <Modal title={`Enquiry · ${modalPayload.name}`} onClose={closeModal}>
          <div className="stack-form">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                className={`status status-${modalPayload.status.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {modalPayload.status}
              </span>
              <small className="muted">{modalPayload.id}</small>
            </div>

            <div>
              <b style={{ fontSize: 15, display: "block", marginBottom: 4 }}>
                {modalPayload.service}
              </b>
              <p className="muted" style={{ fontSize: 12 }}>
                📅 {modalPayload.date} ({modalPayload.timeSlot})
              </p>
              <p className="muted" style={{ fontSize: 12 }}>
                📍 {modalPayload.venue}
              </p>
              <p className="muted" style={{ fontSize: 12 }}>
                💰 Budget: {modalPayload.budget} · {modalPayload.guests}
              </p>
            </div>

            <div className="couple-note">
              <b>Message from couple:</b>
              <p>"{modalPayload.note}"</p>
            </div>

            <button
              type="button"
              className="btn primary"
              onClick={() => {
                closeModal();
                openModal("chat", modalPayload);
              }}
            >
              <MessageCircle size={16} /> Open Couple Chat
            </button>
          </div>
        </Modal>
      )}

      {/* 6. Chat Modal */}
      {modalType === "chat" && (
        <Modal
          title={`VK Fest Hub Chat · ${modalPayload?.name || "Prospective Couple"}`}
          onClose={closeModal}
        >
          <div className="chat-window">
            <div className="chat-bubble incoming">
              Hello! We saw your mandapam decor on VK Fest Hub and loved your style. Are you
              available for our wedding on {modalPayload?.date || "the upcoming auspicious date"}?
            </div>

            {chatMessages.map((msg, idx) => (
              <div className="chat-bubble outgoing" key={idx}>
                {msg}
              </div>
            ))}
          </div>

          <div className="chat-compose">
            <input
              placeholder="Type your reply to the couple..."
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && chatText.trim()) {
                  setChatMessages([...chatMessages, chatText.trim()]);
                  setChatText("");
                }
              }}
            />
            <button
              onClick={() => {
                if (chatText.trim()) {
                  setChatMessages([...chatMessages, chatText.trim()]);
                  setChatText("");
                }
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </Modal>
      )}

      {/* 7. Calendar Day Modal */}
      {modalType === "calendarDay" && modalPayload && (
        <Modal
          title={`Date Status · ${modalPayload.dateKey}`}
          onClose={closeModal}
        >
          <p>
            Manage team availability and booking status for <b>{modalPayload.dateKey}</b>.
          </p>

          <div className="event-actions">
            {["Booked", "Auspicious", "Available"].map((status) => (
              <button
                key={status}
                type="button"
                className={`btn ${modalPayload.eventState === status ? "primary" : "secondary"}`}
                onClick={() => {
                  updateCalendarEvent(modalPayload.dateKey, status);
                  closeModal();
                }}
              >
                Mark as {status}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* 8. Add Calendar Event Modal */}
      {modalType === "addCalendarEvent" && (
        <Modal title="Add Custom Calendar Date" onClose={closeModal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (calDate) {
                updateCalendarEvent(calDate, calStatus);
                closeModal();
              }
            }}
            className="stack-form"
          >
            <label className="field">
              <span>Wedding / Event Date</span>
              <div className="input-wrap">
                <input
                  type="date"
                  required
                  value={calDate}
                  onChange={(e) => setCalDate(e.target.value)}
                />
              </div>
            </label>

            <label className="field">
              <span>Event Status</span>
              <select
                value={calStatus}
                onChange={(e) => setCalStatus(e.target.value)}
              >
                <option value="Booked">Confirmed Booking</option>
                <option value="Auspicious">Auspicious Tamil Muhurtham Date</option>
                <option value="Available">Available</option>
              </select>
            </label>

            <button type="submit" className="btn primary">
              Save Calendar Date
            </button>
          </form>
        </Modal>
      )}

      {/* 9. Account Settings Modal */}
      {modalType === "settings" && (
        <Modal title="Partner Account Settings" onClose={closeModal}>
          <div className="stack-form">
            <div className="settings-row">
              <span>Partner Account</span>
              <b>{vendor?.company || "Sri Vari Wedding Creations"}</b>
            </div>

            <div className="settings-row">
              <span>Username / Login ID</span>
              <b>{vendor?.username || "srivari_weddings"}</b>
            </div>

            <div className="settings-row">
              <span>Active Subscription</span>
              <b>{subscription?.plan || "Basic"} Plan (Monthly)</b>
            </div>

            <div className="settings-row">
              <span>Payment Status</span>
              <b>
                {payment ? (
                  <span style={{ color: "var(--green)" }}>Verified (Ref: {payment.reference})</span>
                ) : (
                  "Pending"
                )}
              </b>
            </div>

            <button
              className="btn secondary"
              onClick={() => {
                closeModal();
                navigate("/subscription");
              }}
            >
              Change Subscription Plan
            </button>

            <button
              className="btn danger"
              onClick={() => {
                logout();
                closeModal();
                navigate("/login");
              }}
            >
              <LogOut size={16} /> Sign out of Vendor Portal
            </button>
          </div>
        </Modal>
      )}

      {/* 10. Legal / Terms Modal */}
      {(modalType === "terms" || modalType === "privacy") && (
        <Modal
          title={modalType === "terms" ? "Partner Terms & Conditions" : "Privacy Policy"}
          onClose={closeModal}
        >
          <p>
            Welcome to the VK Fest Hub Vendor Partner Portal. This platform enables verified wedding
            vendors across Tamil Nadu to showcase their portfolios, communicate with couples, and
            manage ceremony schedules.
          </p>
          <br />
          <p>
            All demo information entered in this browser remains stored securely in your local
            environment. In live production, all vendor verification, client leads, and payment
            transactions are governed by VK Fest Hub's verified partner service agreements.
          </p>
        </Modal>
      )}
    </>
  );
}

function GlobalToast() {
  const { toast } = useVendor();
  if (!toast) return null;
  return (
    <div className="toast">
      <CheckCircle2 size={18} />
      <span>{toast}</span>
    </div>
  );
}

export {
  VendorContext,
  VendorProvider,
  useVendor,
  Modal,
  ProtectedRoute,
  GlobalModals,
  GlobalToast
};
