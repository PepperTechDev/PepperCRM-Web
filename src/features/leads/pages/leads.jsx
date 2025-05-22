import styles from"../styles/Leads.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import Table from "./LeadList"
function Leads() {
  return (
    <section className={styles.containerLeads}>
      <Sidebar />
      <div className={styles.flexLeads}>
      <Navbar />
      <Table />
      </div>
    </section>
  );
}

export default Leads;
