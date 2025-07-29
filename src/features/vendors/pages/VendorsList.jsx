import DataListItem from "../../../components/dataListItem/pages/DataListItem";
import {CircleX, Pen} from "lucide-react";

const userData = [
    {
        id: 1,
        name: "TechNova Inc.",
        industry_category: "Software Development",
        website: "https://www.technova.com",
        address: "123 Silicon Valley Blvd",
        country: "USA",
        city: "San Francisco",
        description: "Leading provider of AI-based business solutions.",
    },
    {
        id: 2,
        name: "GreenWorld Solutions",
        industry_category: "Environmental Consulting",
        website: "https://www.greenworld.org",
        address: "45 Eco Park Street",
        country: "Canada",
        city: "Vancouver",
        description: "Consultancy firm specializing in sustainability and green tech.",
    },
];

const renderHeaders = () => (
    <>
        <th>Id</th>
        <th>Name</th>
        <th>Industry Category</th>
        <th>Website</th>
        <th>Address</th>
        <th>Country</th>
        <th>City</th>
        <th>Description</th>
        <th>Delete</th>
        <th>Edit</th>
    </>
);

const renderRow = (item) => (
    <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.industry_category}</td>
        <td>
            <a href={item.website} target="_blank" rel="noopener noreferrer">
                {item.website}
            </a>
        </td>
        <td>{item.address}</td>
        <td>{item.country}</td>
        <td>{item.city}</td>
        <td>{item.description}</td>
        <td>
            <CircleX/>
        </td>
        <td>
            <Pen/>
        </td>
    </>
);

const UserList = () => {
    return (
        <DataListItem
            data={userData}
            renderHeaders={renderHeaders}
            renderRow={renderRow}
            emptyMessage="No vendors available"
        />
    );
};

export default UserList;
