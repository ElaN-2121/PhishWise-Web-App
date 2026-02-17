import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import PrivateRoute from "./components/common/PrivateRoute.jsx";

import Home from "./pages/Home.jsx";
import Learn from "./pages/Learn.jsx";
import PhishingDetail from "./pages/PhishingDetail.jsx";
import Quiz from "./pages/Quiz.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./styles/App.css";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="app-container">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:slug" element={<PhishingDetail />} />

          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
