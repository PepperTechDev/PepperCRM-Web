import { leads } from "./LeadsDataExample";
// import { getLead, updateLead } from "../../services/leadsApi";
import { useState, useEffect } from "react";

function LeadsRows() {
  const [localLeads, setLocalLeads] = useState([]);
  const [editValues, setEditValues] = useState({});
  const [newLead, setNewLead] = useState({
    Name: "",
    Lastname: "",
    Email: "",
    Phone: "",
    Service: "",
  });

  useEffect(() => {
    const activeLeads = leads.filter((lead) => lead.State);
    setLocalLeads(activeLeads);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (confirm) {
      const leadIndex = localLeads.findIndex((lead) => lead.Id === id);
      if (leadIndex !== -1) {
        localLeads[leadIndex].State = false;
        alert("Lead successfully deleted (logical deletion) ✅");
        const activeLeads = leads.filter((lead) => lead.State);
        setLocalLeads(activeLeads);
      }
    }
  };

  const handleEditChange = (id, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = (id) => {
    const updatedLead = {
      ...localLeads.find((lead) => lead.Id === id),
      ...editValues[id],
    };

    const updated = localLeads.map((lead) =>
      lead.Id === id ? updatedLead : lead
    );
    setLocalLeads(updated);
    console.log("Lead updated:", updatedLead);
    alert("Lead updated locally ✅");
  };

  const handleNewLeadChange = (field, value) => {
    setNewLead((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNewLead = () => {
    const { Name, Lastname, Email, Phone, Service } = newLead;

    // Validar campos vacíos
    if (!Name || !Lastname || !Email || !Phone || !Service) {
      alert("All fields are required ❌");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      alert("Invalid email address ❌");
      return;
    }

    // Validar que el teléfono solo tenga números
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(Phone)) {
      alert("Phone number must contain only numbers ❌");
      return;
    }

    // Crear el nuevo lead
    const newId = Date.now();
    const leadToAdd = {
      Id: newId,
      ...newLead,
      State: true,
    };

    setLocalLeads([...localLeads, leadToAdd]);
    setNewLead({
      Name: "",
      Lastname: "",
      Email: "",
      Phone: "",
      Service: "",
    });

    console.log("New lead added:", leadToAdd);
    alert("New lead added ✅");
  };

  return (
    <>
      {localLeads.map((lead) => (
        <tr key={lead.Id}>
          <td>
            <input
              type="text"
              value={editValues[lead.Id]?.Name || lead.Name}
              onChange={(e) =>
                handleEditChange(lead.Id, "Name", e.target.value)
              }
            />
          </td>
          <td>
            <input
              type="text"
              value={editValues[lead.Id]?.Lastname || lead.Lastname}
              onChange={(e) =>
                handleEditChange(lead.Id, "Lastname", e.target.value)
              }
            />
          </td>
          <td>
            <input
              type="email"
              value={editValues[lead.Id]?.Email || lead.Email}
              onChange={(e) =>
                handleEditChange(lead.Id, "Email", e.target.value)
              }
            />
          </td>
          <td>
            <input
              type="text"
              value={editValues[lead.Id]?.Phone || lead.Phone}
              onChange={(e) =>
                handleEditChange(lead.Id, "Phone", e.target.value)
              }
            />
          </td>
          <td>
            <input
              type="text"
              value={editValues[lead.Id]?.Service || lead.Service}
              onChange={(e) =>
                handleEditChange(lead.Id, "Service", e.target.value)
              }
            />
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
              onClick={() => handleSave(lead.Id)}
              style={{ cursor: "pointer" }}
            >
              ✏️
            </a>
          </td>
        </tr>
      ))}

      <tr>
        <td>
          <input
            type="text"
            placeholder="Name"
            value={newLead.Name}
            onChange={(e) => handleNewLeadChange("Name", e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Lastname"
            value={newLead.Lastname}
            onChange={(e) => handleNewLeadChange("Lastname", e.target.value)}
          />
        </td>
        <td>
          <input
            type="email"
            placeholder="Email"
            value={newLead.Email}
            onChange={(e) => handleNewLeadChange("Email", e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Phone"
            value={newLead.Phone}
            onChange={(e) => handleNewLeadChange("Phone", e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Service"
            value={newLead.Service}
            onChange={(e) => handleNewLeadChange("Service", e.target.value)}
          />
        </td>
        <td colSpan={2}>
          <a
            onClick={handleAddNewLead}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          >
            Create 😈🙏🏻👅
          </a>
        </td>
      </tr>
    </>
  );
}

export default LeadsRows;
