import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
// Pages
import Auth from './pages/Auth';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Found from './pages/Found';
import Report from './pages/Report';
import Profile from './pages/Profile';
import Settings from './pages/Settings'; 
import About from './pages/About';
import Marketplace from './pages/Marketplace';
import CreateMarketItem from './pages/CreateMarketItem'; // named export

// Route protection
import PrivateRoute from './pages/PrivateRoute'; // default export

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/lost"
          element={
            <PrivateRoute>
              <Lost />
            </PrivateRoute>
          }
        />
        <Route
          path="/found"
          element={
            <PrivateRoute>
              <Found />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />

        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <Marketplace />
            </PrivateRoute>
          }
        />
        <Route
          path="/marketplace/create"
          element={
            <PrivateRoute>
              <CreateMarketItem />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route path="/profile/public/:id" 
        element={<Profile />} />

        {/* Public */}
        <Route path="/about" element={<About />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
