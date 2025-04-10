import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Página no encontrada</h1>
      <p className={styles.message}>
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link to="/login" className={styles.homeLink}>
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;