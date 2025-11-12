import React, { useEffect, useState } from 'react';
import api from '../utils/api';

// category -> crop options
const cropCategories = {
  Grains: ['Kakulu Rice', 'Nadu Rice', 'Samba Rice', 'Corn', 'Paddy'],
  Vegetables: ['Tomato', 'Leeks', 'Onion', 'Potato', 'Pumpkin', 'Carrot', 'Beans', 'Green Chili'],
  Fruits: ['Banana', 'Mango', 'Papaya', 'Watermelon', 'Coconut'],
  Other: ['Tea Leaves', 'Groundnut', 'Cassava'],
};

const units = ['g', 'Kg', 'unit', 'none'];

export default function AddCropForm({ onAdded, editData = null, onCancel }) {
  const isEdit = !!editData;

  const [category, setCategory] = useState('');
  const [form, setForm] = useState({
    type: '',
    variety: '',
    description: '',
    pricePerUnit: '',
    unit: 'Kg',
    quantity: '',
    qualityOrSize: '',
    organic: false,
    status: 'available',
    contact: '',
    address: '',
    deliveryAvailable: false,
    discountPercent: '',
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
      // derive category automatically
      const foundCategory = Object.entries(cropCategories).find(([_, list]) =>
        list.includes(editData.type)
      );
      if (foundCategory) setCategory(foundCategory[0]);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/crops/${editData._id}`, form);
        alert('Crop updated successfully!');
      } else {
        await api.post('/crops', form);
        alert('Crop added successfully!');
      }
      onAdded();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save crop');
    }
  };

  const availableVarieties = cropCategories[category] || [];


  return (
    <div className="bg-white p-6 rounded shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {isEdit ? 'Edit Crop' : 'Add Crop'}
        </h2>
        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="text-red-500 hover:underline text-sm"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Category (type or pick) */}
<div>
  <label className="block mb-1 font-medium">Category</label>
  <input
    list="category-list"
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
      setForm({ ...form, type: '' });
    }}
    placeholder="Type or select a category"
    className="border rounded w-full p-2"
    required
  />
  <datalist id="category-list">
    {Object.keys(cropCategories).map((cat) => (
      <option key={cat} value={cat} />
    ))}
  </datalist>
</div>

{/* Type of Crop (type or pick based on category) */}
<div>
  <label className="block mb-1 font-medium">Type of Crop</label>
  <input
    list="crop-type-list"
    name="type"
    value={form.type}
    onChange={handleChange}
    placeholder={
      category ? "Type or select a crop" : "Select category first"
    }
    className="border rounded w-full p-2"
    required
    disabled={!category}
  />
  <datalist id="crop-type-list">
    {availableVarieties.map((v) => (
      <option key={v} value={v} />
    ))}
  </datalist>
</div>

        {/* Variety */}
        <input
          name="variety"
          placeholder="Variety (e.g. Red, Hybrid)"
          value={form.variety}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />

        {/* Price and Quantity */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1">Price per Unit</label>
            <input
              name="pricePerUnit"
              type="number"
              placeholder="Price"
              value={form.pricePerUnit}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1">Quantity ({form.unit})</label>
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        {/* Others */}
        <input
          name="qualityOrSize"
          placeholder="Quality / Size"
          value={form.qualityOrSize}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="organic"
            checked={form.organic}
            onChange={handleChange}
          />
          <label>Organic</label>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
          <textarea
  name="address"
  placeholder="Address / Location"
  value={form.address}
  onChange={handleChange}
  className="border rounded w-full p-2 resize-y min-h-[60px]"
  rows={2}
/>

        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="deliveryAvailable"
            checked={form.deliveryAvailable}
            onChange={handleChange}
          />
          <label>Delivery Available</label>
        </div>

        <input
          name="discountPercent"
          type="number"
          placeholder="Discount (%)"
          value={form.discountPercent}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isEdit ? 'Save Changes' : 'Add Crop'}
        </button>
      </form>
    </div>
  );
}
