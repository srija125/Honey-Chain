import React from 'react';
import { CartItem } from '../../types';

interface CustomerCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CustomerCart: React.FC<CustomerCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 999 || items.length === 0 ? 0 : 40;
  const total = subtotal + deliveryFee;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17]">
            Your Honey Basket ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs sm:text-sm text-[#534434] mt-1 font-medium">
            Direct from certified apiaries with cryptographic harvest provenance.
          </p>
        </div>

        <button
          onClick={onContinueShopping}
          className="text-xs font-bold text-[#855300] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Continue Shopping</span>
        </button>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item.product.id}
                className="bg-white rounded-3xl p-5 border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-2xl object-cover border border-[#d8c3ad]/40"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#855300] uppercase tracking-wider">
                      {item.product.honeyType}
                    </span>
                    <h3 className="text-sm font-black text-[#1f1b17]">{item.product.title}</h3>
                    <div className="text-xs text-[#534434] flex items-center gap-2">
                      <span>{item.product.weightGrams}g</span>
                      <span>•</span>
                      <span className="text-[#006c49] font-bold">{item.product.sourceHiveCode}</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#867461]">
                      Batch: {item.product.batchCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#f0e6e0]">
                  {/* Quantity controls */}
                  <div className="flex items-center bg-[#f6ece6] rounded-xl p-1 border border-[#d8c3ad]/40">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white font-black text-xs flex items-center justify-center hover:bg-[#ebd9cb]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-[#1f1b17]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white font-black text-xs flex items-center justify-center hover:bg-[#ebd9cb]"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-base font-black text-[#1f1b17]">
                      ₹{item.product.price * item.quantity}
                    </div>
                    <div className="text-[10px] text-[#867461]">₹{item.product.price} each</div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box (1 Col) */}
          <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-6 flex flex-col justify-between h-fit">
            <div>
              <h2 className="text-sm font-black text-[#1f1b17] pb-3 border-b border-[#f0e6e0]">
                Order Summary
              </h2>

              <div className="space-y-3 mt-4 text-xs">
                <div className="flex justify-between text-[#534434]">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-[#1f1b17]">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-[#534434]">
                  <span>Direct-From-Apiary Delivery</span>
                  <span className="font-bold text-[#006c49]">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <div className="text-[10px] text-[#855300] bg-[#fff4e5] p-2 rounded-xl">
                    Add ₹{999 - subtotal} more to qualify for FREE Delivery!
                  </div>
                )}

                <div className="pt-3 border-t border-[#f0e6e0] flex justify-between items-baseline">
                  <span className="font-black text-sm text-[#1f1b17]">Total Amount</span>
                  <span className="text-2xl font-black text-[#855300]">₹{total}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#855300] hover:bg-[#684000] text-white text-xs sm:text-sm font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <div className="text-center text-[10px] text-[#867461] flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#006c49]">lock</span>
                <span>256-bit Secure Direct Apiary Payment</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-[#d8c3ad]/30 shadow-sm space-y-4 max-w-lg mx-auto">
          <span className="text-5xl">🍯</span>
          <h2 className="text-xl font-black text-[#1f1b17]">Your honey basket is empty</h2>
          <p className="text-xs text-[#534434]">
            Explore single-origin honey batches harvested by certified beekeepers.
          </p>
          <button
            onClick={onContinueShopping}
            className="px-6 py-3 bg-[#855300] text-white text-xs font-black rounded-2xl shadow-md cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};
