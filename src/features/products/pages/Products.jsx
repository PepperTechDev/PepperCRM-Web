import styles from"../styles/Products.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import Table from "./ProductsList"
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
