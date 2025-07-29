import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import './App.css'
import axios from "axios";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3300/api/auth/welcome", { withCredentials: true })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/home" /> : <LoginForm setAuthenticated={setAuthenticated} />} />
        <Route
          path="/home"
          element={
            authenticated ? (
              <Home setAuthenticated={setAuthenticated} />
            ) : (
              <Home to="/?error=noauth" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;