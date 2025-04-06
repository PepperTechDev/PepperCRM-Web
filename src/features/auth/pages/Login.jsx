import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import logo from "../../../assets/images/PapperTech_logo_colored_text.png";
import Input from "../../../components/forms/pages/Input";
import style from "../styles/Login.module.css";

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
    <div className={style.loginContainer}>
      {/* Sección de la imagen */}
      <div className={style.imageSection}>
        <div className={style.imagePlaceholder}>
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {/* Sección del formulario */}
      <div className={style.formSection}>
        <h2>Log In</h2>
        {error && (
          <p className={style.error} style={{ color: "red" }}>
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
          <p className={style.infoText}>
            It must be a combination of at least 8 letters, numbers, and
            symbols.
          </p>
          <div className={style.links}>
            <a href="#">Forgot Password?</a>
          </div>
          <button className={style.submit} type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
