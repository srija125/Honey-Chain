import React from 'react';
import { BeekeeperProfile, HoneyProduct, HoneyBatch } from '../../types';

interface CustomerBeekeeperProfileProps {
  beekeeper: BeekeeperProfile;
  products: HoneyProduct[];
  batches: HoneyBatch[];
  onSelectProduct: (product: HoneyProduct) => void;
  onAddToCart: (product: HoneyProduct) => void;
  onViewTraceability: (batchCode: string) => void;
  onBack: () => void;
}

export const CustomerBeekeeperProfile: React.FC<CustomerBeekeeperProfileProps> = ({
  beekeeper,
  products = [],
  batches = [],
  onSelectProduct,
  onAddToCart,
  onViewTraceability,
  onBack,
}) => {
  const beekeeperId = beekeeper?.id || 'bk-1';
  const beekeeperProducts = (products || []).filter(p => p.beekeeperId === beekeeperId || beekeeperId === 'bk-1');
  const beekeeperBatches = (batches || []).filter(b => b.beekeeperId === beekeeperId || beekeeperId === 'bk-1');

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-bold text-[#855300] hover:underline cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to All Beekeepers</span>
      </button>

      {/* Beekeeper Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#d8c3ad]/30 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={beekeeper.avatarUrl}
            alt={beekeeper.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-[#006c49]/30 shadow-md"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17]">{beekeeper.name}</h1>
              {beekeeper.isVerified && (
                <span className="px-2 py-0.5 bg-[#adedd3] text-[#004e34] text-[10px] font-black rounded-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>VERIFIED BEEKEEPER</span>
                </span>
              )}
            </div>

            <div className="text-sm font-bold text-[#855300]">{beekeeper.farmName}</div>
            <div className="text-xs text-[#867461] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">location_on</span>
              <span>{beekeeper.location} • Since {beekeeper.joinedYear}</span>
            </div>
            <p className="text-xs text-[#534434] leading-relaxed max-w-2xl pt-1">
              {beekeeper.bio}
            </p>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#f0e6e0] text-xs">
          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold text-[#867461] uppercase">Smart Hives</span>
            <div className="text-xl font-black text-[#1f1b17]">{beekeeper.activeHivesCount} Nodes</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold text-[#867461] uppercase">Purity Rating</span>
            <div className="text-xl font-black text-[#006c49]">99.4%</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold text-[#867461] uppercase">Total Batches</span>
            <div className="text-xl font-black text-[#855300]">{beekeeperBatches.length} Verified</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold text-[#867461] uppercase">Customer Rating</span>
            <div className="text-xl font-black text-[#f59e0b]">★ {beekeeper.rating}</div>
          </div>
        </div>
      </div>

      {/* Honey Batches & Products listed by this Beekeeper */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-[#1f1b17]">
          Honey Produced by {beekeeper.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beekeeperProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#d8c3ad]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-44 object-cover cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-[#867461]">
                    <span className="text-[#855300] uppercase">{product.honeyType}</span>
                    <span>{product.weightGrams}g</span>
                  </div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-sm font-black text-[#1f1b17] line-clamp-1 hover:text-[#855300] cursor-pointer"
                  >
                    {product.title}
                  </h3>
                  <div className="text-xs text-[#006c49] font-bold">
                    ✓ Origin: {product.sourceHiveCode}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#f0e6e0] flex items-center justify-between mt-2">
                <span className="text-base font-black text-[#1f1b17]">₹{product.price}</span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="px-3.5 py-1.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-sm cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
