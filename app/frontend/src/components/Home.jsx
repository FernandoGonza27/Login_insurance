import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ setAuthenticated }) {
 const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3300/api/auth/logout", {}, { withCredentials: true });
      console.log("Logout exitoso");
      setAuthenticated(false); 
      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <div>
      <h1>Usuario logueado satisfactoriamente</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Home;
