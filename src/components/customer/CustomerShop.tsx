import React, { useState } from 'react';
import { HoneyProduct } from '../../types';

interface CustomerShopProps {
  products: HoneyProduct[];
  onSelectProduct: (product: HoneyProduct) => void;
  onAddToCart: (product: HoneyProduct) => void;
  onToggleWishlist: (product: HoneyProduct) => void;
  wishlistIds: string[];
}

export const CustomerShop: React.FC<CustomerShopProps> = ({
  products = [],
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedWeight, setSelectedWeight] = useState<number | 'all'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const honeyTypes = [
    { id: 'all', label: 'All Varieties' },
    { id: 'Sundarban Raw Mangrove Honey', label: 'Mangrove Raw' },
    { id: 'Mustard Blossom Raw Honey', label: 'Mustard Blossom' },
    { id: 'Litchi Blossom Honey', label: 'Litchi Blossom' },
    { id: 'Forest Multi-floral Honey', label: 'Multi-floral Forest' },
    { id: 'Organic Acacia Raw Honey', label: 'Organic Acacia' },
  ];

  // Filtering
  const safeProducts = products || [];
  const filteredProducts = safeProducts.filter(p => {
    if (!p) return false;
    const title = (p.title || p.name || '').toLowerCase();
    const type = (p.honeyType || '').toLowerCase();
    const sel = selectedType.toLowerCase();

    if (selectedType !== 'all' && !title.includes(sel) && !type.includes(sel)) {
      return false;
    }
    if ((p.price || 0) > maxPrice) return false;
    if (selectedWeight !== 'all' && p.weightGrams !== selectedWeight) return false;
    if (verifiedOnly && !p.isVerifiedTraceable && !p.traceabilityVerified) return false;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price_high') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#fffbf7] to-[#fff3e0] p-6 sm:p-8 rounded-3xl border border-[#f59e0b]/25 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#855300]">
            Direct From Apiaries
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-1">
            Discover Authentic Indian Honey
          </h1>
          <p className="text-xs sm:text-sm text-[#534434] mt-1 font-medium">
            Raw, unfiltered, single-origin honey batches verified with blockchain provenance.
          </p>
        </div>

        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden px-4 py-2.5 bg-white text-[#1f1b17] border border-[#d8c3ad] font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-base">tune</span>
          <span>Filters ({filteredProducts.length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} lg:static lg:bg-transparent lg:p-0 space-y-6`}>
          {mobileFilterOpen && (
            <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0] lg:hidden">
              <span className="font-black text-base text-[#1f1b17]">Filter Honey</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#867461]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-6">
            {/* Variety Filter */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#534434] mb-3">
                Honey Variety
              </label>
              <div className="space-y-1.5">
                {honeyTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedType === t.id
                        ? 'bg-[#855300] text-white font-bold'
                        : 'text-[#534434] hover:bg-[#f6ece6]'
                    }`}
                  >
                    <span>{t.label}</span>
                    {selectedType === t.id && (
                      <span className="material-symbols-outlined text-sm">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4 border-t border-[#f0e6e0]">
              <div className="flex justify-between items-center text-xs font-black text-[#534434] mb-2">
                <span className="uppercase tracking-wider">Max Price</span>
                <span className="text-[#855300]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#855300]"
              />
              <div className="flex justify-between text-[10px] text-[#867461] mt-1 font-semibold">
                <span>₹200</span>
                <span>₹1200</span>
              </div>
            </div>

            {/* Size / Weight */}
            <div className="pt-4 border-t border-[#f0e6e0]">
              <label className="block text-xs font-black uppercase tracking-wider text-[#534434] mb-2">
                Jar Size
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {[
                  { id: 'all', label: 'All' },
                  { id: 250, label: '250g' },
                  { id: 500, label: '500g' },
                ].map(w => (
                  <button
                    key={String(w.id)}
                    onClick={() => setSelectedWeight(w.id as any)}
                    className={`py-2 rounded-xl transition-colors text-center ${
                      selectedWeight === w.id
                        ? 'bg-[#855300] text-white'
                        : 'bg-[#f6ece6] text-[#534434] hover:bg-[#ebd9cb]'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Traceable Only */}
            <div className="pt-4 border-t border-[#f0e6e0]">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#006c49] accent-[#006c49]"
                />
                <span className="text-xs font-bold text-[#1f1b17] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#006c49]">verified</span>
                  <span>Blockchain Verified Only</span>
                </span>
              </label>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSelectedType('all');
                setMaxPrice(1000);
                setSelectedWeight('all');
                setVerifiedOnly(false);
                if (mobileFilterOpen) setMobileFilterOpen(false);
              }}
              className="w-full py-2.5 text-xs font-bold text-[#867461] hover:text-[#1f1b17] bg-[#f6ece6] hover:bg-[#ebd9cb] rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Products List (3 Cols) */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Bar Sort & Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-xs">
            <span className="text-xs font-bold text-[#534434]">
              Showing <strong className="text-[#1f1b17]">{sortedProducts.length}</strong> traceable honey products
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#867461]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="p-1.5 bg-[#f6ece6] font-bold text-[#1f1b17] rounded-xl outline-none border border-transparent focus:border-[#855300]"
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map(product => {
                const isWishlisted = (wishlistIds || []).includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl overflow-hidden border border-[#d8c3ad]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative h-48 w-full bg-[#f6ece6] overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => onSelectProduct(product)}
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="px-2 py-0.5 bg-[#006c49] text-white text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            <span>Traceable</span>
                          </span>
                        </div>

                        <button
                          onClick={() => onToggleWishlist(product)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                            isWishlisted
                              ? 'bg-[#ba1a1a] text-white'
                              : 'bg-white/80 text-[#534434] hover:bg-white hover:text-[#ba1a1a]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">favorite</span>
                        </button>
                      </div>

                      {/* Body Details */}
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-[#867461]">
                          <span className="text-[#855300] uppercase tracking-wider">{product.honeyType}</span>
                          <span>{product.weightGrams}g</span>
                        </div>

                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="text-sm font-black text-[#1f1b17] line-clamp-1 hover:text-[#855300] cursor-pointer"
                        >
                          {product.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-[#534434]">
                          <span className="text-[#f59e0b] font-bold">★ {product.rating}</span>
                          <span className="text-[#867461]">({product.reviewCount})</span>
                          <span>•</span>
                          <span className="font-bold text-[#006c49]">{product.sourceHiveCode}</span>
                        </div>

                        <div className="text-[11px] font-mono text-[#867461] bg-[#fffbf7] px-2 py-1 rounded-md border border-[#f59e0b]/20 truncate">
                          Batch: {product.batchCode}
                        </div>
                      </div>
                    </div>

                    {/* Footer Price & Add */}
                    <div className="p-4 pt-0 border-t border-[#f0e6e0] flex items-center justify-between mt-2">
                      <div>
                        <span className="text-base font-black text-[#1f1b17]">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#867461] line-through ml-1.5 font-medium">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-3.5 py-1.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">shopping_bag</span>
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#d8c3ad]/30 shadow-sm space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#855300]">search_off</span>
              <h3 className="text-base font-bold text-[#1f1b17]">No honey matched your filters</h3>
              <p className="text-xs text-[#534434]">Try adjusting the maximum price or honey variety.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
