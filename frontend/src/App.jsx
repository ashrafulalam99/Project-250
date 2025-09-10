import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Auth from './pages/Auth';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Found from './pages/Found';
import Report from './pages/Report';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate'; 
import About from './pages/About';
import Marketplace from './pages/Marketplace';
import CreateMarketItem from './pages/CreateMarketItem';
import Notification from './pages/Notification';
import MarketplaceItemPage from './pages/MarketplaceItemPage';
import ItemPage from './pages/ItemPage';

// Route protection
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/public/:id" element={<Profile />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/lost" element={<PrivateRoute><Lost /></PrivateRoute>} />
        <Route path="/found" element={<PrivateRoute><Found /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
        <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
        <Route path="/marketplace/create" element={<PrivateRoute><CreateMarketItem /></PrivateRoute>} />
        <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/profileupdate" element={<PrivateRoute><ProfileUpdate /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notification /></PrivateRoute>} />

        {/* Notification clickable item detail routes */}
        <Route path="/marketplace/:id" element={<PrivateRoute><MarketplaceItemPage /></PrivateRoute>} />
        <Route path="/items/:id" element={<PrivateRoute><ItemPage /></PrivateRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
