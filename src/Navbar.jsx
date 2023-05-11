import { FaBars } from "react-icons/fa";
import Navlinks from "./Navlinks";
import DynamicForm from "./Content";
import { useGlobalContext } from "./Context";

const Navbar = () => {
  const { openSidebar } = useGlobalContext();
  return (
    <div>
      <nav>
        <div className="nav-center showNavBar">
          <h3 className="logo">Social Analytics</h3>

          <button className="toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
      </nav>
      <div className="jobs-center">
        <Navlinks />
        <DynamicForm />
      </div>
    </div>
  );
};
export default Navbar;
