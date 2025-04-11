import styles from "../styles/Leads.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import UserList from "../../../components/dataListItem/UserList";

function Leads() {
  return (
    <section className={styles.containerLeads}>
      <Sidebar />
      <div className={styles.flexLeads}>
        <Navbar />
        <UserList />
      </div>
    </section>
  );
}

export default Leads;
