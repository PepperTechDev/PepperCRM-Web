import DataListItem from "../../../components/dataListItem/pages/DataListItem";

const userData = [
  { id: 1, name: "Jhoan Esteban", lastname: "Londoño Escobar",email: "devlondono@gmail.com", phone: "3192061970", service: "Service 1" },
  { id: 2, name: "Jorge Andrés", lastname: "Rojas Sepúlveda",email: "Jorge_rojas82212@elpoli.edu.co", phone: "323 5312623", service: "Service 1" }
];

const renderHeaders = () => (
  <>
    <th>Id</th>
    <th>Name</th>
    <th>Lastname</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Service</th>
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

export default UserList;