import DataListItem from "../../../components/dataListItem/pages/DataListItem";
import { CircleX, Pen } from "lucide-react";
import { getContacts, createContacts, updateContacts, deleteContacts } from "../services/ContactService";

const ContactList = () => {
  
const userData = [];
  const renderHeaders = () => (
    <>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Actions</th>
    </>
  );

  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
        <CircleX onClick={() => updateContacts(item.id)} />
        <Pen onClick={() => deleteContacts(item.id, item)} />
      </td>
    </>
  );

  return (
    <DataListItem
      data={userData}
      renderHeaders={renderHeaders}
      renderRow={renderRow}
      emptyMessage="No contacts available"
    />
  );
};

export default ContactList;
