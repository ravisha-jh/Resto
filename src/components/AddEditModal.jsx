import { useState, useEffect } from "react";

export default function AddEditModal({ isOpen, onClose, onSave, editItem }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    prepTime: 15,
    description: "",
  });

  useEffect(() => {
    if (editItem) {
      setForm(editItem);
    } else {
      setForm({
        name: "",
        category: "",
        price: 0,
        prepTime: 15,
        description: "",
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.name && form.category && form.price) {
      onSave(form);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Backdrop */}
    <div
  className="absolute inset-0"
  style={{ backgroundColor: "rgb(0 0 0 / 53%)" }}
  onClick={onClose}
/>


      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-xl max-w-md w-full shadow-xl z-[9999]">
        <h2 className="text-xl font-semibold mb-4">
          {editItem ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>
        <div className="space-y-3">
            <label htmlFor="">Item Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter item name"
            className="w-full border p-2 rounded form-control"
          />
          <label htmlFor="">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>
            <option value="Main Course">Main Course</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>

          <label htmlFor="">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Price (₹)"
          />
          <label htmlFor="">Prep Time (minutes)</label>
          <input
            type="number"
            name="prepTime"
            value={form.prepTime}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Prep Time (minutes)"
          />
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter item description"
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            {editItem ? "Update Item" : "Add Item"}
          </button>
        </div>
      </div>
    </div>
  );
}
