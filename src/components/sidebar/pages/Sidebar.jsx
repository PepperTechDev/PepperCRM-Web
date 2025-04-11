import logo from "../../../assets/images/PepperTech_logo_sin_fondo.png";
import styles from "../styles/Sidebar.module.css";
import { UserPlus, Users, Handshake, Package, Building2, FileText, CheckSquare, Phone, Video, File, Calendar } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Leads", icon: <UserPlus size={24} strokeWidth={1.5} /> },
    { name: "Contacts", icon: <Users size={24} strokeWidth={1.5} /> },
    { name: "Deals", icon: <Handshake size={24} strokeWidth={1.5} /> },
    { name: "Products", icon: <Package size={24} strokeWidth={1.5} /> },
    { name: "Vendors", icon: <Building2 size={24} strokeWidth={1.5} /> },
    { name: "Quotes", icon: <FileText size={24} strokeWidth={1.5} /> },
    { name: "Task", icon: <CheckSquare size={24} strokeWidth={1.5} /> },
    { name: "Calls", icon: <Phone size={24} strokeWidth={1.5} /> },
    { name: "Meets", icon: <Video size={24} strokeWidth={1.5} /> },
    { name: "Forms", icon: <File size={24} strokeWidth={1.5} /> },
    { name: "Calendar", icon: <Calendar size={24} strokeWidth={1.5} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>
          <img src={logo} alt="PepperTech" />
        </span>
        <h1 className={styles.logoText}>PepperTech</h1>
      </div>
      <nav className={styles.menu}>
        <p className={styles.sectionTitle}>Main</p>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <span>{item.icon}</span>
              <a href={item.name}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
