import styles from "../styles/Contact.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import ContactList from "./ContactList";

function Contacts() {
  return (
    <section className={styles.containerContacts}>
      <Sidebar />
      <div className={styles.flexContacts}>
        <Navbar />
        <ContactList />
      </div>
    </section>
  );
}

export default Contacts;