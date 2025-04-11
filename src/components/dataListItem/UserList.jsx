import DataListItem from "../dataListItem/pages/DataListItem";

const userData = [
  { id: 1, name: "Jhoan Esteban Londoño Escobar", email: "devlondono@gmail.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 4, name: "Jane Smith", email: "jane@example.com" },

];

const renderHeaders = () => (
  <>
    <th>Cedula</th>
    <th>Name</th>
    <th>Email</th>
    <th>Prueba</th>
  </>
);

const renderRow = (item) => (
  <>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.prueba}</td>
  </>
);

const UserList = () => {
  return (
    <DataListItem
      data={userData}
      renderHeaders={renderHeaders}
      renderRow={renderRow}
      emptyMessage="No users available"
    />
  );
};

export default UserList;