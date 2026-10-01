import React from 'react';
import { CustomerOrder } from '../../types';

interface CustomerOrderConfirmationProps {
  order: CustomerOrder;
  onTrackOrder: (orderId: string) => void;
  onViewTraceability: (batchCode: string) => void;
  onContinueShopping: () => void;
}

export const CustomerOrderConfirmation: React.FC<CustomerOrderConfirmationProps> = ({
  order,
  onTrackOrder,
  onViewTraceability,
  onContinueShopping,
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200 text-center">
      {/* Success Badge */}
      <div className="bg-white rounded-3xl p-8 border border-[#d8c3ad]/30 shadow-md space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#adedd3] text-[#004e34] flex items-center justify-center mx-auto text-3xl shadow-sm">
          ✓
        </div>

        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-[#006c49]">
            Order Successfully Placed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17]">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-xs text-[#534434] max-w-md mx-auto">
            Your order <strong>{order.orderCode}</strong> has been routed directly to the beekeeper. Each jar will be sealed with its cryptographic QR provenance badge before dispatch.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#fffbf7] p-5 rounded-2xl border border-[#f59e0b]/25 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#f0e6e0]">
            <div>
              <span className="text-[10px] text-[#867461] uppercase font-bold">Order ID</span>
              <div className="font-mono font-black text-[#855300]">{order.orderCode}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#867461] uppercase font-bold">Total Paid</span>
              <div className="font-black text-[#1f1b17]">₹{order.totalAmount}</div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-[#867461] uppercase font-bold">Items Purchased</span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center font-semibold text-[#1f1b17]">
                <span>{item.quantity} × {item.productTitle}</span>
                <span className="font-mono text-[11px] text-[#855300]">Batch: {item.batchCode}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#f0e6e0] text-[#534434]">
            <strong>Shipping to:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => onTrackOrder(order.id)}
            className="flex-1 py-3.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">local_shipping</span>
            <span>Track Live Shipment</span>
          </button>

          <button
            onClick={() => onViewTraceability(order.items[0]?.batchCode || 'HC-2026-0001')}
            className="flex-1 py-3.5 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">account_tree</span>
            <span>View Honey Provenance</span>
          </button>
        </div>

        <button
          onClick={onContinueShopping}
          className="text-xs font-bold text-[#867461] hover:text-[#1f1b17] pt-2 inline-block cursor-pointer"
        >
          ← Continue Browsing Marketplace
        </button>
      </div>
    </div>
  );
};
