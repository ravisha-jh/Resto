import React, { useState } from 'react';

const initialTables = [
  { id: 'T-01', status: 'available', guests: 2 },
  { id: 'T-02', status: 'occupied', guests: 4, name: 'John Doe', time: '2 hours ago' },
  { id: 'T-03', status: 'reserved', guests: 6, name: 'Jane Smith', time: '7:30 PM' },
  { id: 'T-04', status: 'available', guests: 2 },
  { id: 'T-05', status: 'occupied', guests: 4, name: 'Mike Johnson', time: '45 min ago' },
  { id: 'T-06', status: 'cleaning', guests: 8 },
  { id: 'T-07', status: 'available', guests: 2 },
  { id: 'T-08', status: 'reserved', guests: 4, name: 'Sarah Wilson', time: '8:00 PM' },
  { id: 'T-09', status: 'available', guests: 6 },
  { id: 'T-10', status: 'occupied', guests: 4, name: 'David Brown', time: '1 hour ago' },
  { id: 'T-11', status: 'available', guests: 2 },
  { id: 'T-12', status: 'available', guests: 8 }
];

const statusColors = {
  available: 'bg-green-100 text-green-600',
  occupied: 'bg-red-100 text-red-600',
  reserved: 'bg-yellow-100 text-yellow-600',
  cleaning: 'bg-gray-200 text-gray-600'
};

const TableManagement = () => {
  const [tables, setTables] = useState(initialTables);
  const [showModal, setShowModal] = useState(false);
  const [newReservation, setNewReservation] = useState({
    id: '',
    name: '',
    guests: '',
    time: '',
    status: 'reserved'
  });

  const statusCount = (status) => tables.filter((t) => t.status === status).length;
  const occupancyRate = Math.round((statusCount('occupied') / tables.length) * 100);

  const handleAddReservation = () => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === newReservation.id
          ? {
              ...table,
              name: newReservation.name,
              guests: Number(newReservation.guests),
              time: newReservation.time,
              status: newReservation.status
            }
          : table
      )
    );
    setShowModal(false);
    setNewReservation({ id: '', name: '', guests: '', time: '', status: 'reserved' });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Table Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Add Reservation
        </button>
      </div>
      <p className="text-gray-600 mb-4">Monitor and manage restaurant tables and reservations.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <div className="text-green-600 text-2xl font-bold">{statusCount('available')}</div>
          <div className="text-sm text-gray-500">Available Tables</div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <div className="text-red-600 text-2xl font-bold">{statusCount('occupied')}</div>
          <div className="text-sm text-gray-500">Occupied Tables</div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <div className="text-yellow-600 text-2xl font-bold">{statusCount('reserved')}</div>
          <div className="text-sm text-gray-500">Reserved Tables</div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <div className="text-blue-600 text-2xl font-bold">{occupancyRate}%</div>
          <div className="text-sm text-gray-500">Occupancy Rate</div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-4 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="bg-white p-4 rounded shadow relative">
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">{table.id}</h3>
              <span className={`h-3 w-3 rounded-full ${{
                available: 'bg-green-500',
                occupied: 'bg-red-500',
                reserved: 'bg-yellow-500',
                cleaning: 'bg-gray-400'
              }[table.status]}`}></span>
            </div>
            <div className="text-gray-500 text-sm mt-1">👥 {table.guests}</div>
            <div className={`inline-block px-2 py-1 text-xs mt-2 rounded ${statusColors[table.status]}`}>
              {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
            </div>
            {table.name && (
              <div className="mt-2">
                <div className="font-medium text-gray-800">{table.name}</div>
                <div className="text-gray-400 text-sm">🕒 {table.time}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status Legend */}
      <div className="mt-6 bg-white shadow rounded p-4">
        <h4 className="font-bold mb-2">Status Legend</h4>
        <div className="flex gap-6 text-sm">
          <span className="flex items-center gap-1"><span className="h-3 w-3 bg-green-500 rounded-full"></span>Available</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 bg-red-500 rounded-full"></span>Occupied</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 bg-yellow-500 rounded-full"></span>Reserved</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 bg-gray-400 rounded-full"></span>Cleaning</span>
        </div>
      </div>

      {/* Add Reservation Modal */}
      {showModal && (
        <div className="fixed inset-0  flex justify-center items-center z-9999" style={{ backgroundColor: "rgb(0 0 0 / 53%)" }}>
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">Add Reservation</h3>
            <label className="block mb-2 text-sm">Select Table</label>
            <select
  className="w-full p-2 border mb-4 rounded"
  value={newReservation.id}
  onChange={(e) => setNewReservation({ ...newReservation, id: e.target.value })}
>
  <option value="">-- Select --</option>
  {tables
    .filter((table) => table.status === 'available')
    .map((table) => (
      <option key={table.id} value={table.id}>
        {table.id}
      </option>
  ))}
</select>


            <label className="block mb-2 text-sm">Guest Name</label>
            <input
              type="text"
              className="w-full p-2 border mb-4 rounded"
              value={newReservation.name}
              onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })}
            />

            <label className="block mb-2 text-sm">Number of Guests</label>
            <input
              type="number"
              className="w-full p-2 border mb-4 rounded"
              value={newReservation.guests}
              onChange={(e) => setNewReservation({ ...newReservation, guests: e.target.value })}
            />

            <label className="block mb-2 text-sm">Time</label>
            <input
              type="time"
              className="w-full p-2 border mb-4 rounded"
              value={newReservation.time}
              onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReservation}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableManagement;
