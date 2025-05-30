import { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import AddEditModal from '../components/AddEditModal';

export default function MenuManagement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Classic Burger",
      category: "Main Course",
      description: "Juicy beef patty with lettuce, tomato, and special sauce",
      price: 1039,
      prepTime: 15,
      status: "active",
    },
    {
      id: 2,
      name: "Chocolate Cake",
      category: "Dessert",
      description: "Rich chocolate cake with vanilla ice cream",
      price: 559,
      prepTime: 5,
      status: "active",
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Appetizer",
      description: "Crisp romaine lettuce with Caesar dressing",
      price: 719,
      prepTime: 10,
      status: "active",
    },
    {
      id: 4,
      name: "Margherita Pizza",
      category: "Main Course",
      description: "Classic margherita with fresh basil and mozzarella",
      price: 849,
      prepTime: 20,
      status: "active",
    },
  ]);

  const handleSave = (item) => {
    if (editItem) {
      // Edit flow
      setMenuItems((prev) =>
        prev.map((i) => (i.id === editItem.id ? { ...item, id: editItem.id } : i))
      );
    } else {
      // Add flow
      const newItem = { ...item, id: Date.now(), status: "active" };
      setMenuItems((prev) => [...prev, newItem]);
    }
    setEditItem(null);
    setModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setMenuItems(menuItems.filter(m => m.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded mb-4"
        >
          + Add New Item
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex items-center bg-white px-4 py-2 rounded shadow w-full">
          <Search className="text-gray-500 mr-2" />
          <input className="w-full outline-none" placeholder="Search menu items..." />
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded shadow">
          All Categories <ChevronDown className="ml-2" />
        </div>
      </div>

      <div className="flex gap-6 flex-wrap">
        {menuItems.map(item => (
          <MenuCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

     <AddEditModal
  isOpen={modalOpen}
  onClose={() => {
    setModalOpen(false);
    setEditItem(null);
  }}
  onSave={handleSave}
  editItem={editItem}
/>

    </div>
  );
}
