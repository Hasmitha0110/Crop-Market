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
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen pb-20">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Marketplace</h1>
        <p className="text-lg text-gray-500 font-medium">Browse fresh produce directly from our network of local farmers.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            placeholder="Search for crops, varieties, or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-500/50 outline-none transition-all font-medium text-gray-900"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-none bg-gray-50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-green-500/50 outline-none transition-all font-medium text-gray-700 min-w-[180px] cursor-pointer"
        >
          <option value="">All Availability</option>
          <option value="available">🟢 Available</option>
          <option value="coming_soon">⏳ Coming Soon</option>
          <option value="sold">🔴 Sold Out</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-green-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Loading marketplace...</p>
        </div>
      ) : crops.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-xl text-gray-600 font-bold mb-2">No crops found</p>
          <p className="text-gray-400 mb-6">We couldn't find anything matching your search criteria.</p>
          <button
            onClick={() => { setSearch(''); setStatusFilter(''); }}
            className="px-6 py-2.5 bg-green-50 text-green-700 font-bold rounded-xl hover:bg-green-100 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {crops.map((crop) => (
            <CropCard key={crop._id} crop={crop} />
          ))}
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
      className={`bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 ${expanded ? 'ring-2 ring-green-500/50' : ''}`}
    >
      {/* Header */}
      <div className="relative h-32 bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-t-[1.5rem] overflow-hidden">
        {/* Subtle pattern or overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide z-10 ${crop.status === 'sold'
              ? 'bg-red-500 text-white shadow-sm'
              : crop.status === 'coming_soon'
                ? 'bg-yellow-400 text-yellow-900 shadow-sm'
                : 'bg-white text-green-700 shadow-sm'
            }`}
        >
          {crop.status.replace('_', ' ')}
        </span>
        <div className="absolute bottom-4 left-5 right-5 z-10">
          <h3 className="text-3xl font-extrabold text-white leading-tight drop-shadow-md">
            {crop.type}
          </h3>
          <p className="text-sm text-green-50 font-medium drop-shadow-sm">{crop.variety}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Price</span>
            <div className="flex items-baseline gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-xl font-extrabold text-green-600">Rs.{discountPrice.toFixed(0)}</span>
                  <span className="text-sm font-medium line-through text-gray-400">Rs.{crop.pricePerUnit}</span>
                </>
              ) : (
                <span className="text-xl font-extrabold text-gray-900">Rs.{crop.pricePerUnit}</span>
              )}
            </div>
          </div>
          <span className={`font-bold px-3 py-1 rounded-lg text-xs ${crop.organic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {crop.organic ? 'Organic 🌱' : 'Standard'}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-t border-gray-50 text-sm">
          <span className="text-gray-500 font-medium">Quality/Size</span>
          <span className="font-bold text-gray-800 bg-gray-50 px-2 py-1 rounded">{crop.qualityOrSize || 'Standard'}</span>
        </div>

        <div className="flex justify-center mt-2 opacity-50">
          {expanded ? (
            <svg className="w-5 h-5 text-gray-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
          ) : (
            <svg className="w-5 h-5 text-gray-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 pt-0 bg-white text-sm border-t border-gray-50 transition-all">
          <div className="mt-4 space-y-3">
            {crop.description && (
              <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <p className="text-gray-600 italic leading-relaxed">{crop.description}</p>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Available Qty</span>
              <span className="font-bold text-gray-900">{crop.quantity} {crop.unit}</span>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <div className="bg-green-50 p-1.5 rounded-lg shrink-0">
                 <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span className="text-gray-700 font-medium mt-1">{crop.address || 'Location provided on contact'}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-1.5 rounded-lg shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <span className="font-extrabold text-gray-900">{crop.contact}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-1.5 rounded-lg shrink-0">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <span className="text-gray-600 font-medium">Farmer: <span className="font-bold text-gray-900">{crop.owner?.name || 'Unknown'}</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
