import { Pencil, Trash2 } from 'lucide-react';

export default function MenuCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-80 space-y-2 relative">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{item.name}</h2>
        <div className="flex gap-2">
          <Pencil className="w-4 cursor-pointer text-gray-600" onClick={() => onEdit(item)} />
          <Trash2 className="w-4 cursor-pointer text-red-500" onClick={() => onDelete(item.id)} />
        </div>
      </div>
      <span className="text-sm bg-gray-900 text-white rounded-full px-3 py-1 inline-block w-fit">
        {item.category}
      </span>
      <p className="text-gray-600 text-sm">{item.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-green-600 font-semibold">₹{item.price}</span>
        <span className="text-orange-600 text-sm flex items-center gap-1">
          ⏱ {item.prepTime}m
        </span>
        <span className="text-white bg-gray-900 px-2 rounded-full text-xs">active</span>
      </div>
    </div>
  );
}
