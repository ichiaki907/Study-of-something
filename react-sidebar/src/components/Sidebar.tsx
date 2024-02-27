import { useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="Sidebar">
      <SidebarIcon />
      <ul className="SidebarList">
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname === value.link ? "active" : ""}
              className="row"
              onClick={() => {
                navigate(value.link);
              }}
            >
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
        <button className="sidebar-button">サイドバーを閉じる</button>
      </ul>
    </div>
  );
};

export default Sidebar;
