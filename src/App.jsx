import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MenuManagement from "./pages/MenuManagement";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";




function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-50 min-h-screen">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/menu" element={<MenuManagement />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/tables" element={<Tables />} />



              {/* Add other pages here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
