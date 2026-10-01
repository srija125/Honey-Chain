import React, { useState } from 'react';
import { HoneyProduct } from '../../types';

interface CustomerProductDetailsProps {
  product: HoneyProduct;
  onAddToCart: (product: HoneyProduct, quantity?: number) => void;
  onBuyNow: (product: HoneyProduct, quantity?: number) => void;
  onViewTraceability: (batchCode: string) => void;
  onToggleWishlist: (product: HoneyProduct) => void;
  isWishlisted: boolean;
  onBack: () => void;
}

export const CustomerProductDetails: React.FC<CustomerProductDetailsProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onViewTraceability,
  onToggleWishlist,
  isWishlisted,
  onBack,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<number>(product.weightGrams);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const images = [
    product.imageUrl,
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800',
  ];

  const calculatePrice = () => {
    if (selectedWeight === 250) return Math.round(product.price * 0.58);
    if (selectedWeight === 1000) return Math.round(product.price * 1.85);
    return product.price;
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-bold text-[#855300] hover:underline cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to Honey Shop</span>
      </button>

      {/* Main Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-80 sm:h-96 rounded-3xl bg-[#f6ece6] overflow-hidden border border-[#d8c3ad]/30 shadow-sm">
            <img
              src={images[activeImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#006c49] text-white text-xs font-black rounded-xl shadow-md flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Blockchain Verified Provenance</span>
              </span>
            </div>
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-[#ba1a1a] text-white'
                  : 'bg-white/80 text-[#534434] hover:bg-white hover:text-[#ba1a1a]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">favorite</span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#855300] scale-105 shadow-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Buy Box & Trust Specs */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fff4e5] text-[#855300] uppercase tracking-wider">
                {product.honeyType}
              </span>
              <span className="text-xs text-[#006c49] font-bold">In Stock ({product.stockQuantity} jars)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mt-2 text-xs text-[#534434]">
              <div className="flex items-center gap-1 text-[#f59e0b] font-bold">
                <span>★ {product.rating}</span>
                <span className="text-[#867461]">({product.reviewCount} customer reviews)</span>
              </div>
              <span>•</span>
              <span className="font-mono font-bold text-[#855300]">Batch: {product.batchCode}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-[#1f1b17]">₹{calculatePrice()}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#867461] line-through font-medium">
                ₹{Math.round(product.originalPrice * (selectedWeight / 500))}
              </span>
            )}
            <span className="px-2 py-0.5 bg-[#adedd3] text-[#004e34] text-xs font-bold rounded-lg">
              100% Direct to Beekeeper
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#534434] leading-relaxed">
            {product.description}
          </p>

          {/* Jar Size Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-[#534434]">
              Select Jar Size
            </label>
            <div className="grid grid-cols-3 gap-3 text-xs font-bold">
              {[
                { grams: 250, label: '250g Jar' },
                { grams: 500, label: '500g (Standard)' },
                { grams: 1000, label: '1kg Family Jar' },
              ].map(sz => (
                <button
                  key={sz.grams}
                  onClick={() => setSelectedWeight(sz.grams)}
                  className={`py-3 rounded-2xl transition-all border text-center ${
                    selectedWeight === sz.grams
                      ? 'bg-[#855300] text-white border-[#855300] shadow-sm'
                      : 'bg-white text-[#534434] border-[#d8c3ad] hover:bg-[#f6ece6]'
                  }`}
                >
                  <div>{sz.label}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">
                    ₹{sz.grams === 250 ? Math.round(product.price * 0.58) : sz.grams === 1000 ? Math.round(product.price * 1.85) : product.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buy Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#f6ece6] rounded-2xl p-1 border border-[#d8c3ad]/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-[#ebd9cb] font-black text-sm flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-xs text-[#1f1b17]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-[#ebd9cb] font-black text-sm flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onAddToCart({ ...product, weightGrams: selectedWeight, price: calculatePrice() }, quantity)}
                className="flex-1 py-3.5 bg-[#855300] hover:bg-[#684000] text-white text-xs sm:text-sm font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">shopping_cart</span>
                <span>Add to Cart (₹{calculatePrice() * quantity})</span>
              </button>
            </div>

            <button
              onClick={() => onBuyNow({ ...product, weightGrams: selectedWeight, price: calculatePrice() }, quantity)}
              className="w-full py-3.5 bg-[#1b4332] hover:bg-[#133024] text-white text-xs sm:text-sm font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Buy with 1-Click Checkout</span>
              <span className="material-symbols-outlined text-lg">bolt</span>
            </button>
          </div>

          {/* PRODUCT TRUST SECTION: Honey Chain Verified */}
          <div className="bg-[#f7fcf9] p-5 rounded-3xl border border-[#006c49]/25 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c49] text-2xl">verified</span>
                <span className="text-sm font-black text-[#004e34]">Honey Chain Verified</span>
              </div>
              <span className="text-[10px] font-bold text-[#006c49] bg-[#adedd3] px-2 py-0.5 rounded-full">
                AUDITED PROVENANCE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-[#534434]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#006c49] font-bold">✓</span>
                <span>Source Hive Registered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#006c49] font-bold">✓</span>
                <span>Batch Provenance Linked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#006c49] font-bold">✓</span>
                <span>Traceability Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#006c49] font-bold">✓</span>
                <span>Blockchain Record Minted</span>
              </div>
            </div>

            <button
              onClick={() => onViewTraceability(product.batchCode)}
              className="w-full py-2.5 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">account_tree</span>
              <span>View Full Honey Journey & Sensor Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Source & Apiary Provenance Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-6">
        <h2 className="text-base font-black text-[#1f1b17] pb-3 border-b border-[#f0e6e0]">
          Apiary Provenance & Lab Diagnostics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Apiary Lead</span>
            <div className="font-black text-[#1f1b17]">Rajesh Mondal</div>
            <div className="text-[11px] text-[#855300]">Sundarbans Apiary Cluster A</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Extraction Point</span>
            <div className="font-black text-[#1f1b17]">{product.sourceHiveCode}</div>
            <div className="text-[11px] text-[#006c49]">Centrifugal Cold Extraction</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Moisture Content</span>
            <div className="font-black text-[#1f1b17]">17.2% (Grade A)</div>
            <div className="text-[11px] text-[#006c49]">Pure & Unadulterated</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Harvest Date</span>
            <div className="font-black text-[#1f1b17]">{product.harvestDate}</div>
            <div className="text-[11px] text-[#867461]">Bottled: Sept 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};
