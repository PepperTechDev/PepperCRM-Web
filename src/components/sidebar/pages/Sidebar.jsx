import { CiCalendar } from "react-icons/ci";
import { LuContactRound } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { MdOutlineHandshake } from "react-icons/md";
import "../styles/Sidebar.module.css"

function SideBar() {
    const navigate = useNavigate();

    return (
        <section className="sidebar">
            <h1 className="sidebartitle">Jorge</h1>
            <p className="sidebarsubtitle">Subitulo</p>
            <ul>
            
                <li
                    className="sidebarli"
                    onClick={() => {
                        navigate("");
                    }}
                >
                <CiCalendar  className="sidebar__icon"/>Home
                </li>
                <li
                    className="sidebarli"
                    onClick={() => {
                        navigate("/appointments");
                    }}
                >
                    <LuContactRound className="sidebar__icon"/>Appointments
                </li>
                <li
                    className="sidebarli"
                    onClick={() => {
                        navigate("/appointments");
                    }}
                >
                    <MdOutlineHandshake className="sidebar__icon"/>Deals 
                </li>
                <li
                    className="sidebarli"
                    onClick={() => {
                        
                    }}
                >
                    <FaBoxArchive className="sidebar__icon"/>Products
                </li>
                <li
                    className="sidebarli"
                    onClick={() => {
                        navigate("/groups");
                    }}
                >
                    Groups
                </li>
                <li
                    className="sidebarli"
                    onClick={() => {
                        navigate("/profile");
                    }}
                >
                    Profile
                </li>
            </ul>
            <h1 className="sidebar__bottom">
                Sign Out
            </h1>
        </section>
    )
}
export default SideBar