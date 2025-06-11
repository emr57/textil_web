import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";     // Home bileşeni
import Login from "./pages/Login";   // Login bileşeni
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-white text-blue-900 overflow-x-hidden">
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
