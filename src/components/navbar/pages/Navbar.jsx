import styles from "../styles/Navbar.module.css";
import { Search, CircleHelp,CircleUser   } from "lucide-react";

const Navbar = () => {
  return (
    <nav className={styles.headerBar}>
      <div className={styles.breadcrumb}>
        <span className={styles.section}>Meets</span>
        <span className={styles.separator}>&gt;</span>
        <span className={styles.current}>All</span>
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
        <CircleHelp className={styles.iconButton}  size={24} strokeWidth={1.5} />
        <CircleUser className={styles.iconButton}  size={24} strokeWidth={1.5} />
      </div>
    </nav>
  );
};

export default Navbar;
