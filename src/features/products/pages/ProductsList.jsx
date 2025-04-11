import DataListItem from "../../../components/dataListItem/pages/DataListItem";
import { CircleX, Pen } from "lucide-react";
import { getProducts, createProducts, updateProducts, deleteProducts } from "../services/ProductsService";


const userData = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 19.99,
    vendor: "Logitech",
    status: "Available",
    description: "Ergonomic wireless mouse with 2.4 GHz connection",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 89.5,
    vendor: "Keychron",
    status: "Out of Stock",
    description: "RGB backlit mechanical keyboard with blue switches",
  },
  {
    id: 3,
    name: "HD Monitor",
    price: 149.99,
    vendor: "Samsung",
    status: "Available",
    description: "24-inch Full HD LED monitor with HDMI support",
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 29.99,
    vendor: "Anker",
    status: "Limited",
    description: "6-in-1 USB-C hub with HDMI, USB-A, and SD card support",
  }
];

const renderHeaders = () => (
  <>
    <th>Id</th>
    <th>Name</th>
    <th>Price</th>
    <th>Vendor</th>
    <th>Status</th>
    <th>Description</th>
  </>
);

const renderRow = (item) => (
  <>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.price}</td>
    <td>{item.vendor}</td>
    <td>{item.status}</td>
    <td>{item.description}</td>
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
      emptyMessage="No products available"
    />
  );
};

export default UserList;
