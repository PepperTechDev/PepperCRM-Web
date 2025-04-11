import React from "react";
import styles from"../styles/Leads.modules.css";
import LeadsTable from "../../../components/leads/LeadsTable";
function Leads() {
  return (
    <section className={styles.containerLeads}>
      <LeadsTable />

    </section>
  );
}

export default Leads;
