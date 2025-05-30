import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { weeklyRevenue } from "../data/dashboardData";

export default function RevenueChart() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-4">Weekly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyRevenue}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
