import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import AddCropForm from './AddCropForm';

export default function CropList() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editCrop, setEditCrop] = useState(null);

  const fetchCrops = async () => {
    try {
      const res = await api.get('/crops/my', {
        params: { search, status: statusFilter },
      });
      setCrops(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load crops');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this crop?')) return;
    try {
      await api.delete(`/crops/${id}`);
      alert('Crop deleted');
      fetchCrops();
    } catch {
      alert('Failed to delete crop');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/crops/${id}/status`, { status: newStatus });
      fetchCrops();
    } catch {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [search, statusFilter]);

  if (editCrop) {
    return (
      <AddCropForm
        editData={editCrop}
        onAdded={() => {
          setEditCrop(null);
          fetchCrops();
        }}
        onCancel={() => setEditCrop(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <input
          placeholder="Search crop..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1 min-w-[150px]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="coming_soon">Coming Soon</option>
        </select>
      </div>

      {crops.length === 0 ? (
        <p className="text-gray-500 mt-4">No crops found.</p>
      ) : (
        <div className="space-y-4">
          {crops.map((crop) => {
            const hasDiscount = crop.discountPercent > 0;
            const discountPrice = hasDiscount
              ? crop.pricePerUnit - (crop.pricePerUnit * crop.discountPercent) / 100
              : crop.pricePerUnit;

            return (
              <div
                key={crop._id}
                className="border p-5 rounded-lg shadow bg-white w-full"
              >
                <div className="flex flex-wrap justify-between items-center border-b pb-2 mb-2">
                  <h3 className="text-xl font-semibold text-green-700">
                    {crop.type}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      crop.status === 'sold'
                        ? 'bg-red-100 text-red-600'
                        : crop.status === 'coming_soon'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {crop.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700">
                  <p><strong>Variety:</strong> {crop.variety || '-'}</p>
                  <p><strong>Quality:</strong> {crop.qualityOrSize || '-'}</p>
                  <p><strong>Organic:</strong> {crop.organic ? 'Yes' : 'No'}</p>
                  <p><strong>Contact:</strong> {crop.contact}</p>
                  <p><strong>Address:</strong> {crop.address || '-'}</p>
                  <p><strong>Delivery:</strong> {crop.deliveryAvailable ? 'Available' : 'Not available'}</p>
                  <p><strong>Quantity:</strong> {crop.quantity} {crop.unit}</p>
                  <p>
                    <strong>Price:</strong>{' '}
                    {hasDiscount ? (
                      <>
                        <span className="line-through text-gray-500 mr-1">
                          Rs.{crop.pricePerUnit}
                        </span>
                        <span className="text-green-600 font-semibold">
                          Rs.{discountPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <>Rs.{crop.pricePerUnit}</>
                    )}
                    {' '}per {crop.unit}
                  </p>
                  <p><strong>Discount:</strong> {crop.discountPercent}%</p>
                  <p className="md:col-span-2"><strong>Description:</strong> {crop.description || '-'}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <select
                    value={crop.status}
                    onChange={(e) => handleStatusChange(crop._id, e.target.value)}
                    className="border rounded p-1 text-sm"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>

                  <button
                    onClick={() => setEditCrop(crop)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(crop._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
