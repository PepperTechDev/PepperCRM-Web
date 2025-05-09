import DataListItem from "../../../components/dataListItem/pages/DataListItem";
import { CircleX, Pen } from "lucide-react";
import { deleteLead, getLeads, updateLead} from "../services/LeadService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";




const UserList = () => {
  const [users, setUsers] = useState([]);
  const MySwal = withReactContent(Swal);
    useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getLeads();
      setUsers(data);
    } catch (error) {
      alert("Failed to load users"+error);
    }
  };
  
  const handleDelete = async (id) => {
  let confirmDelete;await
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    confirmDelete = true;
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});

    if (!confirmDelete) return;
    try {
      await deleteLead(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const handleEdit = async (user) => {
  const { value: formValues } = await MySwal.fire({
    title: `Edit user ${user.id}`,
    html: `
      <input id="swal-input-name" class="swal2-input" placeholder="Name" value="${user.name}">
      <input id="swal-input-lastname" class="swal2-input" placeholder="Lastname" value="${user.lastname}">
      <input id="swal-input-email" class="swal2-input" placeholder="Email" value="${user.email}">
      <input id="swal-input-phone" class="swal2-input" placeholder="Phone" value="${user.phone}">
      <input id="swal-input-phone" class="swal2-input" placeholder="Phone" value="${user.service}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      return {
        ...user,
        name: document.getElementById('swal-input-name').value,
        lastname: document.getElementById('swal-input-lastname').value,
        email: document.getElementById('swal-input-email').value,
        phone: document.getElementById('swal-input-phone').value,
      };
    },
  });

  if (formValues) {
    try {
      await updateLead(formValues); 
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? formValues : u))
      );
      Swal.fire("Updated!", "User updated successfully.", "success");
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire("Error", "Failed to update user", "error");
    }
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
      <Pen onClick={() => handleEdit(item)}/>
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
