import styles from"../styles/Quotes.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import Table from "./QuotesList"
function Quotes() {
  return (
    <section className={styles.containerQuotes}>
      <Sidebar />
      <div className={styles.flexQuotes}>
      <Navbar />
      <Table />
      </div>
    </section>
  );
}

export default Quotes;
