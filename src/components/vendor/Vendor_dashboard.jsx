import React from "react";
import {
  BrowserRouter,
  useLocation,
  useInRouterContext
} from "react-router-dom";

import {
  VendorProvider,
  useVendor,
  GlobalModals,
  GlobalToast,
  Logo,
  ProtectedRoute
} from "./context/VendorContext";

import VendorRegister from "./pages/VendorRegister";
import VendorLogin from "./pages/VendorLogin";
import VendorDetails from "./pages/VendorDetails";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import PublicProfile from "./pages/dashboard/PublicProfile";
import Portfolio from "./pages/dashboard/Portfolio";
import Enquiries from "./pages/dashboard/Enquiries";
import Calendar from "./pages/dashboard/Calendar";
import Analytics from "./pages/dashboard/Analytics";
import Reviews from "./pages/dashboard/Reviews";

import {
  STORAGE_KEY,
  CATEGORIES,
  CATEGORY_SERVICE_PRESETS,
  DEFAULT_PRESETS,
  PLANS,
  initialSeed,
  readStore,
  saveStore,
  money,
  getInitials
} from "./utils/storage";

function VendorRouterView() {
  const location = useLocation();
  const path = (location.pathname || "/dashboard").toLowerCase();

  // Onboarding & Auth views
  if (path.startsWith("/register")) {
    return <VendorRegister />;
  }
  if (path.startsWith("/login")) {
    return <VendorLogin />;
  }
  if (path.startsWith("/vendor-details")) {
    return <VendorDetails />;
  }
  if (path.startsWith("/subscription")) {
    return <Subscription />;
  }
  if (path.startsWith("/payment")) {
    return <Payment />;
  }

  // Dashboard Sub-views
  let childContent = <Overview />;
  if (path.includes("/profile")) {
    childContent = <PublicProfile />;
  } else if (path.includes("/portfolio")) {
    childContent = <Portfolio />;
  } else if (path.includes("/enquiries")) {
    childContent = <Enquiries />;
  } else if (path.includes("/calendar")) {
    childContent = <Calendar />;
  } else if (path.includes("/analytics")) {
    childContent = <Analytics />;
  } else if (path.includes("/reviews")) {
    childContent = <Reviews />;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>{childContent}</DashboardLayout>
    </ProtectedRoute>
  );
}

function RouterWrapper({ children }) {
  const inRouter = useInRouterContext();
  if (inRouter) {
    return <>{children}</>;
  }
  return <BrowserRouter>{children}</BrowserRouter>;
}

export default function App() {
  return (
    <VendorProvider>
      <RouterWrapper>
        <VendorRouterView />
        <GlobalModals />
        <GlobalToast />
      </RouterWrapper>
    </VendorProvider>
  );
}

export const Vendor_dashboard = App;
export {
  VendorProvider,
  useVendor,
  Logo,
  GlobalModals,
  GlobalToast,
  VendorLogin,
  VendorRegister,
  VendorDetails,
  Subscription,
  Payment,
  DashboardLayout,
  Overview,
  PublicProfile,
  Portfolio,
  Enquiries,
  Calendar,
  Analytics,
  Reviews,
  STORAGE_KEY,
  CATEGORIES,
  CATEGORY_SERVICE_PRESETS,
  DEFAULT_PRESETS,
  PLANS,
  initialSeed,
  readStore,
  saveStore,
  money,
  getInitials
};
