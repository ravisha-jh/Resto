import { FaChartBar, FaUtensils, FaClipboardList, FaTable, FaUser, FaBox, FaFileAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <FaChartBar />, path: "/" },
  { name: "Menu Management", icon: <FaUtensils />, path: "/menu" },
  { name: "Orders", icon: <FaClipboardList />, path: "/orders" },
  { name: "Tables", icon: <FaTable />, path: "/tables" },
//   { name: "Staff", icon: <FaUser />, path: "/staff" },
//   { name: "Inventory", icon: <FaBox />, path: "/inventory" },
//   { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-orange-600 to-red-600 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-6">🍽️ RestaurantPro</div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-orange-500 ${
                isActive ? "bg-orange-500" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
