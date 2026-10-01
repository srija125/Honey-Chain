import React, { useState } from 'react';
import { CustomerOrder } from '../../types';

interface CustomerMyOrdersProps {
  orders: CustomerOrder[];
  onTrackOrder: (orderId: string) => void;
  onViewTraceability: (batchCode: string) => void;
  onShopHoney: () => void;
}

export const CustomerMyOrders: React.FC<CustomerMyOrdersProps> = ({
  orders,
  onTrackOrder,
  onViewTraceability,
  onShopHoney,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredOrders = orders.filter(o => activeFilter === 'all' || o.status === activeFilter);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1f1b17]">
            My Honey Orders ({orders.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#534434] mt-1 font-medium">
            Track your farm-to-doorstep shipments and review verified batch certificates.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold">
          {(['all', 'confirmed', 'processing', 'shipped', 'delivered'] as const).map(flt => (
            <button
              key={flt}
              onClick={() => setActiveFilter(flt)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                activeFilter === flt
                  ? 'bg-white text-[#855300] font-extrabold shadow-sm'
                  : 'text-[#534434] hover:text-[#1f1b17]'
              }`}
            >
              {flt}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-[#f0e6e0]">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-sm text-[#855300]">{order.orderCode}</span>
                  <span className="text-xs text-[#867461]">Placed on {order.createdAt}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black capitalize ${
                    order.status === 'delivered'
                      ? 'bg-[#adedd3] text-[#004e34]'
                      : order.status === 'shipped'
                      ? 'bg-[#e0f2fe] text-[#0369a1]'
                      : 'bg-[#fff4e5] text-[#855300]'
                  }`}>
                    ● {order.status}
                  </span>
                  <span className="font-black text-base text-[#1f1b17]">₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#1f1b17]">{item.productTitle}</div>
                      <div className="text-[11px] text-[#534434]">
                        Qty: {item.quantity} • {item.weightGrams}g • Single Origin
                      </div>
                    </div>

                    <button
                      onClick={() => onViewTraceability(item.batchCode)}
                      className="px-2.5 py-1 rounded-lg bg-[#f7fcf9] text-[#006c49] border border-[#006c49]/30 text-[11px] font-bold hover:bg-[#e8f7f0] flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">verified</span>
                      <span>Batch {item.batchCode}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Action footer */}
              <div className="pt-3 border-t border-[#f0e6e0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs text-[#534434]">
                  Delivering to: <strong>{order.shippingAddress.city}, {order.shippingAddress.state}</strong>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onTrackOrder(order.id)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                    <span>Track Shipment</span>
                  </button>

                  <button
                    onClick={() => onViewTraceability(order.items[0]?.batchCode || 'HC-2026-0001')}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">account_tree</span>
                    <span>Trace Provenance</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-[#d8c3ad]/30 shadow-sm space-y-4 max-w-md mx-auto">
          <span className="material-symbols-outlined text-4xl text-[#855300]">shopping_bag</span>
          <h2 className="text-lg font-black text-[#1f1b17]">No orders found</h2>
          <p className="text-xs text-[#534434]">You haven't placed any honey orders in this category yet.</p>
          <button
            onClick={onShopHoney}
            className="px-6 py-2.5 bg-[#855300] text-white text-xs font-black rounded-xl cursor-pointer"
          >
            Browse Marketplace
          </button>
        </div>
      )}
    </div>
  );
};
