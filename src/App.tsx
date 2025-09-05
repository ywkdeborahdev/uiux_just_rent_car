import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

import MainPage from './pages/MainPage';
import OtherServicesPage from './pages/OtherServicesPage';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessagePage from './pages/MessagePage';
import CarDetailPage from './pages/CarDetailPage';
import BookingPage from './pages/BookingPage';
import { useTranslation } from './hooks/useTranslation';
import { AuthProvider } from './context/AuthContext';


function App() {
  const [language, setLanguage] = useState('Chinese');
  const { t } = useTranslation(language);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* The Header is placed outside <Routes> so it's shared on every page */}
        <Header language={language} setLanguage={setLanguage} t={t} />

        {/* The <Routes> component handles which page to show based on the URL */}
        <Routes>
          <Route path="/" element={<MainPage t={t} />} />
          <Route path="/services" element={<OtherServicesPage t={t} />} />
          <Route path="/contact-us" element={<ContactUsPage t={t} />} />
          <Route path="/login" element={<LoginPage t={t} />} />
          <Route path="/register" element={<RegisterPage t={t} />} />
          <Route path="/message" element={<MessagePage t={t} />} />
          <Route path="/car/:carId" element={<CarDetailPage t={t} />} />
          <Route path="/booking/:carId" element={<BookingPage t={t} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
