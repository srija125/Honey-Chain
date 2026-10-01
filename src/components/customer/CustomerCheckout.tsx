import React, { useState } from 'react';
import { CartItem, ShippingAddress, CustomerOrder } from '../../types';

interface CustomerCheckoutProps {
  items: CartItem[];
  onPlaceOrder: (order: Partial<CustomerOrder>) => void;
  onBackToCart: () => void;
}

export const CustomerCheckout: React.FC<CustomerCheckoutProps> = ({
  items,
  onPlaceOrder,
  onBackToCart,
}) => {
  // Address Form State
  const [name, setName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [street, setStreet] = useState('Flat 4B, Greenfield Residency, Sector 5');
  const [city, setCity] = useState('Kolkata');
  const [state, setState] = useState('West Bengal');
  const [pincode, setPincode] = useState('700091');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 999 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleAutofill = () => {
    setName('Ananya Sharma');
    setPhone('+91 98765 43210');
    setStreet('Flat 4B, Greenfield Residency, Sector 5');
    setCity('Kolkata');
    setState('West Bengal');
    setPincode('700091');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrderCode = `HCORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const shippingAddress: ShippingAddress = {
        fullName: name,
        phone,
        street,
        city,
        state,
        pincode,
      };

      onPlaceOrder({
        orderCode: newOrderCode,
        customerName: name,
        customerEmail: 'ananya.sharma@example.com',
        items: items.map(i => ({
          productId: i.product.id,
          productTitle: i.product.title,
          batchCode: i.product.batchCode,
          quantity: i.quantity,
          price: i.product.price,
          weightGrams: i.product.weightGrams,
        })),
        totalAmount: total,
        status: 'confirmed',
        createdAt: new Date().toISOString().split('T')[0],
        shippingAddress,
        paymentMethod,
        paymentId: `PAY-${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
        trackingSteps: [
          { statusName: 'Order Placed', timestamp: 'Just now', completed: true },
          { statusName: 'Confirmed by Apiary', timestamp: 'Pending', completed: true },
          { statusName: 'Packed with QR Seal', timestamp: 'Pending', completed: false },
          { statusName: 'Dispatched via Courier', timestamp: 'Pending', completed: false },
          { statusName: 'Delivered to Doorstep', timestamp: 'Estimated in 2 days', completed: false },
        ]
      });
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#855300]">
            Direct Farm Purchase
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-1">
            Checkout & Verified Payment
          </h1>
        </div>

        <button
          onClick={onBackToCart}
          className="text-xs font-bold text-[#855300] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Delivery & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#855300] text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h2 className="text-sm font-black text-[#1f1b17]">Shipping & Delivery Address</h2>
              </div>

              <button
                type="button"
                onClick={handleAutofill}
                className="text-[11px] font-bold text-[#855300] bg-[#fff4e5] hover:bg-[#ffe8cc] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                ⚡ 1-Click Autofill Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#534434] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#534434] mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#534434] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#534434] mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#534434] mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#534434] mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#f0e6e0]">
              <span className="w-6 h-6 rounded-full bg-[#855300] text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-black text-[#1f1b17]">Payment Method (Direct to Apiary)</h2>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-bold">
              {[
                { id: 'upi', label: 'UPI / QR', icon: 'qr_code_2' },
                { id: 'card', label: 'Card Payment', icon: 'credit_card' },
                { id: 'cod', label: 'Cash on Delivery', icon: 'local_shipping' },
              ].map(pm => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === pm.id
                      ? 'bg-[#855300] text-white border-[#855300] shadow-sm'
                      : 'bg-white text-[#534434] border-[#d8c3ad] hover:bg-[#f6ece6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{pm.icon}</span>
                  <span>{pm.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'upi' && (
              <div className="bg-[#fffbf7] p-4 rounded-2xl border border-[#f59e0b]/30 space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#534434] mb-1">Enter UPI VPA ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@oksbi"
                    className="w-full p-2.5 bg-white rounded-xl font-bold text-[#1f1b17] border border-[#d8c3ad] outline-none"
                  />
                </div>
                <div className="text-[11px] text-[#006c49] font-bold">
                  ✓ Instant UPI mandate with zero merchant convenience fees.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Final Order Summary & Place Order */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-6 flex flex-col justify-between h-fit">
          <div>
            <h2 className="text-sm font-black text-[#1f1b17] pb-3 border-b border-[#f0e6e0]">
              Cart Review ({items.length} items)
            </h2>

            <div className="space-y-3 mt-4 max-h-56 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#1f1b17] line-clamp-1">{item.product.title}</div>
                    <div className="text-[10px] text-[#867461]">
                      {item.quantity} × ₹{item.product.price} ({item.product.weightGrams}g)
                    </div>
                  </div>
                  <span className="font-black text-[#1f1b17]">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-4 pt-4 border-t border-[#f0e6e0] text-xs">
              <div className="flex justify-between text-[#534434]">
                <span>Subtotal</span>
                <span className="font-bold text-[#1f1b17]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#534434]">
                <span>Apiary Delivery</span>
                <span className="font-bold text-[#006c49]">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#f0e6e0]">
                <span className="font-black text-sm text-[#1f1b17]">Total Payable</span>
                <span className="text-2xl font-black text-[#855300]">₹{total}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#855300] hover:bg-[#684000] text-white text-sm font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Verifying Transaction...</span>
                </>
              ) : (
                <>
                  <span>Place Order (₹{total})</span>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-[#867461]">
              By placing this order you support sustainable Indian apiculture.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
