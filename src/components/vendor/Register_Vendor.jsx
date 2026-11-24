import React from "react";
import { VendorProvider, GlobalModals, GlobalToast } from "./context/VendorContext";
import VendorRegister from "./pages/VendorRegister";

export default function Register_Vendor() {
  return (
    <VendorProvider>
      <VendorRegister />
      <GlobalModals />
      <GlobalToast />
    </VendorProvider>
  );
}

export { VendorRegister };
