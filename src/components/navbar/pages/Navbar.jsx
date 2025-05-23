import { removeToken } from "../../../features/auth/services/authService";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { Search, User, LogOut, CircleHelp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();

  // Divide la ruta actual en segmentos
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  // Le coloca la ruta al boton de ayuda
  const navigate = useNavigate();
  const handleHelpClick = () => {
    navigate("/help");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {menuOpen && <div className={styles.overlay} />}
      <nav className={styles.headerBar}>
        <div className={styles.breadcrumb}>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <span key={path} className={styles.section}>
                {!isLast ? (
                  <Link to={path} className={styles.link}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                ) : (
                  segment.charAt(0).toUpperCase() + segment.slice(1)
                )}
                {!isLast && <span className={styles.separator}>&gt;</span>}
              </span>
            );
          })}
        </div>
        <div className={styles.searchWrapper}>
          <Search size={24} strokeWidth={1.5} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
          />
        </div>
        <div className={styles.icons}>
          <CircleHelp
            className={styles.iconButton}
            size={24}
            strokeWidth={1.5}
            onClick={handleHelpClick}
          />
          <div
            ref={userMenuRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <User
              className={styles.iconButton}
              size={24}
              strokeWidth={1.5}
              onClick={() => setMenuOpen((open) => !open)}
              style={{ cursor: "pointer" }}
            />
            {menuOpen && (
              <div className={styles.userMenu}>
                <NavLink
                  to="/profile/edit"
                  className={styles.menuItem}
                  onClick={() => setMenuOpen(false)}
                >
                  Profile edit
                </NavLink>
              </div>
            )}
          </div>
          <LogOut
            className={styles.iconButton}
            size={24}
            strokeWidth={1.5}
            onClick={removeToken}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
