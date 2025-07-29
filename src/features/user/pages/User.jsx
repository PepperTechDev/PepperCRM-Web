import styles from "../styles/User.module.css";
import Sidebar from "../../../components/sidebar/pages/Sidebar";
import Navbar from "../../../components/navbar/pages/Navbar";
import Profile from "./Profile";

function User() {
    return (
        <section className={styles.containerUser}>
            <Sidebar/>
            <div className={styles.flexUser}>
                <Navbar/>
                <Profile/>
            </div>
        </section>
    );
}

export default User;
