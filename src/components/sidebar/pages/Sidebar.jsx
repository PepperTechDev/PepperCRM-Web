import "../styles/sidebar.module.css";
import logo from "../../../assets/images/PepperTech_logo_sin_fondo.png";
import { UserSearch } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: "Leads" },
    { name: "Contacts" },
    { name: "Deals" },
    { name: "Products" },
    { name: "Vendors" },
    { name: "Quotes" },
    { name: "Task" },
    { name: "Calls" },
    { name: "Meets" },
    { name: "Forms" },
    { name: "Calendar" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">
          <img src={logo} alt="" />
        </span>
        <h1 className="logo-text">PepperTech</h1>
      </div>
      <nav className="menu">
        <p className="section-title">Main</p>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <UserSearch size={24} strokeWidth={1} />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;