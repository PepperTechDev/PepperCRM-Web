import { leads } from "./LeadsDataExample";
import {
  getLeads,
  createLead,
  deleteLead,
  getLead,
  updateLead,
} from "../../services/leadsApi";
import { useState } from "react";
import { useEffect } from "react";
function GroupRows() {
  const Lead = leads;
  const [localLeads, setLocalLeads] = useState([]);

  // const [leads, setLeads] = useState([]);
  // useEffect(() => {
  //   const fetchLeads = async () => {
  //     const response = await getLeads();
  //     setLeads(response.data);
  //   };
  //   fetchLeads();
  // }, []);
  // console.log(leads);

  useEffect(() => {
    // Simula un fetch desde la "base de datos"
    const activeLeads = leads.filter((lead) => lead.State);
    setLocalLeads(activeLeads);
  }, []);
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (confirm) {
      const leadIndex = leads.findIndex((lead) => lead.Id === id);
      if (leadIndex !== -1) {
        leads[leadIndex].State = false;
        alert("Lead deleted (logically) successfully!");
        const activeLeads = leads.filter((lead) => lead.State);
        setLocalLeads(activeLeads);
      }
    }
  };

  const handleEdit = async (id) => {
    const lead = await getLead(id);
    const updatedLead = { ...lead, Name: "Updated Name" };
    await updateLead(id, updatedLead);
    alert("Lead updated successfully!");
    // setLeads(leads.map((lead) => (lead.Id === id ? updatedLead : lead)));
  };

  return (
    <>
      {localLeads
        .filter((lead) => lead.State)
        .map((lead) => (
          <tr key={lead.Id}>
            <td>{lead.Name + " " + lead.Lastname}</td>
            <td>{lead.Email}</td>
            <td>{lead.Phone}</td>
            <td>{lead.Service}</td>
            <td>
              <a
                onClick={() => handleDelete(lead.Id)}
                style={{ cursor: "pointer" }}
              >
                ❌
              </a>
            </td>
            <td>
              <a
                onClick={() => handleEdit(lead.Id)}
                style={{ cursor: "pointer" }}
              >
                ✏️
              </a>
            </td>
          </tr>
        ))}
    </>
  );
}

export default GroupRows;
