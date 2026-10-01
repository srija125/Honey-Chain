import React from 'react';
import { CustomerOrder } from '../../types';

interface CustomerOrderTrackingProps {
  order: CustomerOrder;
  onViewTraceability: (batchCode: string) => void;
  onBackToOrders: () => void;
}

export const CustomerOrderTracking: React.FC<CustomerOrderTrackingProps> = ({
  order,
  onViewTraceability,
  onBackToOrders,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Back button */}
      <button
        onClick={onBackToOrders}
        className="flex items-center gap-1 text-xs font-bold text-[#855300] hover:underline cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to My Orders</span>
      </button>

      {/* Tracking Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#f0e6e0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34] uppercase tracking-wider">
                LIVE SHIPMENT TRACKING
              </span>
              <span className="font-mono text-xs font-bold text-[#855300]">{order.orderCode}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1f1b17] mt-1.5">
              Shipment Status: {order.status.toUpperCase()}
            </h1>
            <p className="text-xs text-[#534434] mt-0.5">
              Carrier: BlueDart Direct Apiary Express • AWB: <strong>BD-98241029</strong>
            </p>
          </div>

          <button
            onClick={() => onViewTraceability(order.items[0]?.batchCode || 'HC-2026-0001')}
            className="px-4 py-2.5 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">account_tree</span>
            <span>View Batch Provenance</span>
          </button>
        </div>

        {/* 5-Step Visual Timeline */}
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#534434]">
            Fulfillment & Delivery Progress
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { title: 'Order Placed', time: 'Sep 01, 10:30 AM', done: true, icon: 'receipt_long' },
              { title: 'Confirmed by Apiary', time: 'Sep 01, 11:15 AM', done: true, icon: 'check_circle' },
              { title: 'QR Sealed & Packed', time: 'Sep 01, 02:40 PM', done: true, icon: 'inventory_2' },
              { title: 'In Transit', time: 'Out from Kolkata Hub', done: order.status === 'shipped' || order.status === 'delivered', icon: 'local_shipping' },
              { title: 'Delivered', time: 'Estimated in 2 Days', done: order.status === 'delivered', icon: 'home' },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
                  step.done
                    ? 'bg-[#f7fcf9] border-[#006c49]/30 shadow-xs'
                    : 'bg-[#f6ece6] border-transparent opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${
                  step.done ? 'bg-[#006c49] text-white' : 'bg-[#d8c3ad] text-white'
                }`}>
                  <span className="material-symbols-outlined text-lg">{step.icon}</span>
                </div>
                <div className="text-xs font-black text-[#1f1b17]">{step.title}</div>
                <div className="text-[10px] text-[#534434]">{step.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address & Product Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#f0e6e0] text-xs">
          <div className="bg-[#fffbf7] p-5 rounded-2xl border border-[#f59e0b]/20 space-y-2">
            <span className="text-[10px] font-bold text-[#867461] uppercase">Destination Address</span>
            <div className="font-bold text-[#1f1b17]">{order.shippingAddress.fullName}</div>
            <div className="text-[#534434]">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </div>
            <div className="text-[#867461] text-[11px]">Phone: {order.shippingAddress.phone}</div>
          </div>

          <div className="bg-[#fffbf7] p-5 rounded-2xl border border-[#f59e0b]/20 space-y-2">
            <span className="text-[10px] font-bold text-[#867461] uppercase">Purchased Honey Lots</span>
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#1f1b17]">{it.quantity} × {it.productTitle}</div>
                  <div className="font-mono text-[10px] text-[#855300]">Batch: {it.batchCode}</div>
                </div>
                <span className="font-black text-[#1f1b17]">₹{it.price * it.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
