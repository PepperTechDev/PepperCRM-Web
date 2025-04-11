import DataListItem from "../../../components/dataListItem/pages/DataListItem";
import { CircleX, Pen } from "lucide-react";
import { getQuotes, createQuotes, updateQuotes, deleteQuotes } from "../services/QuotesService";


const userData = [
  {
    id: 1,
    deal: "Spring Sale",
    products: {
      101: { id: 101, name: "Wireless Mouse" },
      102: { id: 102, name: "Mechanical Keyboard" },
      103: { id: 102, name: "Mechanical Keyboard" },
      104: { id: 102, name: "Mechanical Keyboard" },
      105: { id: 102, name: "Mechanical Keyboard" },
    },
    price: 99.99,
    expirationDate: "2025-05-01T00:00:00Z",
  },
  {
    id: 2,
    deal: "Back to School",
    products: {
      201: { id: 201, name: "Laptop Backpack" },
      202: { id: 202, name: "Notebook Set" },
    },
    price: 45.5,
    expirationDate: "2025-06-15T00:00:00Z",
  },
];

const renderHeaders = () => (
  <>
   <th>Id</th>
    <th>Deal</th>
    <th>Products</th>
    <th>Price</th>
    <th>Expiration Date</th>
    <th>Delete</th>
    <th>Edit</th>
  </>
);

const renderRow = (item) => (
  <>
    <td>{item.id}</td>
    <td>{item.deal}</td>
    <td>
      {Object.values(item.products).map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </td>
    <td>${item.price.toFixed(2)}</td>
    <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
    <td>
      <CircleX />
    </td>
    <td>
      <Pen />
    </td>
  </>
);

const UserList = () => {
  return (
    <DataListItem
      data={userData}
      renderHeaders={renderHeaders}
      renderRow={renderRow}
      emptyMessage="No quotes available"
    />
  );
};

export default UserList;
