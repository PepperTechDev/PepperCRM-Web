import { leads } from "../../assets/Leads";
import {
  getLeads,
  createLead,
  deleteLead,
  getLead,
  updateLead,
} from "../../services/leadsApi";
function GroupRows() {
  const Lead = leads;

  // const [leads, setLeads] = useState([]);
  // useEffect(() => {
  //   const fetchLeads = async () => {
  //     const response = await getLeads();
  //     setLeads(response.data);
  //   };
  //   fetchLeads();
  // }, []);
  // console.log(leads);
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (confirm) {
      await deleteLead(id);
      alert("Lead deleted successfully!");
      // setLeads(leads.filter((lead) => lead.Id !== id));
    } 
  };
  const handleEdit = async (id) => {
    const lead = await getLead(id);
    const updatedLead = { ...lead, Name: "Updated Name" };
    await updateLead(id, updatedLead);
    alert("Lead updated successfully!");
    // setLeads(leads.map((lead) => (lead.Id === id ? updatedLead : lead)));
  };
  const handleAdd = async (id) => {
    const lead = await getLead(id);
    const newLead = { ...lead, Id: Date.now() };
    await createLead(newLead);
    alert("Lead added successfully!");
    // setLeads([...leads, newLead]);
  };

  return (
    <>
      {leads.map((lead) => (
        <tr key={lead.Id}>
          <td>{lead.Name + " " + lead.Lastname}</td>
          <td>{lead.Email}</td>
          <td>{lead.Phone}</td>
          <td>{lead.Service}</td>
          <td>
            <a onClick={() => handleAdd(lead.Id)} style={{ cursor: "pointer" }}>
              ➕
            </a>
          </td>
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
