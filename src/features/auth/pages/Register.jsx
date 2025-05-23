import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import logo from "../../../assets/images/PapperTech_logo_colored_text.png";
import Input from "../../../components/forms/pages/Input";
import styles from "../styles/Auth.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, ] = useState("USER"); // Valor por defecto

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    setError("");
    try {
      const data = await register({
        name,
        lastname,
        email,
        password,
        role,
      });
      if (data.token) {
        navigate("/"); // Redirige al módulo principal
      }
    } catch (err) {
      setError("No fue posible registrarse: " + err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Sección de la imagen */}
      <div className={styles.imageSection}>
        <div className={styles.imagePlaceholder}>
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {/* Sección del formulario */}
      <div className={styles.formSection}>
        <h2>Register</h2>
        {error && (
          <p className={styles.error} style={{ color: "red" }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.nameContainer}>
            <Input
              label="Name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="last Name"
              name="lastName"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <Input
            label="Email"
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
          <p className={styles.infoText}>
            It must be a combination of at least 8 letters, numbers, and
            symbols.
          </p>

          <button className={styles.submit} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
