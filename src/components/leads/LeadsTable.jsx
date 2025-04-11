import LeadsRows from "./LeadsRows";
import styles from "./Leads.module.css";

function LeadsTable() {
  return (
    <>
      <h2 className={styles.table_titles}>Leads</h2>
      <section className={styles.appointments_content__container}>
        <table className={styles.appointments__table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <LeadsRows />
          </tbody>
        </table>
      </section>
    </>
  );
}

export default LeadsTable;
