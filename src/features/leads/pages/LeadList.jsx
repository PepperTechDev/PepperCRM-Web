import DataListItem from "../../../components/dataListItem/pages/DataListItem";
import { CircleX, Pen } from "lucide-react";
import { deleteLead, getLeads} from "../services/LeadService";
import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

    useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getLeads();
      setUsers(data);
    } catch (error) {
      console.error("Error loading leads:", error);
    }
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteLead(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const renderHeaders = () => (
  <>
    <th>Id</th>
    <th>Name</th>
    <th>Lastname</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Service</th>
    <th>Delete</th>
    <th>Edit</th>
  </>
);

const renderRow = (item) => (
  <>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.lastname}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.service}</td>
    <td>
      <CircleX onClick={() => handleDelete(item.id)}/>
    </td>
    <td>
      <Pen />
    </td>
  </>
);

  return (
    <DataListItem
      data={users}
      renderHeaders={renderHeaders}
      renderRow={renderRow}
      emptyMessage="No leads available"
    />
  );
};

export default UserList;
