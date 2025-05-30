import React, { useState } from 'react';

const STATUS = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    action: 'Start Preparing',
    next: 'preparing',
  },
  preparing: {
    label: 'Preparing',
    color: 'bg-blue-100 text-blue-800',
    action: 'Mark Ready',
    next: 'ready',
  },
  ready: {
    label: 'Ready',
    color: 'bg-green-100 text-green-800',
    action: 'Complete',
    next: 'completed',
  },
  completed: {
    label: 'Completed',
    color: 'bg-gray-200 text-gray-700',
    action: null,
    next: null,
  },
};

const ITEM_CATALOG = {
  'Classic Burger': 150,
  'Fries': 60,
  'Coke': 40,
  'Margherita Pizza': 200,
  'Caesar Salad': 120,
  'Grilled Chicken': 180,
};

const initialOrders = [
  {
    id: '001',
    customer: 'John Doe',
    items: [
      { name: 'Classic Burger', quantity: 2, price: 2078 },
      { name: 'Fries', quantity: 2, price: 798 },
    ],
    amount: 2876,
    status: 'pending',
    timeAgo: '2 min ago',
    timeLeft: '15m',
    type: 'dine-in',
    table: 'Table 5',
  },
  {
    id: '002',
    customer: 'Jane Smith',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 1199 },
      { name: 'Coke', quantity: 2, price: 478 },
    ],
    amount: 1677,
    status: 'preparing',
    timeAgo: '5 min ago',
    timeLeft: '10m',
    type: 'takeaway',
  },
  {
    id: '003',
    customer: 'Mike Johnson',
    items: [
      { name: 'Caesar Salad', quantity: 1, price: 719 },
      { name: 'Grilled Chicken', quantity: 1, price: 1359 },
    ],
    amount: 2078,
    status: 'ready',
    timeAgo: '8 min ago',
    timeLeft: '5m',
    type: 'delivery',
    address: '123 Main St, Mumbai',
  },
];

const OrdersManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [popupVisible, setPopupVisible] = useState(false);

  const [newOrder, setNewOrder] = useState({
    id: '',
    customer: '',
    items: [{ name: '', qty: 1, price: 0 }],
    type: 'dine-in',
    table: '',
    address: '',
  });

  const handleStatusChange = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: STATUS[order.status].next } : order
      )
    );
  };

  const handleItemChange = (index, field, value) => {
    const items = [...newOrder.items];
    if (field === 'name') {
      items[index].name = value;
      items[index].price = (ITEM_CATALOG[value] || 0) * items[index].qty;
    } else if (field === 'qty') {
      items[index].qty = parseInt(value);
      items[index].price = (ITEM_CATALOG[items[index].name] || 0) * items[index].qty;
    }
    setNewOrder({ ...newOrder, items });
  };

  const addItem = () => {
    setNewOrder({ ...newOrder, items: [...newOrder.items, { name: '', qty: 1, price: 0 }] });
  };

  const removeItem = (index) => {
    const items = [...newOrder.items];
    items.splice(index, 1);
    setNewOrder({ ...newOrder, items });
  };

  const createOrder = () => {
    const totalAmount = newOrder.items.reduce((sum, item) => sum + item.price, 0);
    const newId = (orders.length + 1).toString().padStart(3, '0');

    const newEntry = {
      id: newId,
      customer: newOrder.customer,
      items: newOrder.items,
      amount: totalAmount,
      status: 'pending',
      timeAgo: 'Just now',
      timeLeft: '20m',
      type: newOrder.type,
      table: newOrder.table,
      address: newOrder.address,
    };

    setOrders([newEntry, ...orders]);
    setPopupVisible(false);
    setNewOrder({
      id: '',
      customer: '',
      items: [{ name: '', qty: 1, price: 0 }],
      type: 'dine-in',
      table: '',
      address: '',
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-gray-600">Track and manage all restaurant orders in real-time.</p>
        </div>
        <button
          onClick={() => setPopupVisible(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Create Order
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow rounded p-4 w-full max-w-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold">#{order.id}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${STATUS[order.status].color}`}>
                {STATUS[order.status].label}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">👤 {order.customer}</p>
            <p className="text-gray-400 text-xs mb-2">{order.timeAgo}</p>

            <ul className="text-sm mb-2">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.qty}x {item.name}{' '}
                  <span className="float-right">₹{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="text-green-600 font-bold">₹{order.amount}</div>
            <div className="text-red-500 text-sm">⏱ {order.timeLeft}</div>

            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
                  {order.type}
                </span>
                {order.table && <span>{order.table}</span>}
                {order.address && <span className="text-gray-400">📍 {order.address}</span>}
              </div>
              {STATUS[order.status].action && (
                <button
                  className={`text-white px-3 py-1 rounded ${
                    order.status === 'pending'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : order.status === 'preparing'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                  onClick={() => handleStatusChange(order.id)}
                >
                  {STATUS[order.status].action}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {popupVisible && (
        <div className="fixed inset-0  flex justify-center items-center z-50" style={{ backgroundColor: "rgb(0 0 0 / 53%)" }}>
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl relative">
            <h2 className="text-xl font-bold mb-4">Create New Order</h2>
            <button
              className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
              onClick={() => setPopupVisible(false)}
            >
              &times;
            </button>

            <input
              type="text"
              placeholder="Customer Name"
              className="border p-2 mb-2 w-full rounded"
              value={newOrder.customer}
              onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-2 mb-4">
              <select
                className="border p-2 rounded"
                value={newOrder.type}
                onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value })}
              >
                <option value="dine-in">Dine-in</option>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
              </select>
              {newOrder.type === 'dine-in' && (
                <input
                  type="text"
                  placeholder="Table Number"
                  className="border p-2 rounded"
                  value={newOrder.table}
                  onChange={(e) => setNewOrder({ ...newOrder, table: e.target.value })}
                />
              )}
              {newOrder.type === 'delivery' && (
                <input
                  type="text"
                  placeholder="Address"
                  className="border p-2 rounded"
                  value={newOrder.address}
                  onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                />
              )}
            </div>

            <h3 className="font-semibold mb-2">Items</h3>
            {newOrder.items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-center">
                <select
                  className="border p-2 rounded"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                >
                  <option value="">Select Item</option>
                  {Object.keys(ITEM_CATALOG).map((itemName) => (
                    <option key={itemName} value={itemName}>
                      {itemName}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  className="border p-2 rounded"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                />
                <input
                  className="border p-2 rounded bg-gray-100"
                  value={item.price}
                  disabled
                />
                <button onClick={() => removeItem(index)} className="text-red-500">
                  ❌
                </button>
              </div>
            ))}

            <button
              onClick={addItem}
              className="bg-gray-200 px-3 py-1 rounded mb-4 hover:bg-gray-300"
            >
              + Add Item
            </button>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPopupVisible(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createOrder}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
