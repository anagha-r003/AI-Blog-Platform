import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Dashboard from "../pages/private/Dashboard";
import Explore from "../pages/private/Explore";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root URL to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />

        {/* Unknown Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;