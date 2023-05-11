import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./Context";
import { data } from "./data";
import Sidebarmenu from "./Sidebarmenu";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar} = useGlobalContext();
  
  return (
    <aside className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
      <div className="sidenavbar">
        <h3 className="logo">Social Analytics</h3>
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      <div className="sidebar-links">
        <Sidebarmenu />
      </div>
    </aside>
  );
};
export default Sidebar;
