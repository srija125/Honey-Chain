import React, { useState } from 'react';
import { HoneyProduct, HoneyBatch } from '../../types';

interface BeekeeperMyProductsProps {
  products: HoneyProduct[];
  batches: HoneyBatch[];
  onAddProduct: (product: Partial<HoneyProduct>) => void;
  onUpdateProductStatus: (id: string, isAvailable: boolean) => void;
  onViewProductDetails?: (product: HoneyProduct) => void;
}

export const BeekeeperMyProducts: React.FC<BeekeeperMyProductsProps> = ({
  products,
  batches,
  onAddProduct,
  onUpdateProductStatus,
  onViewProductDetails,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [honeyType, setHoneyType] = useState('Raw Wild Honey');
  const [price, setPrice] = useState(399);
  const [originalPrice, setOriginalPrice] = useState(449);
  const [weightGrams, setWeightGrams] = useState(500);
  const [stockQuantity, setStockQuantity] = useState(84);
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800');

  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      title,
      description,
      honeyType,
      price: Number(price),
      originalPrice: Number(originalPrice),
      weightGrams: Number(weightGrams),
      stockQuantity: Number(stockQuantity),
      batchId: selectedBatch?.id || 'batch-1',
      batchCode: selectedBatch?.batchCode || 'HC-2026-0001',
      sourceHiveCode: selectedBatch?.sourceHiveCode || 'HIVE-001',
      harvestDate: selectedBatch?.harvestDate || '2026-09-01',
      imageUrl,
      isVerifiedTraceable: true,
      isAvailable: true,
      rating: 5.0,
      reviewCount: 0,
      tastingNotes: ['Wild Blossom', 'Caramel', 'Earthy Undertones'],
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#1f1b17]">My Honey Products</h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            List your bottled honey directly to retail consumers with cryptographic traceability attached.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add_box</span>
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#d8c3ad]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Product Image Banner */}
              <div className="relative h-48 w-full bg-[#f6ece6] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 bg-[#006c49] text-white text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    <span>Traceable</span>
                  </span>
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                    {product.weightGrams}g
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg shadow-sm ${
                    product.isAvailable ? 'bg-[#adedd3] text-[#004e34]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}>
                    {product.isAvailable ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#855300]">
                    {product.honeyType}
                  </span>
                  <h3 className="text-base font-black text-[#1f1b17] mt-0.5 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#534434] line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="p-3 bg-[#fffbf7] rounded-xl border border-[#f59e0b]/20 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#867461]">Linked Batch:</span>
                    <span className="font-bold text-[#855300]">{product.batchCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#867461]">Inventory Stock:</span>
                    <span className="font-bold text-[#1f1b17]">{product.stockQuantity} jars</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#867461]">Customer Rating:</span>
                    <span className="font-bold text-[#f59e0b] flex items-center gap-0.5">
                      ★ {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer & Price */}
            <div className="p-5 pt-0 border-t border-[#f0e6e0] flex items-center justify-between mt-2">
              <div>
                <span className="text-lg font-black text-[#1f1b17]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-[#867461] line-through ml-1.5 font-medium">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateProductStatus(product.id, !product.isAvailable)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    product.isAvailable
                      ? 'bg-[#f6ece6] hover:bg-[#ebd9cb] text-[#534434]'
                      : 'bg-[#006c49] hover:bg-[#004e34] text-white'
                  }`}
                >
                  {product.isAvailable ? 'Pause' : 'Activate'}
                </button>
                {onViewProductDetails && (
                  <button
                    onClick={() => onViewProductDetails(product)}
                    className="px-3 py-1.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-bold rounded-xl transition-all"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#d8c3ad]/50 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-[#855300]">storefront</span>
                <h3 className="text-lg font-black text-[#1f1b17]">Publish Product to Marketplace</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#867461] hover:text-[#1f1b17] p-1.5 rounded-lg hover:bg-[#f6ece6]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-[#534434] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Sundarban Raw Mangrove Honey 500g"
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#534434] mb-1">Description & Tasting Notes</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the floral source, texture, and natural health benefits..."
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-medium text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#534434] mb-1">Honey Variety</label>
                  <select
                    value={honeyType}
                    onChange={(e) => setHoneyType(e.target.value)}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                  >
                    <option value="Raw Wild Honey">Raw Wild Honey</option>
                    <option value="Mustard Blossom Honey">Mustard Blossom Honey</option>
                    <option value="Litchi Blossom Honey">Litchi Blossom Honey</option>
                    <option value="Forest Multi-floral Honey">Forest Multi-floral Honey</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#534434] mb-1">Link Blockchain Batch</label>
                  <select
                    value={selectedBatchId}
                    onChange={(e) => setSelectedBatchId(e.target.value)}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#855300] border border-transparent focus:border-[#855300] outline-none"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.batchCode} ({b.honeyType} - {b.quantityKg}kg)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-[#534434] mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#534434] mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#534434] mb-1">Weight (g)</label>
                  <select
                    value={weightGrams}
                    onChange={(e) => setWeightGrams(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                  >
                    <option value={250}>250g</option>
                    <option value={500}>500g</option>
                    <option value={1000}>1000g (1kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#534434] mb-1">Stock (Jars)</label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#f7fcf9] p-3 rounded-xl border border-[#006c49]/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c49] text-base">verified</span>
                <span className="text-[11px] font-bold text-[#004e34]">
                  Traceability Verification Auto-Linked: {selectedBatch?.batchCode || 'HC-2026-0001'}
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-[#f6ece6] text-[#534434] font-bold rounded-xl hover:bg-[#ebd9cb]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#855300] hover:bg-[#684000] text-white font-extrabold rounded-xl shadow-md cursor-pointer"
                >
                  Publish to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
