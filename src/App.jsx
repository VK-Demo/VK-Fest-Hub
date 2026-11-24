import { Routes, Route, HashRouter, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Preloader from './components/common/Preloader';
import Login_Preloader from './components/common/Login_Preloader';
import Main_Landing_Page from './components/common/Main_Landing_Page';
import Services_User from './components/users/Services_User';
import Matrimony from './components/users/Matrimony';
import Booking_User from './components/users/Booking_User';
import Chat_User from './components/users/Chat_User';
import Photos_Videos from './components/users/Photos_Videos';
import Login_User from './components/users/Login_User';
import Register_User from './components/users/Register_User';
import Login_Vendor from './components/vendor/Login_Vendor';
import Register_Vendor from './components/vendor/Register_Vendor';
import Vendor_dashboard from './components/vendor/Vendor_dashboard';
import { VendorProvider } from './components/vendor/context/VendorContext';
const Vendor_Landing_Page = Vendor_dashboard;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable native browser scroll restoration so refresh always opens from top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Fallback raf to override any late browser layout shifts
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}

function App () {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    AOS.init({
      duration:1200,
      easing: 'ease-in-out',
    })
  }, [] );

  return(
    <>
      {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}
      <HashRouter>
        <VendorProvider>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={< Main_Landing_Page />} />
            <Route path='/services' element={< Services_User />} />
            <Route path='/matrimony' element={< Matrimony />} />
            <Route path='/booking' element={< Booking_User />} />
            <Route path='/chats' element={< Chat_User />} />
            <Route path='/chat' element={< Chat_User />} />
            <Route path='/media' element={< Photos_Videos />} />
            {/* Auth Routes */}
            <Route path='/login-user' element={< Login_User />} />
            <Route path='/login-vendor' element={< Login_Vendor />} />
            <Route path='/vendor-login' element={< Login_Vendor />} />
            <Route path='/register-user' element={< Register_User />} />
            <Route path='/register-vendor' element={< Register_Vendor />} />
            <Route path='/register' element={< Register_Vendor />} />
            <Route path='/login' element={< Login_Preloader />} />
            {/* Vendor Routes */}
            <Route path='/vendor/*' element={< Vendor_dashboard />} />
            <Route path='/vendor-landing/*' element={< Vendor_dashboard />} />
            <Route path='/dashboard/*' element={< Vendor_dashboard />} />
            <Route path='/vendor-details/*' element={< Vendor_dashboard />} />
            <Route path='/subscription/*' element={< Vendor_dashboard />} />
            <Route path='/payment/*' element={< Vendor_dashboard />} />
          </Routes>
        </VendorProvider>
      </HashRouter>
    </>
  )
}

export default App;
