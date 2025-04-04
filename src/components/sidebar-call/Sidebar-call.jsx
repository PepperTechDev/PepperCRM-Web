import { Users, AddressBook, Briefcase, Box, Building2, FileText, CheckSquare, Phone, Video, PenTool, Calendar } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Leads", icon: <Users size={18} strokeWidth={1.5} /> },
    { name: "Contacts", icon: <AddressBook size={18} strokeWidth={1.5} /> },
    { name: "Deals", icon: <Briefcase size={18} strokeWidth={1.5} /> },
    { name: "Products", icon: <Box size={18} strokeWidth={1.5} /> },
    { name: "Vendors", icon: <Building2 size={18} strokeWidth={1.5} /> },
    { name: "Quotes", icon: <FileText size={18} strokeWidth={1.5} /> },
    { name: "Task", icon: <CheckSquare size={18} strokeWidth={1.5} /> },
    { name: "Calls", icon: <Phone size={18} strokeWidth={1.5} /> },
    { name: "Meets", icon: <Video size={18} strokeWidth={1.5} /> },
    { name: "Forms", icon: <PenTool size={18} strokeWidth={1.5} /> },
    { name: "Calendar", icon: <Calendar size={18} strokeWidth={1.5} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-semibold mb-6">PeppertTech</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;