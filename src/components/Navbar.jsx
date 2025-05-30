import { FaSearch, FaBell, FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FaSearch />
        <input type="text" placeholder="Search..." className="border-none outline-none" />
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <FaBell />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">2</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}
