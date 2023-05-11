import { useGlobalContext } from "./Context";


const Sidebarmenu = () => {
  const { uniqueStream, closeSidebar, setCurrentItem} =
    useGlobalContext();
  const handlePage = (items) => {
    closeSidebar();
    setCurrentItem(items);
  };
  return (
    <div className="sidebar-links">
      {uniqueStream.map((items, i) => {
        return (
          <button
            className="btn-sidebar"
            key={items}
            onClick={() => handlePage(items)}
          >
            {items}
          </button>
        );
      })}
    </div>
  );
};
export default Sidebarmenu;
