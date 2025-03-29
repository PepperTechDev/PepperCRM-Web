import { useState, useEffect } from "react";
//import { getUsers } from ""; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      //TO DO hacer el metodo para consumir el servicio
      const usersData = [{"name":"jorge"},{"name":"jorge2"},{"name":"jorge3"}];
      setUsers(usersData);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <article>
      <h2>Lista de Usuarios</h2>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles</p>
      )}
    </article>
  );
};

export default Users;
