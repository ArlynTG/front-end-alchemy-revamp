
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ParentDashboardV2 from './pages/ParentDashboardV2';
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Contact id="contact" />
          </main>
        </div>
      } />
      <Route path="/parent-dashboard-v2" element={<ParentDashboardV2 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
