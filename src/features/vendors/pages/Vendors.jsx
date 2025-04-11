import styles from"../styles/Vendors.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import Table from "./VendorsList"
function Vendors() {
  return (
    <section className={styles.containerVendors}>
      <Sidebar />
      <div className={styles.flexVendors}>
      <Navbar />
      <Table />
      </div>
    </section>
  );
}

export default Vendors;
