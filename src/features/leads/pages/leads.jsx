import styles from"../styles/Leads.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import LeadsTable from "../../../components/leads/LeadsTable";
import Navbar from "../../../components/navbar/pages/Navbar";
function Leads() {
  return (
    <section className={styles.containerLeads}>
      <Sidebar />
      <div className={styles.flexLeads}>
      <Navbar />
      <LeadsTable />
      </div>
    </section>
  );
}

export default Leads;
