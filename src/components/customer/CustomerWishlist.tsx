import React from 'react';
import { HoneyProduct } from '../../types';

interface CustomerWishlistProps {
  products: HoneyProduct[];
  wishlistIds: string[];
  onSelectProduct: (product: HoneyProduct) => void;
  onAddToCart: (product: HoneyProduct) => void;
  onRemoveWishlist: (product: HoneyProduct) => void;
  onShopHoney: () => void;
}

export const CustomerWishlist: React.FC<CustomerWishlistProps> = ({
  products = [],
  wishlistIds = [],
  onSelectProduct,
  onAddToCart,
  onRemoveWishlist,
  onShopHoney,
}) => {
  const safeWishlistIds = wishlistIds || [];
  const wishlistedProducts = (products || []).filter(p => p && p.id && safeWishlistIds.includes(p.id));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17]">
            My Saved Honey Favorites ({wishlistedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#534434] mt-1 font-medium">
            Keep track of seasonal harvests and artisanal apiary drops.
          </p>
        </div>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#d8c3ad]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-[#f6ece6]">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  />
                  <button
                    onClick={() => onRemoveWishlist(product)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#ba1a1a] flex items-center justify-center shadow-md hover:bg-[#ffdad6]"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>

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
                  <div className="text-xs text-[#534434]">
                    ★ {product.rating} • <span className="text-[#006c49] font-bold">{product.sourceHiveCode}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#f0e6e0] flex items-center justify-between mt-2">
                <span className="text-base font-black text-[#1f1b17]">₹{product.price}</span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="px-3.5 py-1.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-sm cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-[#d8c3ad]/30 shadow-sm space-y-4 max-w-md mx-auto">
          <span className="material-symbols-outlined text-4xl text-[#ba1a1a]">favorite_border</span>
          <h2 className="text-lg font-black text-[#1f1b17]">No honey in your wishlist</h2>
          <p className="text-xs text-[#534434]">
            Browse our honey marketplace and tap the heart icon on any jar to save it here.
          </p>
          <button
            onClick={onShopHoney}
            className="px-6 py-2.5 bg-[#855300] text-white text-xs font-black rounded-xl cursor-pointer"
          >
            Explore Honey
          </button>
        </div>
      )}
    </div>
  );
};
