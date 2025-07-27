import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import './App.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/home" /> : <LoginForm setAuthenticated={setAuthenticated} />} />
        <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/?error=noauth" />} />
      </Routes>
    </Router>
  );
}

export default App;