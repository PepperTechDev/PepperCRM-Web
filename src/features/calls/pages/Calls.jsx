import styles from "../styles/Call.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import CallsList from "./CallList";

function Contacts() {
    return (
        <section className={styles.containerCalls}>
            <Sidebar/>
            <div className={styles.flexCalls}>
                <Navbar/>
                <CallsList/>
            </div>
        </section>
    );
}

export default Contacts;