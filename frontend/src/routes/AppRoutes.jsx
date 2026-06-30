import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Dashboard from "../pages/private/Dashboard";
import AIGeneration from "../pages/private/AIGeneration";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root URL to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Route (temporary) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-generation" element={<AIGeneration />} />

        {/* Unknown Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;