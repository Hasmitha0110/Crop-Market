import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Market() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch crops from the public endpoint
  const fetchMarketCrops = async () => {
    setLoading(true);
    try {
      // Endpoint returns { total, page, limit, crops: [...] }
      const res = await api.get('/crops', {
        params: { search, status: statusFilter },
      });
      setCrops(res.data.crops || []);
    } catch (err) {
      console.error(err);
      // Fail silently or show error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search could be added, but for now fetch on effect
    fetchMarketCrops();
  }, [search, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen pb-20">
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">Crop Market</h1>
        <p className="text-gray-600">Browse fresh produce directly from farmers</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for crops, varieties, or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm min-w-[150px]"
        >
          <option value="">All Availability</option>
          <option value="available">Available</option>
          <option value="coming_soon">Coming Soon</option>
          <option value="sold">Sold Out</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading market...</p>
        </div>
      ) : crops.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-xl text-gray-500 font-medium">No crops found matching your criteria.</p>
          <button
            onClick={() => { setSearch(''); setStatusFilter(''); }}
            className="mt-4 text-green-600 hover:text-green-800 underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crops.map((crop) => {
            return (
              <CropCard key={crop._id} crop={crop} />
            );
          })}
        </div>
      )}
    </div>
  );
}

function CropCard({ crop }) {
  const [expanded, setExpanded] = useState(false);

  const hasDiscount = crop.discountPercent > 0;
  const discountPrice = hasDiscount
    ? crop.pricePerUnit - (crop.pricePerUnit * crop.discountPercent) / 100
    : crop.pricePerUnit;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col cursor-pointer hover:shadow-lg ${expanded ? 'ring-2 ring-green-500' : ''
        }`}
    >
      {/* Header / Status */}
      <div className="relative h-28 bg-gradient-to-r from-green-50 to-green-100 p-4">
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${crop.status === 'sold'
              ? 'bg-red-100 text-red-600 border-red-200'
              : crop.status === 'coming_soon'
                ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                : 'bg-green-100 text-green-700 border-green-200'
            }`}
        >
          {crop.status.replace('_', ' ')}
        </span>
        <div className="absolute bottom-3 left-4 right-4">
          {/* Bigger Name */}
          <h3 className="text-3xl font-extrabold text-gray-800 leading-tight">
            {crop.type}
          </h3>
          <p className="text-sm text-gray-600 font-medium">{crop.variety}</p>
        </div>
      </div>

      {/* Basic Body (Always Visible) */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Price</span>
            <div className="flex items-baseline gap-1">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-green-700">Rs.{discountPrice.toFixed(0)}</span>
                  <span className="text-xs line-through text-gray-400">Rs.{crop.pricePerUnit}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-800">Rs.{crop.pricePerUnit}</span>
              )}
            </div>
          </div>

          <div className="text-right flex flex-col items-end justify-center">
            <span className={`font-medium px-2 py-0.5 rounded text-xs ${crop.organic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {crop.organic ? 'Organic 🌱' : 'Non-Organic'}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-2 text-sm">
          <span className="text-gray-500">Quality/Size</span>
          <span className="font-semibold text-gray-800">{crop.qualityOrSize || 'N/A'}</span>
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="flex justify-center mt-2">
          {expanded ? (
            <svg className="w-5 h-5 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 bg-white text-sm border-t border-gray-100 animate-fadeIn">
          <div className="mt-3 space-y-2">
            {crop.description && (
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600 italic">{crop.description}</p>
              </div>
            )}

            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Quantity</span>
              <span className="font-medium">{crop.quantity} {crop.unit}</span>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="text-gray-700">{crop.address || 'Location provided on contact'}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span className="font-bold text-gray-800">{crop.contact}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span className="text-gray-500">Seller: {crop.owner?.name || 'Farmer'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
