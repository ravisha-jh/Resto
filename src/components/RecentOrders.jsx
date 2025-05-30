import { recentOrders } from "../data/dashboardData";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function RecentOrders() {
  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
      <div className="space-y-3">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md"
          >
            <div>
              <div className="font-semibold text-sm">
                <span className="text-black">{order.id}</span>{" "}
                <span className="text-gray-700">{order.name}</span>
              </div>
              <div className="text-sm text-gray-500">{order.items}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-black">₹{order.amount}</div>
              <div className="flex items-center justify-end text-xs text-gray-500 gap-1 mt-1">
                {getStatusIcon(order.status)}
                <span>{order.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
