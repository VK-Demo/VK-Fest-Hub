import React from "react";
import { VendorProvider, GlobalModals, GlobalToast } from "./context/VendorContext";
import VendorLogin from "./pages/VendorLogin";

export default function Login_Vendor() {
  return (
    <VendorProvider>
      <VendorLogin />
      <GlobalModals />
      <GlobalToast />
    </VendorProvider>
  );
}

export { VendorLogin };
