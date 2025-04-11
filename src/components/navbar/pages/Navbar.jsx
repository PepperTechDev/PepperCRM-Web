import { useLocation, Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { Search, CircleHelp, CircleUser } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  // Divide la ruta actual en segmentos
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);
  return (
    <nav className={styles.headerBar}>
      <div className={styles.breadcrumb}>
      {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <span
              key={path}
              className={styles.section}
            >
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
        <CircleHelp className={styles.iconButton} size={24} strokeWidth={1.5} />
        <CircleUser className={styles.iconButton} size={24} strokeWidth={1.5} />
      </div>
    </nav>
  );
};

export default Navbar;
