import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import logo from "../../../assets/images/PapperTech_logo_colored_text.png";
import Input from "../../../components/forms/Input";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token); // Guarda token
      navigate("/leads"); // Redirige al módulo principal
    } catch (err) {
      setError("Credenciales inválidas: " + err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Sección de la imagen */}
      <div className="image-section">
        <div className="image-placeholder">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {/* Sección del formulario */}
      <div className="form-section">
        <h2>Log In</h2>
        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />    
          <p className="info-text">
            It must be a combination of at least 8 letters, numbers, and
            symbols.
          </p>
          <div className="links">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
