import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Auth from './pages/Auth';             // default export
import { Home } from './pages/Home';        // named export
import Lost from './pages/Lost';            // default export
import Found from './pages/Found';          // default export
import Report from './pages/Report';        // default export
import Profile from './pages/Profile';      // default export
import Settings from './pages/Settings'; // named export
import { About } from './pages/About';       // named export

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
