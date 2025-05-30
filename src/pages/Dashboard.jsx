import DashboardCards from "../components/DashboardCards";
import RevenueChart from "../components/RevenueChart";
import RecentOrders from "../components/RecentOrders";
import { summaryData } from "../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Welcome back! Here's what's happening at your restaurant today.
      </p>

      <DashboardCards data={summaryData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart />
        <RecentOrders />
      </div>
    </div>
  );
}

