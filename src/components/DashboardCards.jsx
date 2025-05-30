import {
  DollarSign,
  ShoppingCart,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";

export default function DashboardCards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Revenue */}
      <div className="bg-white p-4 rounded-md shadow flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">Today's Revenue</p>
          <h2 className="text-2xl font-bold text-black">₹{data.revenue}</h2>
          <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +{data.revenueChange}% from yesterday
          </p>
        </div>
        <DollarSign className="w-6 h-6 text-green-600" />
      </div>

      {/* Orders Today */}
      <div className="bg-white p-4 rounded-md shadow flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">Orders Today</p>
          <h2 className="text-2xl font-bold text-black">{data.orders}</h2>
          <p className="text-blue-600 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +{data.orderChange}% from yesterday
          </p>
        </div>
        <ShoppingCart className="w-6 h-6 text-blue-600" />
      </div>

      {/* Active Tables */}
      <div className="bg-white p-4 rounded-md shadow flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">Active Tables</p>
          <h2 className="text-2xl font-bold text-black">
            {data.activeTables}/{data.totalTables}
          </h2>
          <p className="text-orange-600 text-sm mt-1">
            {Math.round((data.activeTables / data.totalTables) * 100)}%
            occupancy
          </p>
        </div>
        <Users className="w-6 h-6 text-orange-600" />
      </div>

      {/* Avg Rating */}
      <div className="bg-white p-4 rounded-md shadow flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">Avg Rating</p>
          <h2 className="text-2xl font-bold text-black">{data.rating}</h2>
          <p className="text-yellow-600 text-sm mt-1">
            Based on {data.reviews} reviews
          </p>
        </div>
        <Star className="w-6 h-6 text-yellow-600" />
      </div>
    </div>
  );
}
