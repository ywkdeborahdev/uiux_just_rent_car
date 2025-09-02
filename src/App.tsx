import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
// import './App.css'

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
          <Route path="/" element={<MainPage language={language} t={t} />} />
          <Route path="/login" element={<LoginPage t={t} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
