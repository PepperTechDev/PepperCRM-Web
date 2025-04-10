// Mini base de datos simulada
export const leads = [
  {
    Id: 1,
    Name: "Juan",
    Lastname: "Pérez",
    Email: "juan@example.com",
    Phone: "123456789",
    Service: "Consultoría",
    State: true,
  },
  {
    Id: 2,
    Name: "Ana",
    Lastname: "Gómez",
    Email: "ana@example.com",
    Phone: "987654321",
    Service: "Soporte",
    State: true,
  },
  {
    Id: 3,
    Name: "Carlos",
    Lastname: "Rodríguez",
    Email: "carlos@example.com",
    Phone: "555555555",
    Service: "Desarrollo",
    State: true,
  },
];

console.table(leads);
